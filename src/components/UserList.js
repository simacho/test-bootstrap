import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'

// カスタマーリストの作成
const UserLine = (props) => {
    return (
        <tr>
            <td>{props.hash['name']}</td>
            <td>{props.hash['email']}</td>
            <td>{props.hash['email']}</td>
        </tr>
    ); 
}

class UserTable extends React.Component {
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
            <table class="table table-">
                {
                    Object.keys(hash).map((data) => {
                        return <UserLine hash={hash[data]} />
                    })}
            </table>
        );
    }
}

export class UserList extends React.Component {

    render() {
        return (
            <div>
                <UserTable />
                <div id="firebaseui-auth-container" />
                <div id="loader">Now Loading...</div>
            </div>
        );
    }
}

