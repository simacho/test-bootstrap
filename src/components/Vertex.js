import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import * as util from './Util.js';

const VertexContext = createContext()

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



// ノードツリー
const VertexTree = (props) => {
    const [ collapse , setCollapse ] = useState( false )
    let adrs = props.crnt + '/' + props.vtx.name
    let do_son = false;

    // トグルボタン
    const toggle = () => {
        setCollapse( prev => { return !prev } ) 
    }

    //  ノードツリー部分の描画処理
    const VertexDisp = (props) => {
        return (
            <ListGroup.Item action onClick={toggle}>
                {collapse ? 
                    <i class="fas fa-plus-square"></i> : <i class="fas fa-minus-square"></i>  }
                    {"name" in props.vtx ? props.vtx.name : ""}
                </ListGroup.Item>
            // collapse button
            // information name
        )
    }

    if ( "son" in props.vtx && collapse == false ) do_son = true;

    console.log(props)
    return (
        <div>
            <ListGroup as="ul">
                <VertexDisp vtx={props.vtx} />
            </ListGroup>
            {
                do_son ? 
                    Object.keys(props.vtx.son).map( sn => {
                        return <VertexTree crnt={props.crnt} vtx={props.vtx.son[sn]} />
                    }) : ""
            }
        </div>
    ) 
}


export const VertexRoot = (props) => {
    const [ name , setName ] = useState( "" )
    const [ address , setAddress ] = useState( props.match.params.address )
    const [ vtx , setVtx ] = useState( {} )
    const [ crnt , setCrnt ] = useState( "" )

    // ノード情報の読み込み
    useEffect(() => {
        try {
            firebaseDb.ref('name').on('value', snap => {
                setVtx( snap.val() )
                // console.log(Object.keys(snap.val()))
                // setWork( hoge => ({ ...hoge, "kora" : "pro"      }) )
            })
        } catch (e) {
            console.error(e.code, e.message)
        }
    },[] )

    if (vtx == null ) return "Vertex ReadErr";
    let keys = Object.keys(vtx);


    return (
        <div>
            <VertexContext.Provider value={
                { vtx , setVtx , crnt , setCrnt }
            }>
                <table class="table">
                    {
                        'vtx0' in vtx ? <VertexTree crnt='name/vtx0' vtx={vtx['vtx0']} /> :
                            "Nothing Root Vertex"
                    }
                </table>
            </VertexContext.Provider>
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
