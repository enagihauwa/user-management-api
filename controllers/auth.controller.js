import db from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerController = ({ name, email, password, age }) => {
    const emailExists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (emailExists) {
        return { status: 400, error: 'Bad request: email already exists' };
    }
    const passwordEncrypted =bcrypt.hashSync(password, 10);
    const stmt = db.prepare('INSERT INTO users (name, email, password, age) VALUES(?,?,?,?)').run(name, email, passwordEncrypted, age);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(stmt.lastInsertRowid);
    const newUser = { id: user.id, name: user.name, email: user.email, age: user.age, created_at: user.created_at };
    return { status: 201, data: newUser };
}


const loginController = ({ email, password }) => {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
        return { status: 404, error: 'Bad request: user with email ' + email + ' not found' };
    }
    const passwordEncrypted = bcrypt.compareSync(password, user.password);
    if (!passwordEncrypted) {
        return { status: 401, error: 'Unauthorized: incorrect password' };
    }
    const newUser = jwt.sign({ id: user.id, name: user.name, email: user.email, age: user.age, created_at: user.created_at }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return { status: 200, data: newUser };
}

export {
    registerController,
    loginController
}