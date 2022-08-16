import mongoose from "mongoose";
import { ENV } from "../config/config";


export async function connectDB() {
    try {
        console.log(ENV.DB_URL);
        mongoose.set('debug', true);
        await mongoose.connect(ENV.DB_URL, {});
        console.log("DataBase Ulandi...");

    } catch (e) {
        console.log("DataBase da Xatolik ", e)
    }
}