import React, { useState, useContext, useEffect, useCallback } from 'react'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import { MyPageDisplayInfo } from './MyPage';
import { LoginPage } from './LoginPage';
import { UserList } from './UserList';
import { CheckIn } from './CheckIn';
import { ShopInfo } from './ShopInfo';
import { CustomInfo } from './CustomInfo';
import { BbsMessageTop } from './BbsMessage';
import { BbsThreadTop } from './BbsThread';
import { AuthProvider , AuthContext } from './Auth';

export default () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div>
                    {/*    <Route exact path="/" render={()=> {
                        auth.currentUser ? <Redirect to ="/dashboard" /> : <Home />
    )}}/> */}
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={LoginPage} />
                <Route path="/checkin/:id" component={CheckIn} />
                <Route path="/userlist" component={UserList} />
                <Route path="/bbsthread" component={BbsThreadTop} />
                <Route path="/bbsmessage/:id/" component={BbsMessageTop} />
                <Route path="/shopinfo/:id" component={ShopInfo} />
                <Route path="/custominfo/:id" component={CustomInfo} />
                <Route path="/mypage" component={MyPageDisplayInfo} /> 
            </div>
        </BrowserRouter>
    </AuthProvider>
    );
}

const Home = () => { 
    const auth = useContext(AuthContext)
    return (
    <div>
        { auth.currentUser ? "hoge" : "fuga" }
    </div>
    );
}



