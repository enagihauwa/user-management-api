import db from '../database/db.js';

const getUsersController = () => {
    const userData = db.prepare('SELECT id, name, age, email, created_at FROM users').all();

    return userData;
}

const createUserController = (userData) => {
    const { name, age } = userData;
    const stmt = db.prepare('INSERT INTO users (name, age) VALUES (?,?)').run(name, age);
    const user = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(stmt.lastInsertRowid);

    return { status: 201, data: user };
}

const findUserByIdController = (id) => {
    const user = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(id);
    if (user) {
        return { status: 200, data: user };
    }
    else {
        return { status: 404, error: 'Bad request: user with ID ' + id + ' not found' };
    }
}

const deleteUserByIdController = (id) => {
    const user = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(id);
    if (user) {
        db.prepare('DELETE FROM users WHERE id = ?').run(id);
        return { status: 200, data: user };
    }
    else {
        return { status: 404, error: 'Bad request: user with ID ' + id + ' not found' };
    }
}

const updateUserByIdController = (id, userData) => {
    const user = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(id);
    if (user) {
        const userDataCombined = { ...user, ...userData };
        const { name, age } = userDataCombined;
        db.prepare('UPDATE users SET name = ?, age = ? WHERE id = ?').run(name, age, id);
        const updatedUser = db.prepare('SELECT id, name, age, email, created_at FROM users WHERE id = ?').get(id);
        return { status: 200, data: updatedUser };
    }
    else {
        return { status: 404, error: 'Bad request: user with ID ' + id + ' not found' };
    }
}

export {
    getUsersController,
    createUserController,
    findUserByIdController,
    deleteUserByIdController,
    updateUserByIdController
}