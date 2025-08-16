import express, { Router } from 'express';
import { login, logout, onboarding, signup } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.midleware.js';

const router =express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)

router.post('/onboarding',protectRoute,onboarding)
// check authenticate or not
router.get('/me',protectRoute,(req,res)=>{
    res.status(200).json({
        success:true,
        user:req.user
    })
})

export default router