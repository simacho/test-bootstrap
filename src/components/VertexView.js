import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , FormControl , ListGroup } from 'react-bootstrap';
import {  Dropdown, DropdownButton , ButtonGroup } from 'react-bootstrap';
import {  Modal , InputGroup } from 'react-bootstrap';
import { Sentence , SentenceContext } from './Sentence';
import { VertexProvider , VertexContext , VertexCreate } from './Vertex'
import { MyModalInput , MyModalYesNo } from './MyModalView'

import * as util from './Util.js';

// ノードツリー
const VertexTree = (props) => {
    const vc = useContext(VertexContext)
    let depth = parseInt(props.depth)
    const [collapse , setCollapse] = useState( false )
    const [dlg , setDlg] = useState(0)

    const data = vc.vtx[props.present]
    //
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
        const okDlgEdit = (ev,arg) => {
            vc.update(ev , props.present , arg) 
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

    // delete menu
    const VertexModalDelete = () => {
        const isDlgDelete = () => { return dlg == 2  ? true : false }
        const resetDlgDelete = () => {setDlg(0)}
        const okDlgDelete = (ev) => {
            vc.vanish(ev , props.present) 
            setDlg(0) 
        }
        return (
            <MyModalYesNo show={isDlgDelete} onHide={resetDlgDelete}
                caption ="delete" label="label"                        
                no="close" yes="OK"
                nofunc={resetDlgDelete} yesfunc={okDlgDelete}
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
                        <Dropdown.Item as="button" onSelect={()=> setDlg(2) } >Delete</Dropdown.Item>
                        <Dropdown.Item as="button">Cleate</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </div>
        )
    }

    const VertexDisp = () => {
        //       console.log( props.vtx.get() )
        const onclick = () => vc.setcrnt(props.present)
        let crnt = vc.crnt == props.present ? true : false
        return (
            <ListGroup.Item
                action onClick={onclick}
                active = {crnt} 
            >
                {'---'.repeat(depth)}
                {data['name']}　{props.present}
                {data['children'].length >=1 && <VertexCollpaseButton />}
                {crnt ? <VetexDropDown /> : "" }
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
                data['children'].map((child) => {
                    return <VertexTree present={child} depth={depth+1} />
                })
            }
            <VertexModalEdit />
            <VertexModalDelete />
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
    if (vc.loading == true) return "";

    console.log( vc.root )

    return (
        <div>
            <table class="table">
                <VertexTree present={vc.root} depth='0' />
            </table>
            <VertexCreate />
        </div>
    )

}


