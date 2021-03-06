import React, { Component } from "react";
import styled from "styled-components";
import api from "../config/api";
import ls from "local-storage";

let Background = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(/img/back.jpg) no-repeat center top / cover;
`
let LoginForm = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Akronim');
    @import url('https://fonts.googleapis.com/css?family=Rock+Salt');
    text-align: center;
    width: 60%;
    background: rgba(0,0,0,0.8);
    color: #fff;
    @media (max-width: 670px) {
        width: 100%;
        height: 100%;
        color: white;
        padding-top: 140px;
        .links {
            font-size: 15px;
            a {
                display: block;
            }
        }
    }
    h2 {
        font-size: 60px;
        font-family: "Rock Salt", cursive;
        margin: 0;
    }
    p {
        font-size: 18px;
        font-family: 'Rock Salt', cursive;
        margin: 0;
    }
    input {
        ${props => !!props.err && `
                border: 1px solid red;
        `
        }
    }
    .forms {
        height: 25px;
        padding: 5px;
        font-size: 20px;
        margin: 15px 0 15px 0;
    }
    .submit {
        height: 35px;
        margin-bottom: 15px;
        border: none; 
        border-radius: 25px;  
        background: #fff;
        color: #000;
        font-size: 15px;
        font-family: 'Rock Salt', cursive;
        cursor: pointer;
    }
    .links {
        margin-bottom: 20px;
        a {
            text-decoration: none;
            color: grey;
            text-decoration: underline;
        }
    }
`

class Login extends Component {
    state = {
        email: '',
        password: '',
        err: false
    };

    componentWillMount(){
        if(ls.get('accessToken')){
            window.location.href = '/company/coursename';
        }
    }

    bind = (field, e) => {
        this.setState({
            [field]: e.target.value
        })
    };

    login = async (e) => {
        e.preventDefault();
        try {
            let response = await api.post('company/login', {
                email: this.state.email,
                password: this.state.password
            });
            ls.set('accessToken', response.data.token);
            this.setState({
                err: false
            });
        } catch(e) {
            this.setState({
                err: true
            });
        }
    };
   
    render() {
        return (
            <Background>
                <LoginForm err={this.state.err}>
                    <h2>Sign In</h2>
                    <form onSubmit={(e) => this.login(e)}>
                        <div>
                            <p>E-Mail:</p>
                            <input type="email" className="forms" onChange={(e) => {this.bind('email', e)}} value={this.state.email} required/>
                        </div>
                        <div>
                            <p>Password:</p>
                            <input type="password" className="forms" onChange={(e) => {this.bind('password', e)}} value={this.state.password} required/>
                        </div>
                        <div>
                            <input type="submit" className="submit" value="Sign in"/>
                        </div>
                    </form>
                    <p className="links">Don't have an account? <a href="/company/register">Sign Up Now!</a></p>
                </LoginForm>
            </Background>
        );
    }
}

export default Login;