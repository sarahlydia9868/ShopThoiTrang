"use strict";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../', '../.env') });

function parseConfig() {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        SMPT_HOST: process.env.SMPT_HOST,
        SMPT_PORT: process.env.SMPT_PORT,
        SMPT_SERVICE: process.env.SMPT_SERVICE,
        SMPT_MAIL: process.env.SMPT_MAIL,
        SMPT_PASSWORD: process.env.SMPT_PASSWORD
    };
}

function getConfig(): ProcessEnv {
    const config = parseConfig();
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return (config as unknown) as ProcessEnv;
}

const config: ProcessEnv = getConfig();

export default config;