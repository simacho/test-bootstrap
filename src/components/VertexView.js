import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import { Sentence , SentenceContext } from './Sentence';
import { VertexProvider , VertexContext , VertexCreate } from './Vertex'

import * as util from './Util.js';

// ノードツリー
const VertexTree = (props) => {
    const vc = useContext(VertexContext)
    let depth = parseInt(props.depth)

    const VertexDisp = () => {
        return (
            <ListGroup.Item
                action onClick={vc.setcrnt}
                active = {vc.crnt == props.key ? true : false }
            > {'---'.repeat(depth)} {collapse ?  <i class="fas fa-plus-square"></i> : <i class="fas fa-minus-square"></i>  }
                {"_name" in props.vtx ? props.vtx._name : ""}
            </ListGroup.Item>
        )
    }

    // 
    return (
        <div>
            <ListGroup as="ul">
                <VertexDisp />
            </ListGroup>
            {
                Object.keys(props.vtx).map( sn => {
                    if (!isObject(props.vtx[sn]) ) continue 
                        return <VertexTree key={sn} vtx={props.vtx[sn]} depth={depth+1} />
                }) : ""
            }
        </div>
    ) 
}


export const VertexView = (props) => {
    const vc = useContext(VertexContext)

    // ノード情報の読み込み
    useEffect(() => {
        vc.load()
    },[] )

    if (vc.vtx == null ) return "Vertex ReadErr";

    return (
        <div>
            <table class="table">
                <VertexTree vtx={vc.vtx} depth='0' />
            </table>
        </div>
    )

}


