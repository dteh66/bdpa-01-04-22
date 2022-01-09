const userModel = require('../models/User');

const findUser = async email => {
    //console.log("got into findUser function yay");
    const user = await userModel.findOne({ email })
    if (user === null || user === undefined) return false
    //console.log("Found user", user)
    return user
}
module.exports = { findUser };