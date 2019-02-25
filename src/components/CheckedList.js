import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import Pagination from "react-js-pagination";
import 'bootstrap-less';
 
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
        this.state = { checkin: {} , activePage: 1};
    }

    componentWillMount(){
        var orderRef = firebaseDb.ref('checkin' )
        orderRef.on("value", (snap) => {
            this.setState({
                checkin: snap.val() 
            });
        })
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render() {
        let hash = this.state['checkin'];
        return (
            <div>
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={3}
            totalItemsCount={10}
            pageRangeDisplayed={3}
            onChange={this.handlePageChange}
            />
            <table class="table table-">
            {
                Object.keys(hash).map((data) => {
                    return <CheckedLine hash={hash[data]} />
                })}
            </table>
            </div>
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

