import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import ReactPaginate from 'react-paginate'

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
        this.state = { checkin: {} , pageCount: 1 , perPage: 10 , length: 0};
    }

    componentWillMount(){
        var orderRef = firebaseDb.ref('checkin' )
        orderRef.on("value", (snap) => {
            let vhash = snap.val()
            let length = Object.keys(vhash).length;

            console.log('length'+length)
            this.setState({
                checkin: snap.val() ,
                length: length
            });
        })
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);

        this.setState({ offset: offset  }, () => {
            this.loadCommentsFromServer();
        });
    };


    render() {
        let hash = this.state['checkin'];
        return (
            <div>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
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

