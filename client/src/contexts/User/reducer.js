import Cookies from 'js-cookie';
import axios from 'axios';
export const reducer = (state, action) => {
    switch (action.type) {
        case "logged_out":
            return {
                ...state,
                username: "Not Logged In"
            }
        case "logged_in":
            return {
                ...state,
                username: action.username
            }
        default:
            return state
    }
}

async function getUser() {
    const curToken = Cookies.get('token');

    await axios.get(`http://localhost:3001/auth/get-username`, 
        { data: { curToken } });
}

export const initialState = {
    username: getUser() || "Not Logged In"
}