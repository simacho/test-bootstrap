import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { MyPage } from './MyPage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/mypage" component={MyPage} />
                </div>
            </BrowserRouter>
        );
    }
}

const Home = () => (
    <div>
        hoge
    </div>
)

export default App;


