import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import { Sentence , SentenceContext } from './Sentence';
import { SntForm , SntView } from './SntView'
import { VertexProvider , VertexCreate } from './Vertex'

import * as util from './Util.js';

const VertexTreeContext = createContext()

// ノードツリー
const VertexTree = (props) => {
    const [ collapse , setCollapse ] = useState( false )
    let depth = parseInt(props.depth)
    const ctxt = useContext(VertexTreeContext)

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
    const sctxt = useContext( SentenceContext )

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
                    <div class ="col-md-3">
                        <VertexTreeContext.Provider value={
                            { vtx , setVtx , crnt , setCrnt }
                        }>
                        <table class="table">
                            {
                                'vtx0' in vtx ? <VertexTree crnt='name/vtx0' vtx={vtx['vtx0']} depth='0' /> :
                                    "Nothing Root Vertex"
                            }
                        </table>
                    </VertexTreeContext.Provider>
                    <VertexProvider>
                        <VertexCreate />
                    </VertexProvider>
                </div>
                    <div class ="col-md-9">
                        <SntView />
                        <SntForm />
                    </div>
        </div>
    </div>
    )

}


