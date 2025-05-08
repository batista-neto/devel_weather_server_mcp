import { UserController } from "../../interfaces/controllers/UserController.js";
import { UserModel } from "../../interfaces/models/UserModel.js";
import { Response, Request } from "express";

export class UserControllerImpl implements UserController {

    constructor(private userModel: UserModel) {
        console.log("UserControllerImpl constructor", userModel);
    }
    
    async listUsers(req: Request, res: Response): Promise<void> {
        try {
            const userList = await this.userModel.list();
            res.status(200).json(userList);
        } catch(error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async userLogin(req: Request, res: Response) {
        const email =  req.body.email;
        const password = req.body.password;
        try {
            const userFound = await this.userModel.findUserByEmailAndPassword(email, password);
            if(userFound){
                res.status(200).json({message: 'Usuario encontrado', user: userFound})
            } else {
                res.status(200).json({message: 'Usuario não encontrado'})
            }            
        } catch(erro: any) {
            res.status(500).json({ message: `${erro.message}`})
        }
    }

    async userRegister(req: Request, res: Response) {
        const newUser = req.body
        try {
            const userRegister = await this.userModel.register(newUser);
            res.status(200).json({message: "Usuario cadastrado com sucesso", user: userRegister})         
        } catch(erro: any) {
            res.status(500).json({ message: `${erro.message}`})
        }
    }

    async userUpdate(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.userModel.update({id, ...req.body});
            res.status(200).json({message: "Usuario atualizado com sucesso"});
        } catch(erro: any) {
            res.status(500).json({ message: `${erro.message}`});
        }
    }  

    async userDelete(req: Request, res: Response) {
        try {
            await this.userModel.delete(req.params.id)
            res.status(200).json({message: "Usuario deletado com sucesso"})
        } catch(erro: any) {
            res.status(500).json({ message: `${erro.message}`})
        }
    }   
}