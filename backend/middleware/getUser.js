const Tokens = require('../models/Token');

const GetUsernameViaToken = async (req, res, next) => {
    try {
        const token = req.data
        const result = await Tokens.find({ 'token': token }).
            limit(10). //aggregation, just incase DeleteToken isn't implemented properly
            sort('-created').
            select('user');
        //.create, .find, and more functions can be found on https://mongoosejs.com/docs/queries.html

        return result;
        next()
    } catch (e) {
        const err = new Error("You're missing something")
        next(e) //express knows to stop anything afterward, just sends error back
    }
}

module.exports = GetUsernameViaToken

