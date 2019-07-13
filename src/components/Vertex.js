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
    let depth = parseInt(props.depth)
    const ctxt = useContext(VertexContext)

    // collapseトグルボタン
    const toggle = () => {
        if ( !("son" in props.vtx) ) return
        setCollapse( prev => { return !prev } ) 
    }

    // カレントに設定する
    const setcrnt = () => {
        ctxt.setCrnt( props.crnt )
        console.log( props.crnt + '->' + ctxt.crnt )
    }


    //  ノードツリー部分の描画処理
    const VertexDisp = (props) => {
        return (
            <ListGroup.Item
                action onClick={setcrnt}
                active ={ctxt.crnt == props.crnt ? true : false }
            > {'---'.repeat(depth)} {collapse ?  <i class="fas fa-plus-square"></i> : <i class="fas fa-minus-square"></i>  }
                {"name" in props.vtx ? props.vtx.name : ""}
            </ListGroup.Item>
        )
    }

    return (
        <div>
            <ListGroup as="ul">
                <VertexDisp vtx={props.vtx} crnt={props.crnt} />
            </ListGroup>
            {
                ( "son" in props.vtx && collapse == false ) ? 
                    Object.keys(props.vtx.son).map( sn => {
                        let crnt = props.crnt + '/' + sn
                        return <VertexTree crnt={crnt} vtx={props.vtx.son[sn]} depth={depth+1} />
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
        <div class="container">
            <div class="row">
                <div class ="col-md-4">
                    <VertexContext.Provider value={
                        { vtx , setVtx , crnt , setCrnt }
                    }>
                    <table class="table">
                        {
                            'vtx0' in vtx ? <VertexTree crnt='name/vtx0' vtx={vtx['vtx0']} depth='0' /> :
                                "Nothing Root Vertex"
                        }
                    </table>
                </VertexContext.Provider>
            </div>
        </div>
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
