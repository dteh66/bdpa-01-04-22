const Barks = require('../../models/Bark');
const Tokens = require('../../models/Token');
const Users = require('../../models/User');

const GetBarks = async (req, res, next) => {
    try {
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
        
        if (isLoggedIn && user) {
            console.log("GetBarks: user logged in and identified.")
            const barks = await Barks.find({
                author: { $in: user.followedUsers },
                deleted: false,
            });
            const unfollowedBarks = await Barks.find({
                author: { $not: { $in: user.followedUsers } },
                deleted: false,
            });
            return res.status(200).send({ barks, unfollowedBarks });
        } else {
            console.log("GetBarks: no valid user signed in.")
            const barks = {}
            const unFollowedBarks = await Barks.find();
            //console.log(barks, 525)
            return res.status(200).send({ barks, unFollowedBarks });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send('Whoops, something went wrong!');
    }
}

module.exports = GetBarks;
