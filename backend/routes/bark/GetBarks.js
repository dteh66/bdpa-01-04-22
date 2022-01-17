const Barks = require('../../models/Bark');
const Users = require('../../models/User');

const jsonWebToken = require('jsonwebtoken');
const { findUser } = require('../../services/userServices');

const GetBarks = async (req, res, next) => {
    try {
        const tokenSignature = process.env.tokenSignature;
        var isLoggedIn = false
        var user = null
        const requestHeader = req.headers.authorization

        if (requestHeader === undefined || requestHeader === null) res.status(401).json({ error: "Unauthorized" })
        const [type, payload] = requestHeader.split(" ")
        if (type === "Bearer") {
            try {
                const verification = jsonWebToken.verify(payload, tokenSignature)
                try {
                    user = await findUser(verification.email)
                    isLoggedIn = true
                } catch (error) { console.log("User not found") }
            } catch (error) { console.log("verification of token unsuccessful") }
        }
        //console.log("continuing...")
        
        if (isLoggedIn && user) {
            //console.log("GetBarks: user logged in and identified.")
            const barks = await Barks.find({
                author: { $in: user.followedUsers },
                deleted: false,
            }) || [];
            const unfollowedBarks = await Barks.find({
                author: { $not: { $in: user.followedUsers } },
                deleted: false,
            });
            return res.status(200).send({ barks, unfollowedBarks });
        } else {
            //console.log("GetBarks: no valid user signed in.")
            const barks = []
            const unfollowedBarks = await Barks.find().sort({ created: -1 }).limit(20);
            return res.status(200).send({ barks, unfollowedBarks });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = GetBarks;
