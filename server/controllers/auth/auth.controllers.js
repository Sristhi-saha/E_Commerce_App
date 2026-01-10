import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.models.js';

//Register
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();

        res.status(200).json({
            success: true,
            message: 'User Registered Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Some Error Occured'
        })
    }
}



//Login
// const login = async (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Some Error Occured'
//         })
//     }
// }

//Logout
// const logout = async (req, res) => {
//     try {
        
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Some Error Occured'
//         })
//     }
// }

export default {
    registerUser
}