import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import { CheckedList } from './CheckedList'

const CustomInfoForm = (props) => {
    return (
        <div>
            <Form onSubmit={props.onSubmit}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control name="textbox" as="textarea" rows="3" onChange={props.onChange} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    登録する
                </Button>
            </Form>
        </div>
    );
}

export class CustomInfo extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.state = { text: "" };
    }

    componentWillMount(){
        var orderRef = firebaseDb.ref('custominfo/' + this.props.id )
        orderRef.on("value", (snap) => {
            console.log(snap.val())
            if ( snap.exists() ){
                //   this.setState({snap.val()});
                console.log(this.state)
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    <CustomInfoForm 
                        onSubmit={this.onSubmit} onChange={this.onChange} />
                    <div id="firebaseui-auth-container" />
                </div>
            </div>
        );
    }

    onChange(e) {
        if (e.target.name === "textbox" ){
            this.setState({
                "text": e.target.value,
            });
        }
    }

    onSubmit(event){
        //        var ref = firebaseDb.ref('custominfo/' + this.props.id);
        // ref.set({this.state})
        console.log(event);
    }
}


