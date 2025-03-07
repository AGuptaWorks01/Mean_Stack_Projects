const JWT = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(403).json("Access denied. invalid")
    try {
        const decoded = JWT.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(400).json({ message: err })
    }
}

