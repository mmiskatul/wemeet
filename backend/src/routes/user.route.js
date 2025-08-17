
import express from 'express'
import { protectRoute } from '../middleware/auth.midleware.js';
import { getMyFriends, getRecommendedUsers } from '../controllers/user.controller.js';

const router =express.Router();

// apply auth middle to all routes
router.use(protectRoute)

router.get('/',getRecommendedUsers);
router.get('/friends',getMyFriends);

export default router