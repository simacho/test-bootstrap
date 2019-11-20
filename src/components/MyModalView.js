import React, { useContext, useState, useEffect , useCallback } from 'react'
import ReactDOM from 'react-dom';
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import {  Modal , InputGroup , FormControl } from 'react-bootstrap';
import * as util from './Util.js';

//
// 入力ダイアログ
//
export const MyModalInput = (props) => {
    const [ txt , setTxt ] = useState("")
    const onclick = useEffect( (e) => props.yesfunc(e,txt) , [])

    return (
        <Modal show={props.show()} onHide ={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.caption}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">{props.label}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(e)=>{ setTxt( e.target.value ); console.log(txt)}}/>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer> <Button variant="secondary" onClick={props.nofunc} >{props.no}</Button> <Button variant="primary" onClick={onclick} >{props.yes}</Button> </Modal.Footer>
        </Modal>
    );
}


//
// 2択ダイアログ
//
export const MyModalYesNo = (props) => {
    const onclick = (e) => props.yesfunc(e)

    return (
        <Modal show={props.show()} onHide ={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.caption}</Modal.Title>
            </Modal.Header>
            <Modal.Footer> <Button variant="secondary" onClick={props.nofunc} >{props.no}</Button> <Button variant="primary" onClick={onclick} >{props.yes}</Button> </Modal.Footer>
        </Modal>
    );
}



