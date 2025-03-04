require('dotenv').config()
const JWT = require('jsonwebtoken')
const User = require('../db/authModel')

const JWT_SECRET = process.env.JWT_SECRET

exports.register = async (req, res) => {
    const { username, password, email, fullname } = req.body

    console.log(username, password, email, fullname)

    if (!username || !password || !email || !fullname) return res.status(400).json({ message: "Invalid credentials or missing " })

    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "email already exist " })

    const newUser = await new User({ username, password, email, fullname })
    console.log(newUser)
    try {
        await newUser.save()
        return res.status(200).json({ message: "User registered Successfully" })
    } catch (error) {
        return res.status(500).json({ message: error })
    }

}
exports.login = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password)

    if (!username || !password) return res.status(400).json({ message: "Invalid credentials or missing " })

    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ message: "invalid Email" })

    const token = JWT.sign({ username: user.username, userId: user._id }, JWT_SECRET, { expiresIn: '1h' })
    return res.status(201).json({ message:"Login Successfully", token})
}
