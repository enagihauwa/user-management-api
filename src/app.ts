import express from 'express';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import dotenv from 'dotenv';
import {verifyToken} from './middleware/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
// Route handlers 
app.use('/users', verifyToken, usersRouter);
app.use('/auth', authRouter);
app.use('/', (req, res) => {
    res.status(200).send('Welcome to my API');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});