import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , FormControl , ListGroup } from 'react-bootstrap';
import {  Dropdown, DropdownButton , ButtonGroup } from 'react-bootstrap';
import {  Modal , InputGroup } from 'react-bootstrap';
import { Sentence , SentenceContext } from './Sentence';
import { VertexProvider , VertexContext , VertexCreate } from './Vertex'

import * as util from './Util.js';

const isValueInfo = (val) => { return val.match(/^[_].+/) }

// ノードツリー
const VertexTree = (props) => {
    const vc = useContext(VertexContext)
    let depth = parseInt(props.depth)
    const [collapse , setCollapse] = useState( false )
    const [dlg , setDlg] = useState(0)

    // Object かつ _で始まる要素を抜いた物を子供とする
    var list = Object.keys(props.vtx).filter(
        x => util.isObject(props.vtx[x]) && !isValueInfo(x))

    // ボタンでの開閉処理
    const VertexCollpaseButton = () => {
        return (
            <span onClick={()=>setCollapse(!collapse)} >
                {collapse ?  <i class="fas fa-plus-square"></i> : <i class="fas fa-minus-square"></i>  }
            </span>
        )
    }

    const VertexModalEdit = () => {
        const isDlgEdit = () => { return dlg == 1 ? true : false }

        return (
            <Modal show={isDlgEdit()} onHide = {setDlg}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    // ドロップダウンメニュー
    const VetexDropDown = () => {
        return (
            <div class="float-right">
            <ButtonGroup>
                <DropdownButton variant="secondary" size="sm" id="dropdown-item-button" title="" >
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
                {list.length >=1 && <VertexCollpaseButton />}
                <VetexDropDown />
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
                collapse ? "" : 
                list.map( sn => {
                    return <VertexTree key={sn} vtx={props.vtx[sn]} depth={depth+1} />
                })
            }
            <VertexModalEdit />
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


