import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const baseMongooseOpts = {
    serverSelectionTimeoutMS: 10000,
}

export const connectMongoDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        if(!url) throw new Error("Falta Mongo Url en el .env");
        await mongoose.connect(url, baseMongooseOpts);
        console.log("Conectado a MongoDB de forma exitosa.")
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
}

export const connectMongoAtlasDB = async () => {
    try {
        const url = process.env.MONGO_ATLAS_URL;
        if(!url) throw new Error("Falta Mongo Atlas Url en el .env");
        await mongoose.connect(url, baseMongooseOpts);
        console.log("Conectado a Mongo Atlas de forma exitosa.!!")
    } catch (err) {
        console.error(err)
        process.exit(1);
    }
}

export const connectAuto = async () => {
    return connectMongoAtlasDB();
}