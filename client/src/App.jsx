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
import BarkCreate from './components/BarkCreate'

function App() {
    const [state, dispatch] = useContext(UserContext);
    // important stuff master
    // const setUser = async () => {
    //     const curToken = Cookies.get('token');
    //     const userInfo = await axios.get(`http://localhost:3001/auth/get-user-info`, {
    //         headers: {
    //           'Authorization': 'Bearer ' + curToken
    //         }
    //       });
    //     console.log(321, userInfo)
    //     dispatch({ type: "logged_in", username: userInfo.data.username })
    // }

    useEffect(() => {
        if (Cookies.get('token')) {
            dispatch({ type: "getUser" })
        }
    }, []);

    // <button onClick={async () => await dispatch({ type: "getUser" })}>1</button>
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
                <Route path='/barkcreate'>
                    <BarkCreate />
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