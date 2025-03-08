import mongoose from 'mongoose';
import config from './config';

export async function connectDataBase() {
    try {
        const connection = await mongoose.connect(config.MONGODB_URI);
        console.log(`🟢 Mongo db connected:`, connection.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
