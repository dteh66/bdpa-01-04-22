import Cookies from 'js-cookie';
import axios from "axios";


export const getUserInfo = async () => {
    const curToken = Cookies.get('token');
    try {
        const userInfo = await axios.get(`http://localhost:3001/auth/get-user-info`, {
            headers: {
                'Authorization': 'Bearer ' + curToken
            }
            }).catch((error) => {
                console.log(error, "getUserInfo failed. Not logged in", 441133)
                console.log("hi4")
                Cookies.remove('token')
                return
            });
        return userInfo
    } catch (error) {
        console.log("Error in getUserInfo via token: ", error)
        //Cookies.remove('token')
        return
    }
}

export const getFollowSuggestions = async () => {
    const curToken = Cookies.get('token');
    try {
        const followSuggestions = await axios.get(`http://localhost:3001/auth/get-follow-suggestions`, {
            headers: {
                'Authorization': 'Bearer ' + curToken
            }
            }).catch((error) => {
                console.log(error, "getFollowSuggestions failed. Not logged in", 441133)
                console.log("hi5")
                Cookies.remove('token')
                return
            });
        return followSuggestions
    } catch (error) {
        console.log("Error in getUserInfo via token: ", error)
        //Cookies.remove('token')
        return
    }


}


