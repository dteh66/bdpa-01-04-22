import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from "./contexts/User"
import Cookies from "js-cookie";
import axios from "axios";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Bookmarks from './components/Bookmarks'
import Navbar from './components/Navbar'

function App() {
    const [state, dispatch] = useContext(UserContext);
    // important stuff
    const setUser = async () => {
        const curToken = Cookies.get('token');
        const res = await axios.get(`http://localhost:3001/auth/get-username`,
            { data: { curToken } })
            .catch((e) => {
                console.log(e);
            })
            .then(res => res.data)
        dispatch({ type: "logged_in", username: res })
    }
    useEffect(() => {
        setUser()
    }, []);

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/register'>
                    <Register />
                </Route>
                <Route path='/pack'>{/* <Pack /> */}</Route>
                <Route path='/bookmarks'>
                    <Bookmarks />
                </Route>
                <Route path='/saved'>{/* <Saved /> */}</Route>
                <Route path='/recover-password'>{/* <Recovery /> */}</Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;