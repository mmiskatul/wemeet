
import express from 'express'
import { protectRoute } from '../middleware/auth.midleware.js';
import { acceptFriendsRequest, getMyFriends, getRecommendedUsers, sendFriendsRequest } from '../controllers/user.controller.js';

const router =express.Router();

// apply auth middle to all routes
router.use(protectRoute)

router.get('/',getRecommendedUsers);
router.get('/friends',getMyFriends);
router.post('/friend-request/:id',sendFriendsRequest);
router.put('/friend-request/:id/accept',acceptFriendsRequest);

export default router