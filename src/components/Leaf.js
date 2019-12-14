import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb , firestoreDb } from '../firebase/index.js'
import { Sentence , SentenceContext } from './Sentence';
import * as util from './Util.js';
import { SntForm , SntView } from './SntView'

const LeafContext = createContext()

const LeafCreate = (props) => {
    const vtx = useContext(LeafContext)
    const [ name , setName ] = useState( "" )
    const [ address , setAddress ] = useState( "" )

    return (
        <div>
            <Form validated={true} onSubmit={(e)=>vtx.create_byname(e,address,name)} >
                <Form.Group controlId="formDisplayName">
                    <Form.Label>テスト</Form.Label>
                    <Form.Control name="address" type="text"
                        placeholder="アドレス名"
                        required
                        onChange={(e)=>{ setAddress( e.target.value ); console.log(e.target.value);} } />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control name="name" type="text"
                        placeholder="新しいノードの作成"
                        required
                        onChange={(e)=>{ setName( e.target.value ); console.log(e.target.value);} } />
            
                           <Form.Control.Feedback type="invalid">
                                             Please choose a username.
                                                         </Form.Control.Feedback>

                </Form.Group>
                <Button variant="primary" type="submit" class="invalid-feedback" >
                    作成する
                </Button>
            </Form>
        </div>

    );

}


const LeafProvider = ({children}) => {
    const [ address , setAddress ] = useState( "" )
    const [ vtx , setVtx ] = useState( {} )
    const [ root , setRoot ] = useState( null )
    const [ crnt , setCrnt ] = useState( "" )
    const [ loading , setLoading ] = useState( true )
    const [ reload , setReload ] = useState( false )

    // 作成する
    const create = async ( pid , name ) => { 
        console.log( 'leaf create ' + pid + ' ' + name )
        try {
            let clref = firestoreDb.collection('leafs')
            await clref.doc(name).set( {
                clref.add({
                    name: name,
                    time: "",
                    parent : pid,
                    raw: "",
                    view: ""
                }).then( ref => {
                    console.log( "leaf add " + ref)
                })

            })
            setReload( true )
        } catch (e) {
            console.log("error occured")
        }
    }

    // 削除する 
    const vanish = ( id ) => { 
        console.log( 'leaf delete' + id )
        try {
            let crf = firestoreDb.collection('leafs')
            let rf = crf.doc(id) 
            let dc = rf.get().then(doc => {
                if ( doc.exists ){
                    let pvt = vtx[vid].parent;
                    let prf = crf.doc(vtx[vid].parent)

                    if (pvt != null ){
                        // 親のノードから削除
                        prf.update({
                            children: firebase.firestore.FieldValue.arrayRemove(vid)
                        })
                    }
                    // 子供のノードの削除
                    doc.data().children.map((child) => {
                        if ( pvt != null ){
                            prf.update({
                                children: firebase.firestore.FieldValue.arrayUnion(child)
                            })
                        }
                        crf.doc(child).update({parent: doc.data().parent})
                    })
                }
            })
            // rf.delete();
            setReload( true )
        } catch (e) {
            console.log("error occured")
        }
    }

    // 移動 
    const move = ( vid , tid) => { 
        console.log( 'vtx move ', vid , " to " ,tid )
        try {
            let crf = firestoreDb.collection('vertices')
            let rf = crf.doc(vid) 
            let trf = crf.doc(tid)
            let dc = rf.get().then(doc => {
                if ( doc.exists ){
                    let pvt = vtx[vid].parent;
                    let prf = crf.doc(vtx[vid].parent)

                    if (pvt != null ){
                        // 親のノードから削除
                        prf.update({
                            children: firebase.firestore.FieldValue.arrayRemove(vid)
                        })
                    }
                    // 移動先に接続
                    rf.update( { parent: tid })
                    trf.update( { children: firebase.firestore.FieldValue.arrayUnion(vid) })
                }
            })
            // rf.delete();
            setReload( true )
        } catch (e) {
            console.log("error occured")
        }
    }

    // 検索
    const search = async ( name ) => {
        let query = firestoreDb.collection('vertices').where('name','==', name ) 
        let ret = null

        if ( query == null ) return ret 
        await query.get().then((snp)=>{
            if (snp.size > 0){
                ret = snp.docs[0].ref.id
            }
        })
        return ret
    }

    // ノード情報の変更
    const update = (vid , name) => { 
        try {
            let crf = firestoreDb.collection('vertices')
            let rf = crf.doc(vid).update({name: name})
            vtx[vid].name = name
        } catch (e) {
            console.log("error occured")
        }
    }

    // ノード情報の読み込み
    const load = useCallback(async (address,filter) => {
        try {
            setLoading(true)
            console.log('firestore load')
            let datahash = {} 
            let childlist = []
            let dcref = await firestoreDb.collection('vertices').get().then((snapshot)=>{
                snapshot.forEach((doc) => {
                    datahash[doc.ref.id] = doc.data()
                   if ( "parent" in doc.data() && doc.data().parent == null ) setRoot( doc.ref.id )
                })
            })
            setReload(false)
            setVtx( datahash )
            console.log( 'firestore loaded ' , datahash , root )
            setLoading(false)
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    // カレント設定
    const setcrnt = (id) => {
        setCrnt( id )
        console.log(id)
    }

    return (
        <LeafContext.Provider
            value={{
                create,
                create_byname,
                update,
                vanish,
                search,
                move,
                load,
                vtx,
                crnt,
                setcrnt,
                reload,
                loading,
                root,
            }}
        >
            {children}
        </LeafContext.Provider>
    )
}


export {  LeafContext , LeafProvider , LeafCreate }


