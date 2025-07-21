const jwt = require("jsonwebtoken")
const User = require("../models/User")

const JWT_SECRET = process.env.JWT_SECRET || "mySuperSecretKey"

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.create({ email, password })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" })
    res.status(201).json({ token })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" })
    res.json({ token })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
