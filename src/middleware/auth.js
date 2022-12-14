const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        // Set a global variable here
        console.log(process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                status: "Error",
                data: user,
                message: "User not found"
            })
        }
        req.token = token
        req.user = user
        req.body.user = user
        next()
    } catch (err) {
        return res.status(400).json({
            statusCode: 400,
            status: "Error",
            data: null,
            message: err.message
        })
    }
}

module.exports = auth