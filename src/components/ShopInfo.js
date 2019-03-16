import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import { CheckedList } from './CheckedList'

export class ShopForm extends Component {

    render() {
        return (
            <div>
                <Form onSubmit={this.props.onSubmit}>
                    <Form.Group controlId="formDisplayName">
                        <Form.Label>店名</Form.Label>
                        <Form.Control name="name" type="text" placeholder="お店のお名前を入力ください" onChange={this.props.onTextChange} />
                        </Form.Group>					<Form.Group controlId="formBasicEmail">
                        <Form.Label>コメント</Form.Label>
                        <Form.Control name="commnet" type="text" placeholder="コメントを表示してください。" onChange={this.props.onTextChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        変更する
                    </Button>
                </Form>
            </div>
        );
    }
}

export class ShopInfo extends React.Component {
    constructor(props) {
        super(props);
        this.onTextChange = this.onTextChange.bind(this)
        this.onButtonClick = this.onButtonClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = { 
            name: "",
            comment: "",
            data: {},
        };
    }

    render() {
        return (
            <div>
                <div>
                    <ShopForm 
                        onTextChange={this.onTextChange} 
                        onButtonClick={this.onButtonClick}
                        onSubmit={this.onSubmit}/>
                    <div id="firebaseui-auth-container" />
                    <div id="loader">Now Loading...</div>
                </div>
            </div>
        );
    }

    // アクセス用のキーワードを生成する
    getDBKey = (user,shop) => "key_" + user + "_" + shop;

    onTextChange(e) {
        if (e.target.name === "name" ){
            this.setState({
                "name": e.target.value,
            });
        } else if (e.target.name === "comment"){
            this.setState({
                "comment": e.target.value,
            });
        }
        console.log(this.state)
    }

    onButtonClick(){
    }

    onSubmit(){
        var start_time = (new Date()).toString();
        var checkin_no = this.state.no + 2;
        var accesskey = getDBKey();
         firebaseDb.ref('shopinfo').push({
            "name" : this.state.name,
            "comment" : this.state.comment,
            "data" : this.state.data,
        })
       console.log(this.state)
    }
}

