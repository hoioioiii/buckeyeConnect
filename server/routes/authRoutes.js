import express from 'express';
import cors from 'cors';
import { test, registerUser, loginUser, getProfile } from '../controllers/authController.js';

const router = express.Router();

// middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

export default router;