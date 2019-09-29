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
    const [ rootvtx , setRootvtx ] = useState( null )
    const [ crnt , setCrnt ] = useState( "" )
    const [ loading , setLoading ] = useState( true )

    // ノード情報の書き込み
    const create = (ev:InputEvent , address , name) => { 
        console.log( 'vtx create ' + address + ' ' + name )
        try {
            /*
            firebaseDb.ref(address).once("value",(snapshot) => {
                if ( !snapshot.val() ) {
                    firebaseDb.ref(address).set(
                        {   "_name" : name,
                            "_address" : address,
                        }  , (err)=> {
                            if (err) throw new Error("vertex create error")
                        }
                    )
                    console.log("create called")
                }                     
            })
            */
            firestoreDb.collection('vertices').add({
                address: address,
                name: name
            }).then( ref => { console.log( 'Added doc ' , ref.id )});

            return ev.preventDefault();
        } catch (e) {
            console.log("error occured")
            return ev.preventDefault();
        }
    }

    // ノード情報の変更
    const mergeupdate = (ev:InputEvent , address , name) => { 
        try {
            /*
            firebaseDb.ref(address).set(
                {   "_name" : name,
                    "_address" : address,
                }, {merge:true}
            )
            */
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
            let datahash = []
            let dcref = await firestoreDb.collection('vertices').get().then((snapshot)=>{
                snapshot.forEach((doc) => {
                    datahash[doc.ref] = doc.data() )
                    if ( doc.data().parent == null ) setRootvtx( doc.ref )
                })
            })
            setVtx( datalist )
            setLoading(false)
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
            }}
        >
            {children}
        </VertexContext.Provider>
    )
}


export {  VertexContext , VertexProvider , VertexCreate }


