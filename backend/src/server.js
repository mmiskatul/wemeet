import express from 'express';
import  'dotenv/config';
import authRoute from './routes/auth.route.js'

const app = express();
const PORT =process.env.PORT ; 

app.use("/api/auth",authRoute)

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});