import React, { createContext, useState, useEffect , useCallback } from 'react'
import { Button , Alert , Badge , Form } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb } from '../firebase/index.js'
import * as util from './Util.js';

const SentenceContext = createContext()

const Sentence = ({children}) => {

    const [ data , setData ] = useState( {} );
    var address = 'sentence/'

    const Create = (props) => { 
        const [ name , setName ] = useState( "" ),
            [ msg , setMsg ] = useState( "" )

        const WriteMsg = (e:InputEvent) => {
            var create_time = (new Date()).getTime();
            firebaseDb.ref(address).push({
                "name" : name, "create_time" : create_time,"msg" : msg,
            })
            e.preventDefault();
        }

        return (
            <div>
                <Form onSubmit={(e)=>WriteMsg(e)} >
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows="3"
                            onChange={(e)=>{ setMsg( e.target.value ); } } />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        作成する
                    </Button>
                </Form>
            </div>
        );
    } 

    // 表示 
    const Disp = (props) => {
        return (
            <tr>
                <td>{props.data.name}</td>
                <td><util.NewLineToBr>{props.data.msg}</util.NewLineToBr></td>
                <td class="text-right"><small>{util.Datelong2Format(props.data.create_time)}</small></td>
                <td><i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i></td>
            </tr>
        ); 
    }

    // リスト表示
    const DispList = (props) => {
        props.lst.map(data => {
            return <Disp data={data} />
        })
    }

    // 読み込み
    const Load = useCallback(async (address,filter) => {
        try {
            //            setLoading(true)
            var orderRef = firebaseDb.ref(address)
            orderRef.on("value", (snap) => {
                setData( snap.val() );
            })        
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])


    // 返り値
    return (
        <SentenceContext.Provider
            value={{
                Create,
                Disp,
                DispList,
                Load,
            }}
        >
            {children}
        </SentenceContext.Provider>
    )
}

export { SentenceContext, Sentence }




