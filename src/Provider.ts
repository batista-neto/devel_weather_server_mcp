import { UserControllerImpl } from "./impl/controllers/UserControllerImpl.js"
import { UserModelImpl } from "./impl/models/UserModelImpl.js"
import databaseConnection from "./database/dbConnection.js"

let userController: UserControllerImpl

export const initializeProvider = async () => {
    try {
        await databaseConnection()
        const userModel = new UserModelImpl()
        userController = new UserControllerImpl(userModel)
        return userController
    } catch (error) {
        console.error("Error initializing provider:", error)
        throw error
    }
}

export const getUserController = () => {
    if (!userController) {
        throw new Error("Provider not initialized")
    }
    return userController
}