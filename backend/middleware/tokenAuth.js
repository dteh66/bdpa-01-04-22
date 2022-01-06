const Users = require('../models/User');
const Tokens = require('../models/Token');

const jsonWebToken = require('jsonwebtoken')
const { findUser } = require('../services/userServices')

const tokenSignature = process.env.tokenSignature;

const tokenAuth = async (req, res, next) => {
    const requestHeader = req.headers.authorization
    if (requestHeader === undefined || requestHeader === null) res.status(401).json({ error: "Unauthorized" })
    const [type, payload] = requestHeader.split(" ")
    if (type === "Bearer") {
        try {
            const verification = jsonWebToken.verify(payload, tokenSignature)
            console.log("Verification: ", verification)
            try {
                const user = await findUser(verification.email)
                req.email = verification.email
                next()
            } catch (error) { res.status(400).json({ error: "Bad Credentials" }) }
            return
        } catch (error) { }
    }
    res.status(401).json({ error: "Unauthorized Token" })
    return
}
module.exports = tokenAuth