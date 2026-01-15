import express from 'express';
import { registerUser, login, logout, authMiddleware } from '../../controllers/auth/auth.controllers.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/check-auth',authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'User Authenticated',
        user
    });
});
export default router;