import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import Pagination from "react-js-pagination";

// カスタマーリストの作成
const CheckedLine = (props) => {
    return (
        <tr>
            <td>{props.hash['name']}</td>
            <td>{props.hash['email']}</td>
        </tr>
    ); 
}

class CheckedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checkin: {} };
    }

    componentWillMount(){
        var orderRef = firebaseDb.ref('checkin' )
        orderRef.on("value", (snap) => {
            this.setState({
                checkin: snap.val() 
            });
        })
    }

    render() {
        let hash = this.state['checkin'];
        return (
            <table class="table table-">
                {
                    Object.keys(hash).map((data) => {
                        return <CheckedLine hash={hash[data]} />
                    })}
            </table>
        );
    }
}

export class CheckedList extends React.Component {

    render() {
        return (
            <div>
                <CheckedTable />
            </div>
        );
    }
}

