export interface UserController {
    listUsers(req, res): Promise<void>;
    userLogin(req, res): Promise<void>;
    userRegister(req, res): Promise<void>;
    userUpdate(req, res): Promise<void>;
    userDelete(req, res): Promise<void>;
}