import db from '../database/db.js';
import { User, CreateUserInput, ControllerOutput } from '../types/index.js';

const getUsersController = (): ControllerOutput => {
    const userData = db.prepare('SELECT id, name, age, email, created_at FROM users').all();

    return { status: 200, data: userData as User[] };
}
const createUserController = (userData: CreateUserInput): ControllerOutput => {
    const { name, age } = userData;
    const stmt = db.prepare('INSERT INTO users (name, age) VALUES (?,?)').run(name, age);
    const user = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(stmt.lastInsertRowid);

    return { status: 201, data: user as User };
}

const findUserByIdController = (id: number): ControllerOutput => {
    const user = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(id);
    if (user) {
        return { status: 200, data: user as User };
    }
    else {
        return { status: 404, error: 'Bad request: user with ID ' + id + ' not found' };
    }
}

const deleteUserByIdController = (id: number): ControllerOutput => {
    const user = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(id);
    if (user) {
        db.prepare('DELETE FROM users WHERE id = ?').run(id);
        return { status: 200, data: user as User };
    }
    else {
        return { status: 404, error: 'Bad request: user with ID ' + id + ' not found' };
    }
}

const updateUserByIdController = (id: number, userData: Partial<CreateUserInput>): ControllerOutput => {
    const user = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(id);
    if (user) {
        const userDataCombined = { ...user, ...userData };
        const { name, age } = userDataCombined;
        db.prepare('UPDATE users SET name = ?, age = ? WHERE id = ?').run(name, age, id);
        const updatedUser = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(id);
        return { status: 200, data: updatedUser as User };
    }
    else {
        return { status: 404, error: 'Bad request: user with ID ' + id + ' not found' };
    }
}


export { getUsersController, createUserController, findUserByIdController, deleteUserByIdController, updateUserByIdController, };