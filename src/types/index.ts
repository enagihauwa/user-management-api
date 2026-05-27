import  {JwtPayload} from 'jsonwebtoken';

interface User{
    id: number;
    age: number;
    email: string;
    name: string;
    created_at: string;
}

interface CreateUserInput{
    age: number;
    email: string;
    password: string;
    name: string;
}

interface LoginInput{
    email: string;
    password: string;
}

interface ControllerOutput {
    status: number;
    data?: User | User[] | null; 
    error?: string;
}

type UserPasswordIncluded = User & { password: string };


declare global{
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}
export { User, CreateUserInput, LoginInput, ControllerOutput, UserPasswordIncluded };