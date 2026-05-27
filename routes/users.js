import express from 'express';
import { getUsersController, createUserController, findUserByIdController, deleteUserByIdController, updateUserByIdController, } from '../controllers/users.js';
import {verifyToken} from '../middlewares/auth.js';
const usersRouter = express.Router();

const getUsers = (req, res) => {
    const users = getUsersController();
    res.status(200).json(users);
}

const createUser = (req, res) => {
    const { status, data, error } = createUserController(req.body);
    if (error) {
        res.status(status).send(error);
    } else {
        res.status(status).json(data);
    }
}

const findUserById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Bad request: ID must be a number');
    }
    const { status, data, error } = findUserByIdController(id);
    if (error) {
        return res.status(status).send(error);
    }
    return res.status(status).json(data);

}

const deleteUserById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).send('Bad request: ID must be a number');
    }
    const { status, data, error } = deleteUserByIdController(id);
    if (error) {
        return res.status(status).send(error);
    }
    return res.status(status).json(data);
}

const updateUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    if (isNaN(id)) {
        return res.status(400).send('Bad request: ID must be a number');
    }
    if (!body) {
        return res.status(400).send('Bad request: Body is required');
    }

    if (typeof body.age !== 'number' && body.age !== undefined) {
        return res.status(400).send('Bad request: Age must be a number or defined');
    }

    const { status, data, error } = updateUserByIdController(id, body);
    if (error) return res.status(status).send(error);

    return res.status(status).json(data)
}


usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', findUserById);
usersRouter.delete('/:id', deleteUserById);
usersRouter.patch("/:id", updateUserById)
export default usersRouter;