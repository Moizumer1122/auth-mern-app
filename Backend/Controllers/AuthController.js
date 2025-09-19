// So, the controller is the part that:

// Takes the request from the route

// Processes the business logic (e.g., validate data, check credentials, do calculations)

// Interacts with models/database to get or save data

// Prepares the response to send back to the client

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401)
                .json({ message: 'Invalid credentials', success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401)
                .json({ message: 'Invalid credentials', success: false });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                token: token,
                user: { id: user._id, name: user.name, email: user.email }
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

module.exports = {
    signup,
    login
}