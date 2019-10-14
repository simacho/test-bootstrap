import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb , firestoreDb } from '../firebase/index.js'
import * as admin from 'firebase-admin';
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
            <Form validated={true} onSubmit={(e)=>vtx.create(e,address,name)} >
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

    // ノード情報の書き込み
    const create = (ev:InputEvent , pname , name ) => { 
        console.log( 'vtx create ' + address + ' ' + name )
        try {
            // 親の指定が存在していれば
            let query= firestoreDb.collection('vertices').where('name','==', pname ) 
            if ( query!= null ) {
                // 子供自体の作成
                firestoreDb.collection('vertices').add({
                    name: name,
                    children: [],
                    parent: null
                }).then( ref => {
                    // 親更新
                    // console.log(query)
                    query.get().then((snp)=>{
                        // console.log(snp)
                        if (snp.size > 0){
                            let children = snp.docs[0].get('children')
                            children.push(ref.id)
                            snp.docs[0].ref.update({children: children})
                            // 子供の親更新
                            ref.update({parent: snp.docs[0].ref.id})
                        }
                    })
                }
                );
            }
            return ev.preventDefault();
        } catch (e) {
            console.log("error occured")
            return ev.preventDefault();
        }
    }

    // ノード情報
    const vanish = (ev:InputEvent , vid ) => { 
        console.log( 'vtx delete' + vid )
        try {
            let rf = firestoreDb.collection('vertices').doc(vid);
            let dc = rf.get().then(doc => {
                if ( doc.exist ){
                    // 親のノードから削除する
                    let pid = doc.data().parent
                    let prf = firestoreDb.collection('vertices').doc(pid)
                    prf.update({
                        children: admin.firestore.FieldValue.arrayRemove(vid)
                    })
                }
            });
            rf.delete();
            return ev.preventDefault();
        } catch (e) {
            console.log("error occured")
            return ev.preventDefault();
        }
    }

    //

    // ノード情報の変更
    const mergeupdate = (ev:InputEvent , address , name) => { 
        try {
            firestoreDb.collection('vertices').doc(address).set({
                name: name
            },{merge: true}).then( ref => { console.log( 'Merge doc ', ref.id) } );

            return ev.preventDefault();
        } catch (e) {
            console.log("error occured")
            return ev.preventDefault();
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
            setLoading(false)
            console.log( 'firestore loaded ' , datahash , root )
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    return (
        <VertexContext.Provider
            value={{
                create,
                mergeupdate,
                load,
                vtx,
                crnt,
                loading,
                root,
            }}
        >
            {children}
        </VertexContext.Provider>
    )
}


export {  VertexContext , VertexProvider , VertexCreate }


