import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./contexts/User"
import Cookies from "js-cookie";
import axios from "axios";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Bookmarks from './components/Bookmarks'
import Navbar from './components/Navbar'
import BarkCreate from './components/BarkCreate'
import Barkview from './components/Barkview'

function App() {
    const [state, dispatch] = useContext(UserContext);
    //a
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
    // if (Cookies.get('token')) {
    //     dispatch({ type: "getUser" })
    // }
    // if (!state.getUserFetched) {
    //     Cookies.remove('token')
    // }
    useEffect(() => {
        if (Cookies.get('token')) {
            dispatch({ type: "getUser" })
        }
        // if (!state.getUserFetched) {
        //     console.log("hi")
        //     Cookies.remove('token')
        // }
    }, []);

    // <button onClick={async () => await dispatch({ type: "getUser" })}>1</button>
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='barkcreate' element={<BarkCreate />} />
                <Route path='pack'>{/* <Pack /> */}</Route>
                <Route path='bookmarks' element={<Bookmarks />} />
                <Route path='saved'>{/* <Saved /> */}</Route>
                <Route path='recover-password'>{/* <Recovery /> */}</Route>
                <Route path='/' element={<Home />} />
                <Route path='barkview/:id' element={<Barkview />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;