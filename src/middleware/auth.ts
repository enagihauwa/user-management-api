import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    const token = req.headers.authorization.split(' ')[1];

    const jwtsecretkey = process.env.JWT_SECRET_KEY;
    if (!jwtsecretkey) {
        return res.status(500).json({ error: 'Internal server error: JWT secret key not configured' });
    }

    jwt.verify(token, jwtsecretkey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

export {
    verifyToken
}