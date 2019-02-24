import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'


class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: {} };
    }

    componentWillMount(){
        var orderRef = firebaseDb.ref('messages' )
        orderRef.on("value", (snap) => {
            this.setState({
                messages: snap.val() 
            });
        })
    }

    render() {
        let hash = this.state['messages'];
        return (
            <ul>
                {
                    Object.keys(hash).map((data) => {
                        return <li>{hash[data]['name']}</li>
                    })}
            </ul>
        );
    }
}

export class CheckIn extends React.Component {

    render() {
        return (
            <div>
                <CustomerList />
                <div id="firebaseui-auth-container" />
                <div id="loader">Now Loading...</div>
            </div>
        );
    }
}

