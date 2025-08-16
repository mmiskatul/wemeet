import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Only added .js extension (required for ES modules)

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ // Changed from 400 to 401 (more appropriate)
        message: "Unauthorized - No token provided" // Fixed typo and improved message
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Fixed: Changed from STREAM_API_KEY to JWT_SECRET_KEY
    
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found" // Fixed typo
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect middleware:", error);
    res.status(500).json({
      message: "Server error - Authentication failed" // Slightly more descriptive
    });
  }
};