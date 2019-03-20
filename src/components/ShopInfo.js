import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import { CheckedList } from './CheckedList'

export class ShopInfoForm extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={this.props.onSubmit}>
                    <Form.Group controlId="formDisplayName">
                        <Form.Label>お店の名前</Form.Label>
                        <Form.Control name="name" type="text" placeholder="お店の名前を入力してください" onChange={this.props.onTextChange} />
                        </Form.Group>					<Form.Group controlId="formBasiccomment">
                        <Form.Label>コメント</Form.Label>
                        <Form.Control name="comment" type="text" placeholder="" onChange={this.props.onTextChange} />
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

    render() {
        return (
            <div>
                <div>
                    <CheckedList />
                </div>
                <div>
                    <ShopInfoForm 
                        onTextChange={this.onTextChange} 
                        onButtonClick={this.onButtonClick}
                        onSubmit={this.onSubmit}/>
                    <div id="firebaseui-auth-container" />
                    <div id="loader">Now Loading...</div>
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
        var ref = firebaseDb.ref('shopinfo/' + this.props.user);
        ref.set({
            "name" : this.state.name,
            "comment" : this.state.email,
        })
       console.log(this.state)
    }
}


