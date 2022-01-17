const Users = require('../models/User');
const Tokens = require('../models/Token');

const jsonWebToken = require('jsonwebtoken')
const { findUser } = require('../services/userServices')

const tokenSignature = process.env.tokenSignature;

const tokenAuth = async (req, res, next) => {
    const requestHeader = req.headers.authorization
    //console.log("requestHeader: " , requestHeader);
    if (requestHeader === undefined || requestHeader === null) res.status(401).json({ error: "request header missing!" })
    const [type, payload] = requestHeader.split(" ")
    //console.log("tokenAuth: Type and payload: ", type, payload)
    if (type === "Bearer") {
        //console.log("is bearer type :)")
        try {
            //console.log(12322, payload, tokenSignature)
            const verification = jsonWebToken.verify(payload, tokenSignature)
            //console.log("tokenAuth: Verification: ", verification)
            try {
                const user = await findUser(verification.email)
                req.email = verification.email
                //console.log("tokenAuth: user was found: ", user)
                next()
            } catch (error) { res.status(400).json({ error: "Bad Credentials" }) }
            return
        } catch (error) { 
            console.log("tokenAuth: ", error, "Error. Token may have expired.")
        }
    }
    res.status(401).json({ error: "Unauthorized Token" })
    return
}
module.exports = tokenAuth