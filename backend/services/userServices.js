const userModel = require('../models/User');

const findUser = async email => {
    const user = await userModel.findOne({ email })
    if (user === null || user === undefined) return false
    console.log("Found user", user)
    return user
}