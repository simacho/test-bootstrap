import React, { Component } from 'react';
import { useState , useEffect } from "react";
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'

// スレッドリストの表示 
const BbsLine = (props) => {
    return (
        <tr>
            <td>{props.hash['name']}</td>
            <td>{props.hash['lat']}</td>
            <td>{props.hash['lng']}</td>
        </tr>
    ); 
}

export default const BbsThread = (props) => {
    const [ bbs , setBbs ] = useState( {} );

    useEffect( ()=> {
        var orderRef = firebaseDb.ref('bbs' )
        orderRef.on("value", (snap) => {
            setBbs( snap.val() );
        })        
    },[bbs] )

    let hash = bbs['bbs'];

    return (
        <table class="table table-">
            {
                Object.keys(hash).map((data) => {
                    return <BbsLine hash={hash[data]} />
                })
            }
        </table>
    );
}



