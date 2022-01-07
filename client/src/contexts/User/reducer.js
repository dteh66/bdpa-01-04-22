import Cookies from 'js-cookie';
// import axios from 'axios';
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

function getUser() {
    const curToken = Cookies.get('token');
}
export const initialState = {
    username: "Not Logged In"
}