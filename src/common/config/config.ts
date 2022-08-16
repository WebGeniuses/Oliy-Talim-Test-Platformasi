import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname,"../../../.env"),
});

export const ENV = {
    DB_URL: process.env.DB_URL || "mongodb://localhost:27018,localhost:27019,localhost:27020/school",
    HOST: process.env.HOST || "0.0.0.0",
    ADMIN_PORT: Number(process.env.ADMIN_PORT),
    TEACHER_PORT: Number(process.env.TEACHER_PORT),
    STUDENT_PORT: Number(process.env.STUDENT_PORT),
    TOKEN_KEY: process.env.TOKEN_KEY,
    TOKEN_TIME: {
        expiresIn: process.env.TOKEN_TIME,
    }



}