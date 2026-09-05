import db from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, CreateUserInput, ControllerOutput, LoginInput,UserPasswordIncluded } from '../types/index.js';


const registerController = (body:CreateUserInput): ControllerOutput => {
    const { name, email, password, age } = body;
    const emailExists = db.prepare('SELECT id, name, email, age, created_at FROM users WHERE email = ?').get(email);
    if (emailExists) {
        return { status: 400, error: 'Bad request: email already exists' };
    }
    const passwordEncrypted =bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (name, email, password, age) VALUES(?,?,?,?)').run(name, email, passwordEncrypted, age);
    const user = db.prepare('SELECT id, name, email, age, created_at FROM users WHERE id = ?').get(stmt.lastInsertRowid);

    const newUser: User = user as User;
    return { status: 201, data: newUser };
}

const loginController = (body: LoginInput): ControllerOutput | { status: number; data?: string, error?: string } => {
    const { email, password } = body;
    const user = db.prepare('SELECT id, name, email, age, created_at, password FROM users WHERE email = ?').get(email) as UserPasswordIncluded;
    if (!user) {
        return { status: 404, error: 'Bad request: user with email ' + email + ' not found' };
    }
    const passwordEncrypted = bcrypt.compareSync(password, user.password);
    if (!passwordEncrypted) {
        return { status: 401, error: 'Unauthorized: incorrect password' };
    }
    const jwtsecretkey = process.env.JWT_SECRET_KEY;
    if (!jwtsecretkey) {
        return { status: 500, error: 'Internal server error: JWT secret key not configured' };
    }
    const newUser = jwt.sign({ id: user.id, name: user.name, email: user.email, age: user.age, created_at: user.created_at }, jwtsecretkey, { expiresIn: '1h' });
    return { status: 200, data: newUser as string };
}

export { registerController, loginController };