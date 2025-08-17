import express from 'express'
// import getStreamToken from '../controllers/chat.controller';
import { protectRoute } from '../middleware/auth.midleware.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const router =express.Router();

router.get('/token',protectRoute ,getStreamToken)
export default router 