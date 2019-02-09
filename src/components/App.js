import React, { Component } from 'react';
import { firebaseDb } from '../firebase/index.js'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { MyPage } from './MyPage';

const messagesRef = firebaseDb.ref('messages')
  
class App extends React.Component {
    constructor(props) {
        super(props);
        this.onTextChange = this.onTextChange.bind(this)
        this.onButtonClick = this.onButtonClick.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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
                    <Route path="/mypage/:id" 
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
        if (e.target.name === "email" ){
            this.setState({
                "email": e.target.value,
            });
        } else if (e.target.name === "password"){
            this.setState({
                "password": e.target.value,
            });
        } else if (e.target.name === "name"){
            this.setState({
                "name": e.target.value,
            });
        }
        console.log(this.state)
    }

    onButtonClick(){
    }

    onSubmit(){
        messagesRef.push({
            "name" : this.state.name,
            "email" : this.state.email,
            "password" : this.state.password,
        })
        console.log(this.state)
    }
}

const Home = () => (
    <div>
        hoge
    </div>
)

export default App;


