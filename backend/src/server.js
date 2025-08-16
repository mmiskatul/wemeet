import express from 'express';
import  'dotenv/config';
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'

const app = express();
const PORT =process.env.PORT ; 

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
    connectDB();
});