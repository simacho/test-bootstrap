import React, { Component , useEffect , useContext } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import { AuthProvider , AuthContext } from './Auth';

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

export const LoginPage2 = ()=> {
    const auth = useContext(AuthContext)
    useEffect( ()=> {
        auth.signup_ui()
    },[] )

    return (
        <div>
            <div id="firebaseui-auth-container" />
            <div id="loader">Now Loading...</div>
        </div>
    )
}


