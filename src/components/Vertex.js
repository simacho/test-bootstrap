import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb , firestoreDb } from '../firebase/index.js'
import { Sentence , SentenceContext } from './Sentence';
import * as util from './Util.js';
import { SntForm , SntView } from './SntView'

const VertexContext = createContext()

const VertexCreate = (props) => {
    const vtx = useContext(VertexContext)
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


const VertexProvider = ({children}) => {
    const [ address , setAddress ] = useState( "" )
    const [ vtx , setVtx ] = useState( {} )
    const [ root , setRoot ] = useState( null )
    const [ crnt , setCrnt ] = useState( "" )
    const [ loading , setLoading ] = useState( true )
    const [ reload , setReload ] = useState( false )

    // 作成する
    const create = async (ev:InputEvent , pid , name ) => { 
        console.log( 'vtx create ' + pid + ' ' + name )
        try {
            let clref = firestoreDb.collection('vertices')
            await clref.doc(pid).get().then( pdoc => {
                clref.add({
                    name: name,
                    children: [],
                    parent: pid 
                }).then( ref => {
                    let children = pdoc.get('children')
                    children.push(ref.id)
                    pdoc.ref.update({children: children})
                })
            })
            setReload( true )
            return ev.preventDefault();
        } catch (e) {
            console.log("error occured")
            return ev.preventDefault();
        }
    }

    // 名前で作成する
    const create_byname = (ev:InputEvent , pname , name ) => {
        let query= firestoreDb.collection('vertices').where('name','==', pname ) 
        if ( query!= null ) {
            query.get().then((snp)=>{
                if (snp.size > 0){
                    create( ev , snp.docs[0].ref.id , name )
                }
            })
        }
        return ev.preventDefault();
     }

    // 削除する 
    const vanish = (ev:InputEvent , vid ) => { 
        console.log( 'vtx delete' + vid )
        try {
            let crf = firestoreDb.collection('vertices')
            let rf = crf.doc(vid) 
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
            return ev.preventDefault();
        } catch (e) {
            console.log("error occured")
            return ev.preventDefault();
        }
    }

    // 移動 
    const move = (ev:InputEvent , vid , tid) => { 
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
            return ev.preventDefault();
        } catch (e) {
            console.log("error occured")
            return ev.preventDefault();
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
            setVtx( datahash )
            console.log( 'firestore loaded ' , datahash , root )
            setLoading(false)
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [reload])

    // カレント設定
    const setcrnt = (id) => {
        setCrnt( id )
        console.log(id)
    }

    return (
        <VertexContext.Provider
            value={{
                create,
                create_byname,
                update,
                vanish,
                search,
                move,
                load,
                reload,
                vtx,
                crnt,
                setcrnt,
                loading,
                root,
            }}
        >
            {children}
        </VertexContext.Provider>
    )
}


export {  VertexContext , VertexProvider , VertexCreate }


