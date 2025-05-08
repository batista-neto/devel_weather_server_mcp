import { User } from "../../types";

export interface UserModel {
    list(): Promise<User[]>
    register(user: User): Promise<User>
    update(user: User): Promise<User> 
    delete(userId: string): Promise<void>
    findUserByEmailAndPassword(email: string, password: string): Promise<User | null>
}