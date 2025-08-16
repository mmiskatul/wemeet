import express from 'express';
import { login, logout, onboarding, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.midleware.js';

const router =express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

router.post('/onboarding',protectRoute,onboarding)

export default router