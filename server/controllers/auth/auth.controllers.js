import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.models.js';

//Register
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const checkUser = await User.findOne({email})

        if(checkUser) {
            return res.status(400).json({
                success: false,
                message: 'User Already Exists'
            })
        }


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

        console.log(newUser)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



//Login
export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const checkUser = await User.findOne({email})

        if(!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        const isMatch = await bcrypt.compare(password, checkUser.password)

        if(!isMatch) {
            return res.json({
                success: false,
                message: "Invalid Password"
            })
        }

        console.log(isMatch)

        console.log("SECRET:", process.env.CLIENT_SECRET_KEY);


        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email
        }, process.env.CLIENT_SECRET_KEY, {expiresIn: '60m'}) 

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: "User Logged In Successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id
            }
        })
        console.log(token)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token').json({
            success: true,
            message: 'Logged Out Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Some Error Occured'
        })
    }
}


//auth middleware
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized Access'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
}
