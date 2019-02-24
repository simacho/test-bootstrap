import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import { CheckedList } from './CheckedList'

export class CheckInForm extends Component {

    render() {
        return (
            <div>
                <Form onSubmit={this.props.onSubmit}>
                    <Form.Group controlId="formDisplayName">
                        <Form.Label>お名前</Form.Label>
                        <Form.Control name="name" type="text" placeholder="お客様のお名前を入力ください" onChange={this.props.onTextChange} />
                        </Form.Group>					<Form.Group controlId="formBasicEmail">
                        <Form.Label>メールアドレス</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Eメールアドレスを入力してください" onChange={this.props.onTextChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        予約する
                    </Button>
                </Form>
            </div>
        );
    }
}

export class CheckIn extends React.Component {
    constructor(props) {
        super(props);
        this.onTextChange = this.onTextChange.bind(this)
        this.onButtonClick = this.onButtonClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = { 
            name: "",
            email: "",
            status: "",
            start_time: "",
            end_time: "" 
        };
    }

    render() {
        return (
            <div>
                <div>
                    <CheckedList />
                </div>
                <div>
                    <CheckInForm 
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
        } else if (e.target.name === "email"){
            this.setState({
                "email": e.target.value,
            });
        }
        console.log(this.state)
    }

    onButtonClick(){
    }

    onSubmit(){
        firebaseDb.ref('checkin').push({
            "name" : this.state.name,
            "email" : this.state.email,
            "status" : this.state.status,
            "start_time" : this.state.start_time,
            "end_time" : this.state.end_time,
        })
        console.log(this.state)
    }
}

