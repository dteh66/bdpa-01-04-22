// import Cookies from 'js-cookie';
// import axios from 'axios';
import { getUserInfo } from "../../services/userServices"
export const reducer = async (state, action) => {
    switch (action.type) {
        case "logged_out":
            return {
                ...state,
                loggedIn: false
            }
        case "logged_in":
            return {
                ...state,
                loggedIn: true
            }
        case "getUser":
            //needs handling when token is expired.
            const username = await getUserInfo()
            //may return nothing, if token expired
            //console.log(state, username, 54321); 
            return {
                ...state,
                username: username || ""
            }
        default:
            return state
    }
}


export const initialState = {
    username: "",
    loggedIn: false
}