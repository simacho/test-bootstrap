import React, { Component } from 'react';
import { firebaseDb } from '../firebase/index.js'
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import { MyPage } from './MyPage';
import { LoginPage } from './LoginPage';

const messagesRef = firebaseDb.ref('messages')


class App extends React.Component {
    render(){
        return (
            <PostList />
        );
    }
}

/*
const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest}
        render={props => fakeAuth.isAuthenticated ? ( <Component {...props} /> ) : (
            <Redirect to={{ 
                pathname: "/login", state: { from: props.location }
            }} />
        )
        }
    />
);
*/




class PostList extends React.Component {
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

/*
    componentWillMount() {
        this.checkAuthentication(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.checkAuthentication(nextProps);
        }
    }
*/

    loggedIn() {
        return true
    }

    render() {
        return(
            <BrowserRouter>
            <div>
                <Route exact path="/" render={()=> (
                    this.loggedIn() ? <Redirect to="/dashboard"/> : <Home/>
                )}/>
                <Route exact path="/login" component={LoginPage} />
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

    /* render={()=> ( this.loggedIn() ? ( <Redirect t
     * render = { ()=> (this.loggedIn() ? (<Home/>) : (<Hoge/>)) } />
     */


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


