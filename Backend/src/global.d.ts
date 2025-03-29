declare global {
    interface ProcessEnv {
      NODE_ENV: string;
      MONGODB_URI: string;
      PORT: string;
      JWT_SECRET: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      SMPT_HOST: string;
      SMPT_PORT: string;
      SMPT_SERVICE: string;
      SMPT_MAIL: string;
      SMPT_PASSWORD: string;
    }
  }
  

  export {};