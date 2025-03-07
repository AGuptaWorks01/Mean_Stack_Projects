const JWT = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECURITY

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Access Denied. No Token Provided.' });

    try {
        const decoded = JWT.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}
