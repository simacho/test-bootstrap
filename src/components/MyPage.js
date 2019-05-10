import React, { Component } from 'react';
import { useState , useEffect } from "react";
import firebase from 'firebase';
import firebaseui from 'firebaseui';
// import './MyPage.css';
import { Button , Alert , Badge , Form } from 'react-bootstrap';


export let MyPageDisplayInfo = () => {
    const [ displayName , setDisplayName ] = useState( "default name" ),
        [ email , setEmail ] = useState( "default email" ),
        [ emailVerified , setEmailVerified ] = useState( "defaut no" ),
        [ photoURL , setPhotoURL ] = useState( "default photourl" ),
        [ uid , setUid ] = useState( "default uid" );


	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
			// User is signed in.
			setDisplayName(user.displayName);
			setEmail(user.email);
        //emailVerified = user.emailVerified;
			setPhotoURL(user.photoURL);
        //		isAnonymous = user.isAnonymous;
			setUid(user.uid);
        //			providerData = user.providerData;
	    console.log("iauth callback called");	
	    console.log(displayName);	
			} else {
			// User is signed out.
		}
	});

    return (
        <div>
            MyPage
            <tr>
                <td> <img src={photoURL} width="64" height="64"/></td>
                <td> {displayName} </td>
                <td> {email} </td>
                <td> {uid} </td>
            </tr>
        </div>
    );

}

export class MyPage extends Component {

    render() {
        return (
            <div>
                <MyPageDisplayInfo />
                {/*
                <Form onSubmit={this.props.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Eメールアドレス</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Eメールアドレスを入力してください" onChange={this.props.onTextChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control name="password" type="password" placeholder="パスワード" onChange={this.props.onTextChange} />
                    </Form.Group>
                    <Form.Group controlId="formDisplayName">
                        <Form.Label>表示名称</Form.Label>
                        <Form.Control name="name" type="text" placeholder="表示名" onChange={this.props.onTextChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
                */}
            </div>
        );
    }
}

