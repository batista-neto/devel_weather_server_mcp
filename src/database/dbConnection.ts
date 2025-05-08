import mongoose from "mongoose";

async function databaseConnection() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING || "");
        console.log("Database connection established");
        return mongoose.connection;
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

export default databaseConnection; 