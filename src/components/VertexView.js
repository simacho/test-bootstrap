import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , FormControl , ListGroup } from 'react-bootstrap';
import {  Dropdown, DropdownButton , ButtonGroup } from 'react-bootstrap';
import {  Modal , InputGroup } from 'react-bootstrap';
import { Sentence , SentenceContext } from './Sentence';
import { VertexProvider , VertexContext , VertexCreate } from './Vertex'
import { MyModalInput } from './MyModalView'

import * as util from './Util.js';

const isValueInfo = (val) => { return val.match(/^[_].+/) }

// ノードツリー
const VertexTree = (props) => {
    const vc = useContext(VertexContext)
    let depth = parseInt(props.depth)
    const [collapse , setCollapse] = useState( false )
    const [dlg , setDlg] = useState(0)

    // 読み込みが終わるまでは表示できない
    if ( props.vtx.docs == null ) return null
    console.log( props.vtx )
    var docs = props.vtx.docs.map( elem => elem.data() )

    // ボタンでの開閉処理
    const VertexCollpaseButton = () => {
        return (
            <span onClick={()=>setCollapse(!collapse)} >
                {collapse ?  <i class="fas fa-plus-square"></i> : <i class="fas fa-minus-square"></i>  }
            </span>
        )
    }

   
    // Edit menu
    const VertexModalEdit = () => {
        const isDlgEdit = () => { return dlg == 1 ? true : false }
        const resetDlgEdit = () => {setDlg(0)}
        const okDlgEdit = (arg) => {
            vc.mergeupdate( vc.crnt , arg ) 
            setDlg(0) 
        }
        return (
            <MyModalInput show={isDlgEdit} onHide={resetDlgEdit}
            caption ="edit" label="label"                        
            no="close" yes="OK"
            nofunc={resetDlgEdit} yesfunc={okDlgEdit}
        />
        )
    }


    // ドロップダウンメニュー
    const VetexDropDown = () => {
        return (
            <div class="float-right">
            <ButtonGroup>
                <DropdownButton variant="secondary" size="sm" id="dropdown-item-button" title="" drop="left" >
                    <Dropdown.Item as="button" onSelect={()=> setDlg(1) } >Edit</Dropdown.Item>
                    <Dropdown.Item as="button">Delete</Dropdown.Item>
                    <Dropdown.Item as="button">Cleate</Dropdown.Item>
                </DropdownButton>
            </ButtonGroup>
        </div>
        )
    }

    const VertexDisp = () => {

        return (
            <ListGroup.Item
                action onClick={vc.setcrnt}
                active = {vc.crnt == props.key ? true : false }
            >
                {'---'.repeat(depth)}
                {"_name" in props.vtx ? props.vtx._name : ""}
                {/*
                {list.length >=1 && <VertexCollpaseButton />}
                */}
                <VetexDropDown />
            </ListGroup.Item>
        )
    }

    const VertexListDisp = (dc) => {
        return (
            <div>
                <ListGroup as="ul">
                    <VertexDisp />
                </ListGroup>
                {/*                {
                    collapse ? "" : 
                        list2.map( sn => {
                            return <VertexTree key={sn} vtx={props.vtx[sn]} depth={depth+1} />
                        })
                }*/}
                <VertexModalEdit />
            </div>
        )
    }

    // 
    return (
        docs.map( dc => {
            return <VertexListDisp dc={dc}/>
        }
        )
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


