import React, { Component } from 'react';
import { firebaseDb } from '../firebase/index.js'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { MyPage } from './MyPage';

const messagesRef = firebaseDb.ref('messages')
  
class App extends Component {
    constructor(props) {
        super(props);
        this.onTextChange = this.onTextChange.bind(this)
        this.onButtonClick = this.onButtonClick.bind(this)
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/mypage" 
                        render={props => <MyPage onTextChange={this.onTextChange} 
                            onButtonClick={this.onButtonClick}
                            onSubmit={this.onSubmit}
                                />}
                    />
                </div>
            </BrowserRouter>
        );
    }

    onTextChange(e) {
        console.log("onTextChange!!!")
    }

    onButtonClick(){
        console.log("onButtonClick!!!")
    }
    onSubmit(){
        console.log("onSubmit!!!")
    }

}

const Home = () => (
    <div>
        hoge
    </div>
)


export default App;


