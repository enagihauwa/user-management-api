import express, { Request, Response } from 'express';
import { getUsersController, createUserController, findUserByIdController, deleteUserByIdController, updateUserByIdController, } from '../controllers/userController.js';
const usersRouter = express.Router();


const getUsers = (req: Request, res: Response) => {
    const result = getUsersController();
    if (result.error) {
        return res.status(result.status).json({ error: result.error });
    }
    return res.status(result.status).json(result.data);
}


const createUser = (req: Request, res: Response) => {
    const { status, data, error } = createUserController(req.body);
    if (error) {
        res.status(status).send(error);
    } else {
        res.status(status).json(data);
    }
}

const findUserById = (req: Request, res: Response) => {
    const paramID = req.params.id as string;
    const id = parseInt(paramID);
    if (isNaN(id)) {
        return res.status(400).send('Bad request: ID must be a number');
    }
    const { status, data, error } = findUserByIdController(id);
    if (error) {
        return res.status(status).send(error);
    }
    return res.status(status).json(data);

}

const deleteUserById = (req: Request, res: Response) => {
    const paramID = req.params.id as string;
    const id = parseInt(paramID);
    if (isNaN(id)) {
        return res.status(400).send('Bad request: ID must be a number');
    }
    const { status, data, error } = deleteUserByIdController(id);
    if (error) {
        return res.status(status).send(error);
    }
    return res.status(status).json(data);
}

const updateUserById = (req: Request, res: Response) => {
    const paramID = req.params.id as string;
    const id = parseInt(paramID);
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