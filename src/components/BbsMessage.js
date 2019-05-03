import React, { Component } from 'react';
import { useState , useEffect } from "react";
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import Map from './Map';

export const MessageCreate = (props) => {
    const [ name , setName ] = useState( "Anonymous message"),
        [ msg , setMsg ] = useState( "" ),
        [ create_time , setCreateTime ] = useState( "" );

    const WriteMsg = () => {
        var create_time = (new Date()).toString();
        var address = 'msg/' + props.address;
        firebaseDb.ref(address).push({
            "name" : name,
            "create_time" : create_time,
            "msg" : msg,
        })
        console.log("messageCreate")
    }

    return (
        <div>
            <Form onSubmit={WriteMsg} >
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
    console.log(props);

    return (
        <tr>
            <td>{props.hash.name}</td>
            <td>{props.hash.msg}</td>
        </tr>
    ); 
}

export const BbsMessage = (props) => {
    const [ msgs , setMsgs ] = useState( {} );
    var address = 'msg/' + props.address;

    useEffect( ()=> {
        var orderRef = firebaseDb.ref(address)
        orderRef.on("value", (snap) => {
            setMsgs( snap.val() );
        })        
    },[] )

    if (msgs == null ) return "MESSAGE none";
    let keys = Object.keys(msgs);

    return (
        <div>
            <table class="table">
                {
                    keys ? keys.map(data => {
                        return <MessageLine hash={msgs[data]} />
                    }) : "Nothing Data"
                }
            </table>
        </div>
    );
}

export const BbsMessageTop = (props) => {
    let address = props.match.params.id;
    return (
        [
            <Map />,
            <BbsMessage address={address} />,
            <MessageCreate address={address} />,
        ]
    );

}
