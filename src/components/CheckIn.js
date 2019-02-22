import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'

class CustomerList extends React.Component {
    render() {
        return "";
    }
}

export class CheckIn extends React.Component {
    render() {
        return (
            <div>
                <CustomerList />
                <div id="firebaseui-auth-container" />
                <div id="loader">Now Loading...</div>
            </div>
        );
    }
}

