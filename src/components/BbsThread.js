import React, { Component } from 'react'; import { useState , useEffect } from "react";
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Map from './Map';

export const BbsCreate = (props) => {
    const [ name , setName ] = useState( "Anonymous Thread"),
        [ lat , setLat ] = useState( props.lat || 0.0 ),
        [ lng , setLng ] = useState( props.lng || 0.0 );

    const createThread = () => {
        var create_time = (new Date()).toString();
        firebaseDb.ref('bbs').push({
            "name" : name,
            "create_time" : create_time,
            "lat" : lat,
            "lng" : lng,
        })
    }

    return ( 
        <div>
            <Form onSubmit={createThread} >
                <Form.Group controlId="formDisplayName">
                    <Form.Label>スレッド名</Form.Label>
                    <Form.Control name="name" type="text"
                        placeholder="スレッドの名称を入力してください"
                        onChange={(e)=>{ setName( e.target.value ); console.log(e.target.value);} } />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    作成する
                </Button>
            </Form>
        </div>
    );
}

// スレッドリストの表示 
const BbsLine = (props) => {
    let address = "/bbsmessage/" + props.hashkey;
    console.log( address );

    return (
        <tr>
            <td>{props.hash.name}</td>
            <td>{props.hashkey}</td>
            <td>
                <a class="btn btn-primary" href={address} role="button">Link</a>
                </td>
        </tr>
    ); 
}

// useReactRouter はうまく動かなかった
    /* 
function HelloReact() {
    const { history, location, match  } = useReactRouter();
    return (
        <div>
            <h1>HelloReact</h1>
            <p>{`pathname: ${location.pathname}`}</p>
            <button onClick={() => history.push('/')}>Next</button>
        </div>
    );
}
*/


export const BbsThread = () => {
    const [ bbs , setBbs ] = useState( {} );

    useEffect( ()=> {
        var orderRef = firebaseDb.ref('bbs' )
        orderRef.on("value", (snap) => {
            setBbs( snap.val() );
        })        
    },[] )

    if (bbs == null) return "BBS none";
    let keys = Object.keys(bbs);

    return (
        <div>
            bbsthread
            <table class="table table-hover">
                {
                    keys ? keys.map(data => {
                        return <BbsLine hashkey={data} hash={bbs[data]} />
                    }) : "Nothing Data"
                }
            </table>
        </div>
    );
}


export const BbsThreadTop = (props) => {
    return (
        [
            <BbsThread props={props} />,
            <BbsCreate lat="30" lng="30" />,
        ]
    );

}
