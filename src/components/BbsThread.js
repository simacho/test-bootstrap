import React, { Component } from 'react';
import { useState , useEffect } from "react";
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'

export const BbsCreate = (props) => {
    const [ name , setName ] = useState( "Anonymous Thread"),
        [ lat , setLat ] = useState( props.lat || 0.0 ),
        [ lnt , setLng ] = useState( props.lng || 0.0 );

        return ( 
            <div>
                <Form onSubmit={()=>{ console.log("thread created");} }>
                    <Form.Group controlId="formDisplayName">
                        <Form.Label>スレッド名</Form.Label>
                        <Form.Control name="name" type="text"
                            placeholder="スレッドの名称を入兎力してください"
                            onChange={(value)=>{ setName( value ); console.log(value);} } />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        作成する
                    </Button>
                </Form>
            </div>
        );
}


// スレッドリストの表示 
const BbsLine = (props) => {
    return (
        <tr>
            <td>hoge</td>
        </tr>
    ); 
}

export const BbsThread = () => {
    const [ bbs , setBbs ] = useState( {} );

    useEffect( ()=> {
        var orderRef = firebaseDb.ref('bbs' )
        orderRef.on("value", (snap) => {
            setBbs( snap.val() );
        })        
    },[bbs] )

    if (bbs == null || bbs['bbs'] == null) return "BBS none";
    let hash = Object.keys(bbs['bbs']);

    return (
        <div>
            <table class="table">
                {
                    hash ? hash.map(data => {
                        return <BbsLine hash={hash[data]} />
                    }) : "Nothing Data"
                }
            </table>
        </div>
    );
}


