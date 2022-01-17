// import Cookies from 'js-cookie';
// import axios from 'axios';
import { getUserInfo } from "../../services/userServices"
export const reducer = async (state, action) => {
    switch (action.type) {
        case "logged_out":
            return {
                ...state,
                loggedIn: false,
                username: ""
            }
        case "logged_in":
            return {
                ...state,
                loggedIn: true
            }
        case "getUser":
            //needs handling when token is expired.
            try {
                const userInfo = await getUserInfo()
                if (userInfo) {
                    const username = userInfo.data.username
                    const uid = userInfo.data._id
                    //may return nothing, if token expired
                    console.log("getUser reducer: ", state, userInfo, 54321); 
        
                    return {
                        ...state,
                        loggedIn: userInfo ? true : false,
                        username: username || "",
                        UID: uid,
                        getUserFetched: true
                    }
                }
            } catch (error) {
                console.log("Reducer: ", error)
                return
            }
        default:
            return state
    }
}


export const initialState = {
    username: "",
    loggedIn: false,
    UID: null,
    getUserFetched: false
}