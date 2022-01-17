const jsonWebToken = require('jsonwebtoken')
const tokenSignature = process.env.tokenSignature;
const { findUser, findFollowSuggestions } = require('../../services/userServices.js')
const Barks = require('../../models/Bark');
const Users = require('../../models/User');


const getFollowSuggestions = async (req, res) => {
    //console.log(123, req.headers.authorization.split(" "));
    try {
        const email = jsonWebToken.verify(req.headers.authorization.split(" ")[1], process.env.tokenSignature).email;
        //console.log(432, email);
        const userInfo = await findUser(email);
        const followSuggestions = await findFollowSuggestions(userInfo)
        //const username = userInfo.username
        //const fullname = userInfo.fullname
        res.status(200).json(followSuggestions);
    } catch (error) {
        res.status(401).send("token invalid")
    }
   
}

module.exports = getFollowSuggestions