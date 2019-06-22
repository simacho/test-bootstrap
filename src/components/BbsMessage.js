import React, { Component } from 'react';
import { useState , useEffect } from "react";
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import Map from './Map';
import * as util from './Util.js';

export const MessageCreate = (props) => {
    const [ name , setName ] = useState( props.name ),
        [ icon_url , setIconUrl ] = useState( "" ),
        [ msg , setMsg ] = useState( "" ),
        [ create_time , setCreateTime ] = useState( "" );

    const WriteMsg = (e:InputEvent) => {
        var create_time = (new Date()).getTime();
        var address = 'msg/' + props.address;
        firebaseDb.ref(address).push({
            "name" : name,
            "icon_url" : icon_url,
            "create_time" : create_time,
            "msg" : msg,
        })
        console.log(e)
        e.preventDefault();
    }

    return (
        <div>
            <Form onSubmit={(e)=>WriteMsg(e)} >
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3"
                        onChange={(e)=>{ setMsg( e.target.value ); /*console.log(e.target.value);*/ } } />
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
    //let msg = props.hash.msg.replace(/\r?\n/g,'<br />');

    return (
        <tr>
            <td>{props.hash.name}</td>
            <td><util.NewLineToBr>{props.hash.msg}</util.NewLineToBr></td>
            <td class="text-right"><small>{util.Datelong2Format(props.hash.create_time)}</small></td>
            <td><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></td>
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
            <BbsMessage address={address} />,
            <MessageCreate address={address} />,
        ]
    );

}
