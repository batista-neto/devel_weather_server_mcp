import { UserModel } from "../../interfaces";
import user from "../../schemas/User.mongo";
import { User as UserType} from "../../types";

export class UserModelImpl implements UserModel {
    
     async list(): Promise<UserType[]> {
        try {
            const userList = await user.find({})
            return userList.map((user) => ({
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                password: user.password,
                cel: user.cel
            }));
        } catch(erro) {
            throw new Error("Erro ao listar usuarios");
        }
    }

    async register(data: UserType): Promise<UserType> {
        try {
            const userRegister = await user.create(data);
            return {
                id: userRegister._id.toString(),
                name: userRegister.name,
                email: userRegister.email,
                password: userRegister.password,
                cel: userRegister.cel
            };
        } catch(erro) {
            throw new Error("Erro ao cadastrar usuario");
        }
    }

    async update(data: UserType): Promise<UserType> {
        try {
            await user.findByIdAndUpdate(data.id, data);
            return {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                cel: data.cel
            };
        } catch(erro) {
            throw new Error("Erro ao cadastrar usuario");
        }
    }  

    async delete(id: string): Promise<void> {
        try {
            await user.findByIdAndDelete(id)
        } catch(erro) {
            throw new Error("Erro ao deletar usuario");
        }
    }   

    async findUserByEmailAndPassword(email: string, password: string): Promise<UserType | null> {
        try {
            const userFound = await user.findOne({email, password})
            if(!userFound) {
                return null;
            }
            return {
                id: userFound._id.toString(),
                name: userFound.name,
                email: userFound.email,
                password: userFound.password,
                cel: userFound.cel
            };
        } catch(erro) {
            throw new Error("Erro ao encontrar usuario");
        }
    }
}