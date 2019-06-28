import React, { Component } from 'react';
import { useState , useEffect ,useCallback } from "react";
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import * as util from './Util.js';

const VertexCreate = (props) => {
    const [ name , setName ] = useState( "" )
    const [ address , setAddress ] = useState( "" )
    const [ info , setInfo ] = useState( {} )

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

// ノード毎の処理
const Vertex = (crnt,vtx) => {
    let adrs = crnt + '/' + vtx.name
    return (
        <div>
            <tr>
                <td>{vtx.name}</td>
            </tr>
            {
                vtx.sons.map( sn => {
                    return <Vertex crnt={adrs} vtx={sn} />
                })
            }
        </div>
    ) 
}


export const VertexRoot = (props) => {
    const [ name , setName ] = useState( "" )
    const [ address , setAddress ] = useState( props.match.params.address )
    const [ vtx , setVtx ] = useState( {} )

    // ノード情報の読み込み
    useEffect(async () => {
        try {
            await firebaseDb.ref(address).on('value', snap => {
                setVtx( snap.val() )
                console.log( "vertex read" )
            })
        } catch (e) {
            console.error(e.code, e.message)
        }
    },[] )

    return (
        <div>
            <Vertex crnt={address} vtx={vtx}/>
        </div>
    )

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
