import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
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
    const [ crnt , setCrnt ] = useState( "" )
    const [ loading , setLoading ] = useState( false )

    // ノード情報の書き込み
    const create = (ev:InputEvent , address , name) => { 
        try {
            var fullname = address + '/' + name
            var update = {}

            firebaseDb.ref(fullname).once("value",(snapshot) => {
                if ( !snapshot.val() ) {
                    firebaseDb.ref(fullname).set(
                        {   "_name" : name,
                            "_address" : address,
                            "_fullname" : fullname,
                        }  , (err)=> {
                            if (err) throw new Error("vertex create error")
                        }
                    )
                    console.log("create called")
                }                     
            })
            return ev.preventDefault();
        } catch (e) {
            console.log("error occured")
            return ev.preventDefault();
        }
    }

    // ノード情報の読み込み
    const load = useCallback(async (address,filter) => {
        try {
            //            setLoading(true)
            console.log( address )
            var orderRef = firebaseDb.ref(address)
            orderRef.on("value", (snap) => {
                setVtx( snap.val() )
            })        
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    return (
        <VertexContext.Provider
            value={{
                create,
                load,
                vtx,
                crnt,
            }}
        >
            {children}
        </VertexContext.Provider>
    )
}


export {  VertexContext , VertexProvider , VertexCreate }


