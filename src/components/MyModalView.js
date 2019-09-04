import React, { useContext, useState, useEffect , useCallback } from 'react'
import ReactDOM from 'react-dom';
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import {  Modal , InputGroup , FormControl } from 'react-bootstrap';
import * as util from './Util.js';

export const MyModalInput = (props) => {
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
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.nofunc} >{props.no}</Button>
                <Button variant="primary" onClick={props.yesfunc} >{props.yes}</Button>
            </Modal.Footer>
        </Modal>
    );
}

