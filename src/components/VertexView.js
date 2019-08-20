import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import { Sentence , SentenceContext } from './Sentence';
import { VertexProvider , VertexContext , VertexCreate } from './Vertex'

import * as util from './Util.js';

const isValueInfo = (val) => { return val.match(/[_].+/) }

// ノードツリー
const VertexTree = (props) => {
    const vc = useContext(VertexContext)
    let depth = parseInt(props.depth)
    const [collapse , setCollapse] = useState( false )

    // Object かつ _で始まる要素を抜いた物を子供とする
    var list = Object.keys(props.vtx).filter( x => util.isObject(props.vtx[x]))
    var list2 = list.filter( x => !isValueInfo(x) )

    // ボタンでの開閉処理
    const VertexCollpaseButton = () => {
        return (
            <span onClick={()=>setCollapse(!collapse)} >
                {collapse ?  <i class="fas fa-plus-square"></i> : <i class="fas fa-minus-square"></i>  }
            </span>
        )
    }

    const VertexDisp = () => {

        return (
            <ListGroup.Item
                action onClick={vc.setcrnt}
                active = {vc.crnt == props.key ? true : false }
            > {'---'.repeat(depth)}
                {"_fullname" in props.vtx ? props.vtx._fullname : ""}
                {list2.length >=1 && <VertexCollpaseButton />}
            </ListGroup.Item>
        )
    }
    // 
    // 
    return (
        <div>
            <ListGroup as="ul">
                <VertexDisp />
            </ListGroup>
            {
                collapse ? "" : 
                list2.map( sn => {
                    return <VertexTree key={sn} vtx={props.vtx[sn]} depth={depth+1} />
                })
            }
        </div>
    ) 
}


export const VertexView = (props) => {
    const vc = useContext(VertexContext)
    let address = props.match.params.address;
    // ノード情報の読み込み
    useEffect(() => {
        vc.load(address)
    },[] )

    if (vc.vtx == null ) return "Vertex ReadErr";

    return (
        <div>
            <table class="table">
                <VertexTree vtx={vc.vtx} depth='0' />
            </table>
            <VertexCreate />
        </div>
    )

}


