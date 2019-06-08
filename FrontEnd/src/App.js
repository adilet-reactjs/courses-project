import React, { Component } from "react";
import Landing from "./Landing/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Courses from "./pages/Courses"
import ForUser from "./pages/ForUser"
import Cabinet from "./pages/Cabinet"
import Course from "./pages/Course"
import CourseName from "./pages/CourseName"

import { BrowserRouter as Router, Route } from 'react-router-dom'

export default class App extends Component {

    render() {
        return (
            <div id="root">
                <Router>
                    <Route path="/main" component={Landing}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/courses" component={Courses}/>
                    <Route path="/cabinet" component={Cabinet}/>
                    <Route path="/foruser" component={ForUser}/>
                    <Route path="/course/:id?" component={Course}/>
                    <Route path="/CourseName/:id?" component={CourseName}/>
                </Router>
            </div>
        );
    }
}