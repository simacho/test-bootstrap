import React, { createContext, useState, useEffect , useCallback } from 'react'
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import * as util from './Util.js';

const SentenceContext = createContext()

const Sentence = ({children}) => {

    const [ data , setData ] = useState( {} );
    const [ lst , setList ] = useState( [] );
    var address = 'sentence/'

    const create = (ev:InputEvent , name , msg , address ) => { 
        try {
            var create_time = (new Date()).getTime();
            firebaseDb.ref(address).push({
                "name" : name, "create_time" : create_time,"msg" : msg,
                "address" : address, 
            })
            // console.log("create called")
            return ev.preventDefault();
        } catch (e) {
            return ev.preventDefault();
        }
    }

    const load = useCallback(async (address,filter) => {
        try {
            //            setLoading(true)
            var orderRef = firebaseDb.ref(address)
            orderRef.on("value", (snap) => {
                setData( snap.val() )
                setList( Object.keys(snap.val() ))
            })        
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    return (
        <SentenceContext.Provider
            value={{
                create,
                load,
                data,
                lst,
            }}
        >
            {children}
        </SentenceContext.Provider>
    )
}

export { SentenceContext, Sentence }
