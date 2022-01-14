import Cookies from 'js-cookie';
import axios from "axios";


export const getUserInfo = async () => {
    const curToken = Cookies.get('token');
    const userInfo = await axios.get(`http://localhost:3001/auth/get-user-info`, {
        headers: {
            'Authorization': 'Bearer ' + curToken
        }
    }).catch((error) => {
        console.log(error, "getUserInfo failed. Not logged in", 441133)
        return;
    });
    // console.log(321, userInfo)
    if (userInfo) {
        return userInfo
    }
    return "";
}


