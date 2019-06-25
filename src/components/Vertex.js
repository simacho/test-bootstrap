import React, { Component } from 'react';
import { useState , useEffect } from "react";
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import * as util from './Util.js';

const VertexCreate = (props) => {
    const [ name , setName ] = useState( "" )
    const [ address , setAddress ] = useState( "" )

    const Add = (e:InputEvent) => {
        var create_time = (new Date()).getTime();
        var path = props.address + '/' + name 
        console.log(path)
        firebaseDb.ref(path).push({
            "name" : name,
            "create_time" : create_time,
        })
        console.log(e)
        e.preventDefault();
    }

    return (
        <div>
            <Form onSubmit={(e)=>Add(e)} >
                <Form.Group controlId="formDisplayName">
                    <Form.Label>頂点名</Form.Label>
                    <Form.Control name="name" type="text"
                        placeholder="新しいノードの作成"
                        onChange={(e)=>{ setName( e.target.value ); console.log(e.target.value);} } />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    作成する
                </Button>
            </Form>
        </div>
    );
}


// 個別のメッセージ
const VertexInfo = (props) => {
        return (
            <tr>
                <td>{props.hash.name}</td>
                <td><util.NewLineToBr>{props.hash.msg}</util.NewLineToBr></td>
                <td class="text-right"><small>{util.Datelong2Format(props.hash.create_time)}</small></td>
                <td><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></td>
            </tr>
        ); 
}


/* Root -> Top -> Vertexs
                -> Info
                -> Users
                -> Msgs
                -> Sons
                */
export const Vertex = (props) => {
    const [ nd , setNd ] = useState( {} );

    useEffect( ()=> {
        var orderRef = firebaseDb.ref(props.address)
        orderRef.on("value", (snap) => {
            setNd( snap.val() );
        })        
    },[] )

    if (nd == null ) return "Vertex none";
    let keys = Object.keys(nd);
    return (
        <div>
            <VertexInfo props={nd.info} />
            {/*
            <VertexUsers props={keys.users} />
            <VertexMsgs props={keys.msgs} />
            <VertexSons props={keys.sons} />
            <table class="table">
                {
                    keys ? keys.map(data => {
                        return <VertexLine hash={msgs[data]} />
                    }) : "Nothing Data"
                }
            </table>
            */}
        </div>
    );
}

export const VertexTop = (props) => {
    let address = props.match.params.address;
    console.log( address )
    return (
        [
            <VertexCreate address={address} />,
        ]
    );

}
