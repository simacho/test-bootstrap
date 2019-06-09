import React, { createContext, useState, useEffect , useCallback } from 'react'
import firebase from 'firebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState(null)

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

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
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
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthProvider }
