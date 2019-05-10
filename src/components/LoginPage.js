import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'

export class LoginPage extends React.Component {
    componentDidMount() {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        const uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    console.log("Success Login");
                    return true;
                },
                uiShown: () => {
                    document.getElementById('loader').style.display = 'none';
                },
            },
            signInFlow: 'popup',
            signInSuccessUrl: 'mypage',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            tosUrl: 'terms',
            privacyPolicyUrl: 'policy',
        };
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    render() {
        return (
            <div>
                <div id="firebaseui-auth-container" />
                <div id="loader">Now Loading...</div>
            </div>
        );
    }
}



