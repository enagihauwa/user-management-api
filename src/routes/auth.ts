import express, {Request, Response} from 'express';
import { registerController, loginController } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', (req: Request, res: Response) => {
    const body = req.body;
    const missingFields = [];
     if (!body) {
        return res.status(400).json({ error: 'Bad request: Body is required' });
    }
    if (!body.name) missingFields.push('name');
    if (!body.email) missingFields.push('email');
    if (!body.password) missingFields.push('password');
    if (!body.age) missingFields.push('age');

    if (missingFields.length > 0) {
        return res.status(400).json({ error: 'Bad request: Missing fields - ' + missingFields.join(', ') });
    }
   
    const { status, data, error } = registerController(req.body);
    if (error) {
        return res.status(status).json({ error });
    }
    return res.status(status).json({ data });
});

authRouter.post('/login', (req: Request, res: Response) => {
    console.log('Login request received');
    console.log(req.body);
    const { status, data, error } = loginController(req.body);

    if (error) {
        return res.status(status).json({ error });
    }
    return res.status(status).json({ data });
});

export default authRouter;