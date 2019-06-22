import React, { createContext, useState, useEffect , useCallback } from 'react'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

const AuthContext = createContext()
const uiInstance = firebaseui.auth.AuthUI(firebase.auth()) 

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)
    //    const [uiInstance, setUiInstance ] = useState( firebaseui.auth.AuthUI(firebase.auth()))
    
    const signup = useCallback(async (email, password) => {
        try {
            setLoading(true)
            await firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    const signin = useCallback(async (email, password) => {
        try {
            setLoading(true)
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    const signout = useCallback(async () => {
        try {
            setLoading(true)
            await firebase.auth().signOut()
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    const signup_ui = useCallback(async () => {
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
            signInSuccessUrl: '/bbsthread"',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
            tosUrl: 'terms',
            privacyPolicyUrl: 'policy',
        };

        try {
            setLoading(true)
            await uiInstance.start('#firebaseui-auth-container', uiConfig);
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
            console.log( user )
        })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                signup,
                signin,
                signout,
                loading,
                signup_ui,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }
