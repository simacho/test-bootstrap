import React, { useContext, useState, useEffect , useCallback } from 'react'
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import * as util from './Util.js';
import { Sentence , SentenceContext } from './Sentence.js'


// 作成
export const SntForm = (props) => {
    const snt = useContext(SentenceContext)
    const [ name , setName ] = useState( props.name ),
        [ msg , setMsg ] = useState( "" )

    return (
        <div>
            <Form onSubmit={(e)=>snt.create(e,name,msg) } >
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3"
                        onChange={(e)=>{ setMsg( e.target.value ); console.log(msg) } } />
                </Form.Group>
            <Button variant="primary" type="submit" >
                作成する
            </Button>
        </Form>
    </div>
    );
}


// View 1行
const Disp = (props) => {
    return (
        <tr>
            <td>{props.data.name}</td>
            <td><util.NewLineToBr>{props.data.msg}</util.NewLineToBr></td>
            <td class="text-right"><small>{util.Datelong2Format(props.data.create_time)}</small></td>
            <td><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></td>
        </tr>
    ); 
}

// View 全体 
export const SntView = (props) => {
    const snt = useContext(SentenceContext)
    useEffect( ()=> {
        snt.Load()
    },[] )

    return (
        <div>
            {
                snt ? snt.lst.map( dt => {
                    return <Disp data={dt}/>
                }) : "NoData"
            }
        </div>
    )
}

