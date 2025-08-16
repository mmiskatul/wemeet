import express from 'express';
import  'dotenv/config';

const app = express();
const PORT =process.env.PORT ; 

app.get('/api/auth/signup', (req, res) => {
    res.send('signup Routes');
});
app.get('/api/auth/login', (req, res) => {
    res.send('login Routes');
});
app.get('/api/auth/logout', (req, res) => {
    res.send('logout Routes');
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});