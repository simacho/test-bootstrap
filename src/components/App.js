import React, { useState, useContext, useEffect, useCallback } from 'react'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import { UserList } from './UserList';
import { CheckIn } from './CheckIn';
import { ShopInfo } from './ShopInfo';
import { CustomInfo } from './CustomInfo';
import { BbsMessageTop } from './BbsMessage';
import { BbsThreadTop } from './BbsThread';
import { AuthProvider , AuthContext } from './Auth';
import { MyPageDisplayInfo } from './MyPage'
import { LoginPage, LoginPage2 } from './LoginPage'
import { VertexView } from './VertexView'
import { Sentence , SentenceContext } from './Sentence';
import { VertexProvider , VertexContext } from './Vertex';

export default () => {
    return (
        <AuthProvider>
            <VertexProvider>
                <Sentence>
                    <BrowserRouter>
                        <LoginRoute />
                    </BrowserRouter>
                </Sentence>
            </VertexProvider>
        </AuthProvider>
    );
}

const LoginRoute = () => {
    const auth = useContext(AuthContext)

    console.log(auth)

    if ( auth.currentUser ){
        return (
            <div>
                logined page
                <Route exact path="/" component={Home} />
                <Route path="/checkin/:id" component={CheckIn} />
                <Route path="/userlist" component={UserList} />
                <Route path="/vertex/:address" component={VertexView} />
                <Route path="/bbsthread" component={BbsThreadTop} />
                <Route path="/bbsmessage/:id/" component={BbsMessageTop} />
                <Route path="/shopinfo/:id" component={ShopInfo} />
                <Route path="/custominfo/:id" component={CustomInfo} />
                <Route path="/mypage" component={MyPageDisplayInfo} /> 
            </div>
        );
    } else {
        return (
            <div>
                unlogined page
                <Route path="/" component={LoginPage2} />
            </div>
        )
    }
}

const Home = () => { 
    const auth = useContext(AuthContext)
    return (
        <div>
            { auth.currentUser ? "hoge" : "fuga" }
        </div>
    );
}



