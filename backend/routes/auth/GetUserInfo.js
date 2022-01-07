const jsonWebToken = require('jsonwebtoken')
const tokenSignature = process.env.tokenSignature;

const getUserToken = async (req, res) => {
    const email = req.user.email
    const token = createToken(email)
    const username = await findUser(email).username
    res.status(200).json({ token, email, username, role: req.role }) //role is admin/normal user?

}

const getUserFromToken = token => {
    return jsonWebToken.verify(token, process.env.tokenSignature);
}