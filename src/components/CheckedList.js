import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import ReactPaginate from 'react-paginate'

// 時刻の抽出とフォーマット
const ConvDate = (str) => str ? str.match(/\d\d:\d\d:\d\d/) : ""

// カスタマーリストの作成
const CheckedLine = (props) => {
    return (
        <tr>
            <td>{props.hash['name']}</td>
            <td>{props.hash['email']}</td>
            <td>{ConvDate(props.hash['start_time'])}</td>
        </tr>
    ); 
}

class CheckedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { checkin: {} , dispcheck: [] , pageCount: 1 , perPage: 10 , length: 0 , selPage:0 };
    }

    // 表示するリストの抽出
    loadCheckList(vhash,page){
        let filt;
        filt = Object.keys(vhash).filter((value,index,array)=>{
            let sidx = this.state.perPage * page;
            // console.log("sidx " + sidx + " index " + index);
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
                dispcheck: this.loadCheckList(vhash,this.state.selPage)
            });
        })
    }

    handlePageClick = data => {
        let selected = data.selected;

        console.log(data.selected);
        this.setState({ selPage:  selected , 
                dispcheck: this.loadCheckList(this.state.checkin,selected) } );
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

