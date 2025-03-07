require('dotenv').config()
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const User = require('../models/userModel')

const JWT_SECRET = process.env.JWT_SECURITY

exports.register = async (req, res) => {
    const { username, email, password, confirmpassword, role } = req.body

    if (!username || !email || !password || !confirmpassword) return res.status(400).json({ message: "All filed are required" })

    if (password !== confirmpassword) return res.status(400).json({ message: "Password do not match" })

    const existsUser = await User.findOne({ username })
    if (existsUser) return res.status(400).json({ message: 'Username Already Exists' })

    const hasPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username, email, password: hasPassword, confirmpassword: hasPassword, role: role || 'user',
    })

    try {
        await newUser.save()
        return res.status(201).json({ message: "User Register Successfully!" })
    } catch (error) {
        return res.status(500).json({ message: "Error while register user" })
    }
}


exports.login = async (req, res) => {
    const { email, username, password } = req.body;

    if (!email && !username) return res.status(400).json({ message: "Either email or username is required" });

    if (!password) return res.status(400).json({ message: "Password is required" });

    try {

        const user = await User.findOne({
            $or: [{ username: username }, { email: email }]
        })

        if (!user)
            return res.status(400).json({ message: "Invalid email or username" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Password" })

        if (!user) return res.status(400).json({ message: "Invalid email or username" });

        const token = JWT.sign({ username: user.username, userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2h' })
        return res.status(200).json({ message: "Login Successfully", token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error during login" })
    }
}