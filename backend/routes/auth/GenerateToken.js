// const { sha512 } = require('crypto-hash');
// const { v4: uuidv4 } = require('uuid');
//const Tokens = require('../../models/Token');
/*
async function GenerateToken(req, res, next) {
    console.log("initiating token generation...")
    try {
        const token = await sha512(`${uuidv4()}${req.username}`);
        const user = req.user;
        const remember = req.body.remember;
        const expires = remember ? null : Date.now() + 3600000;

        // Delete previous/timed-out tokens
        await Tokens.deleteMany({ login: user.id });

        const result = await Tokens.create({
            user: user.id,
            token,
            expires,
        });
        return res.send({
            token: result.token,
            expires: result.expires,
        });
    } catch (e) {
        console.log(e);

        return res.status(500).send('Whoops, something went wrong.');
    }
}

module.exports = GenerateToken;
*/

// const express = require('express')
const jsonWebToken = require('jsonwebtoken')
const tokenSignature = process.env.tokenSignature;

const { findUser } = require('../../services/userServices.js')

const createToken = email => {
    const token = jsonWebToken.sign({ email }, tokenSignature, { expiresIn: "2h" })
    return token
}

const getUserToken = async (req, res) => {
    console.log("getting user info from token...")
    const email = req.user.email
    const token = createToken(email)
    const username = await findUser(email).username
    res.status(200).json({ token, email, username, role: req.role }) //role is admin/normal user?

}

module.exports = getUserToken

