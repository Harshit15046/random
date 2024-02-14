// The Controller acts as an intermediary between the Model and the View. 
// It receives user input from the View, processes it, 
// and interacts with the Model to update the data accordingly



//const User = require('../Models/users');
const UserData = require('../Models/users');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password } = req.body;
        console.log('email', email)

        if (!name || !email || !password) {
            return res.status(400).json({ err: "Something is missing" })
        }

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        let result = await UserData.create(req.body);
        res.status(201).json({ success: true, msg: "user created", user: result });
    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        console.log(password);
        const user = await UserData.findAll({ where: { email } })
        
        if (user.length > 0) {
            const match = await bcrypt.compare(password, user[0].password);
            if (match) {
                res.status(200).json({ success: true, message: "User login Succesfully" })
            } else {
                return res.status(400).json({ success: false, message: 'Password is incorrect' })
            }
        } else {
            return res.status(404).json({ success: false, message: 'User does not exist' })
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = { signup, login };
