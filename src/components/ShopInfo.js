import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import { CheckedList } from './CheckedList'

const ShopInfoForm = (props) => {
    return (
        <div>
            <Form onSubmit={props.onSubmit}>
                <Form.Group controlId="formDisplayName">
                    <Form.Label>お店の名前</Form.Label>
                    <Form.Control name="name" type="text" value={props.name} onChange={props.onTextChange} />
                </Form.Group>
                <Form.Group controlId="formBasiccomment">
                    <Form.Label>コメント</Form.Label>
                    <Form.Control name="comment" type="text" value={props.comment} onChange={props.onTextChange} />
                    <Form.Text className="text-muted">
                        We'll never share your comment with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    登録する
                </Button>
            </Form>
        </div>
    );
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
        };
    }

    componentWillMount(){
        var orderRef = firebaseDb.ref('shopinfo/' + this.props.id )
        orderRef.on("value", (snap) => {
            console.log(snap.val())
            if ( snap.exists() ){
                this.setState({
                    name: snap.val() ? snap.val()["name"] : "",
                    comment: snap.val() ? snap.val()["comment"] : ""
                });
                console.log(this.state)
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    <ShopInfoForm 
                        name = {this.state.name}
                        comment = {this.state.comment}
                        onTextChange={this.onTextChange} 
                        onButtonClick={this.onButtonClick}
                        onSubmit={this.onSubmit}/>
                    <div id="firebaseui-auth-container" />
                </div>
            </div>
        );
    }

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
        var ref = firebaseDb.ref('shopinfo/' + this.props.id);
        ref.set({
            "name" : this.state.name,
            "comment" : this.state.comment,
        })
        console.log(this.state)
    }
}


