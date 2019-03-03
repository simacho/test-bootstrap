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
        this.state = { checkin: {} , dispcheck: [] , pageCount: 1 , perPage: 10 , length: 0 , offset:0 };
    }

    // 表示するリストの抽出
    loadCheckList(vhash,ofst){
        let filt;
        filt = Object.keys(vhash).filter((value,index,array)=>{
            let sidx = this.state.perPage * ( ofst  - 1);
            return ( index >= sidx ) && ( index < sidx + this.state.perPage );
        }) 
        return filt;
    }

    componentWillMount(){
        var orderRef = firebaseDb.ref('checkin' )
        orderRef.on("value", (snap) => {
            let vhash = snap.val()
            let length = Object.keys(vhash).length;

            console.log('length'+length)
            this.setState({
                checkin: snap.val() ,
                length: length ,
                pageCount: Math.ceil(length/this.state.perPage),
                dispcheck: this.loadCheckList(vhash,this.state.offset)
            });
        })
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);

        console.log(data.selected);
        this.loadCheckList( this.state.checkin , selected );
        this.setState({ offset: offset });
    };


    render() {
        let hash = this.state['checkin'];
        let dcheck = this.state['dispcheck'];
        console.log(dcheck);
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
                        dcheck.map((data) => {
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

