import User from '../models/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js'

// just to test if the server is working and accessible from the client
export const test = (req, res) => {
    res.json('test is working')
}

// Register endpoint
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check if name was entered
        if (!name) {
            return res.json({
                error: 'Name is required'
            })
        }
        // Check password
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        }
        // Check email
        const exists = await User.findOne({email});
        if (exists) {
            return res.json({
                error: 'Email already exists'
            })
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);
        // Create a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.json({
            message: 'User created successfully',
            user
        })

    } catch (error) {
        console.log('Error on registerUser:', error)
    }
}

// Login endpoint
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        // Check if email exists
        const user = await User.findOne({email});
        if (!user) {
            return res.json({
                error: 'Email does not exist'
            })
        }
        // Check password
        const passwordMatches = await comparePassword(password, user.password)
        if (passwordMatches) {
            return res.json("Password is correct")
        }
        if (!passwordMatches) {
            return res.json({
                error: 'Password is incorrect'
            })
        }
    } catch (error) {
        console.log('Error on loginUser:', error)
    }
}