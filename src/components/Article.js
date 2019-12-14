import React, { Component } from 'react';
import { useContext, createContext, useState , useEffect ,useCallback , useMemo } from "react";
import { Button , Alert , Badge , Form , ListGroup } from 'react-bootstrap';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { firebaseDb , firestoreDb } from '../firebase/index.js'
import { Sentence , SentenceContext } from './Sentence';
import * as util from './Util.js';
import { SntForm , SntView } from './SntView'

const ArticleContext = createContext()


const ArticleProvider = ({children}) => {
    const [ loading , setLoading ] = useState( true )
    const [ reload , setReload ] = useState( false )

    // 作成する
    const create = async ( belongto , name ) => { 
        console.log( 'articlele create ' + pid + ' ' + name )
        try {
            let clref = firestoreDb.collection('articles')
            await clref.doc(pid).get().then( pdoc => {
                clref.add({
                    name: name,
                    belong : [],
                }).then( ref => {
                    // 成功時処理
                })
            })
            setReload( true )
        } catch (e) {
            console.log("error occured")
        }
    }

    // 削除する 
    const vanish = ( vid ) => { 
        console.log( 'vtx delete' + vid )
        try {
            let crf = firestoreDb.collection('articles')
            let rf = crf.doc(vid) 
            let dc = rf.get().then(doc => {
                if ( doc.exists ){
                    let pvt = vtx[vid].parent;
                    let prf = crf.doc(vtx[vid].parent)

                    if (pvt != null ){
                        // 親のノードから削除
                        prf.update({
                            children: firebase.firestore.FieldValue.arrayRemove(vid)
                        })
                    }
                    // 子供のノードの削除
                    doc.data().children.map((child) => {
                        if ( pvt != null ){
                            prf.update({
                                children: firebase.firestore.FieldValue.arrayUnion(child)
                            })
                        }
                        crf.doc(child).update({parent: doc.data().parent})
                    })
                }
            })
            // rf.delete();
            setReload( true )
        } catch (e) {
            console.log("error occured")
        }
    }

    // 移動 
    const move = ( vid , tid) => { 
        console.log( 'vtx move ', vid , " to " ,tid )
        try {
            let crf = firestoreDb.collection('vertices')
            let rf = crf.doc(vid) 
            let trf = crf.doc(tid)
            let dc = rf.get().then(doc => {
                if ( doc.exists ){
                    let pvt = vtx[vid].parent;
                    let prf = crf.doc(vtx[vid].parent)

                    if (pvt != null ){
                        // 親のノードから削除
                        prf.update({
                            children: firebase.firestore.FieldValue.arrayRemove(vid)
                        })
                    }
                    // 移動先に接続
                    rf.update( { parent: tid })
                    trf.update( { children: firebase.firestore.FieldValue.arrayUnion(vid) })
                }
            })
            // rf.delete();
            setReload( true )
        } catch (e) {
            console.log("error occured")
        }
    }

    // 検索
    const search = async ( name ) => {
        let query = firestoreDb.collection('vertices').where('name','==', name ) 
        let ret = null

        if ( query == null ) return ret 
        await query.get().then((snp)=>{
            if (snp.size > 0){
                ret = snp.docs[0].ref.id
            }
        })
        return ret
    }

    // ノード情報の変更
    const update = (vid , name) => { 
        try {
            let crf = firestoreDb.collection('vertices')
            let rf = crf.doc(vid).update({name: name})
            vtx[vid].name = name
        } catch (e) {
            console.log("error occured")
        }
    }

    // ノード情報の読み込み
    const load = useCallback(async (address,filter) => {
        try {
            setLoading(true)
            console.log('firestore load')
            let datahash = {} 
            let childlist = []
            let dcref = await firestoreDb.collection('vertices').get().then((snapshot)=>{
                snapshot.forEach((doc) => {
                    datahash[doc.ref.id] = doc.data()
                   if ( "parent" in doc.data() && doc.data().parent == null ) setRoot( doc.ref.id )
                })
            })
            setReload(false)
            setVtx( datahash )
            console.log( 'firestore loaded ' , datahash , root )
            setLoading(false)
        } catch (e) {
            console.error(e.code, e.message)
        }
    }, [])

    // カレント設定
    const setcrnt = (id) => {
        setCrnt( id )
        console.log(id)
    }

    return (
        <ArticleContext.Provider
            value={{
                create,
                create_byname,
                update,
                vanish,
                search,
                move,
                load,
                vtx,
                crnt,
                setcrnt,
                reload,
                loading,
                root,
            }}
        >
            {children}
        </ArticleContext.Provider>
    )
}


export {  ArticleContext , VertexProvider , VertexCreate }


