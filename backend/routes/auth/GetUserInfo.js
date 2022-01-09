const jsonWebToken = require('jsonwebtoken')
const tokenSignature = process.env.tokenSignature;
const { findUser } = require('../../services/userServices.js')

const getUserFromToken = async (req, res) => {
    //console.log(123, req.headers.authorization.split(" ")[1]);
    const email = jsonWebToken.verify(req.headers.authorization.split(" ")[1], process.env.tokenSignature).email;
    //console.log(432, email);
    const userInfo = await findUser(email);
    const username = userInfo.username
    const fullname = userInfo.fullname
    res.status(200).json({ username, fullname });
}

module.exports = getUserFromToken