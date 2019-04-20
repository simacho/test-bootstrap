import React, { Component } from 'react';
import { useState , useEffect } from "react";
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'

export const MessageCreate = (props) => {
    const [ name , setName ] = useState( "Anonymous message"),
        [ msg , setMsg ] = useState( "" ),
        [ create_time , setCreateTime ] = useState( "" );

    const WriteMsg = () => {
        var create_time = (new Date()).toString();
        var address = 'msg/' + props.thread;
        firebaseDb.ref('msg').push({
            "name" : name,
            "create_time" : create_time,
            "msg" : msg,
        })
        console.log("messageCreate")
    }

    return (
        <div>
            <Form onSubmit={MessageCreate} >
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3"
                        onChange={(e)=>{ setMsg( e.target.value ); console.log(e.target.value);} } />
                </Form.Group>
            <Button variant="primary" type="submit" >
                作成する
            </Button>
        </Form>
    </div>
    );
}

// 個別のメッセージ
const MessageLine = (props) => {
    return (
        <tr>
            <td>hoge</td>
        </tr>
    ); 
}

export const BbsMessage = (props) => {
    const [ msgs , setMsgs ] = useState( {} );
    var address = 'msg/' + props.thread;

    useEffect( ()=> {
        var orderRef = firebaseDb.ref(address)
        orderRef.on("value", (snap) => {
            setMsgs( snap.val() );
        })        
    },[msgs] )

    if (msgs == null ) return "MESSAGE none";
    let hash = Object.keys([address]);

    return (
        <div>
            <table class="table">
                {
                    hash ? hash.map(data => {
                        return <MessageLine hash={hash[data]} />
                    }) : "Nothing Data"
                }
            </table>
        </div>
    );
}


