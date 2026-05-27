import express from 'express';
import { registerController, loginController } from '../controllers/auth.controller.js';
import {verifyToken} from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
    const { status, data, error } = registerController(req.body);
    if (error) {
        return res.status(status).json({ error });
    }
    return res.status(status).json({ data });
});

authRouter.post('/login', (req, res) => {
    console.log('Login request received');
    console.log(req.body);
    const { status, data, error } = loginController(req.body);

    if (error) {
        return res.status(status).json({ error });
    }
    return res.status(status).json({ data });
});

export default authRouter;