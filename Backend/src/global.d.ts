declare global {
    interface ProcessEnv {
      NODE_ENV: string;
      MONGODB_URI: string;
      PORT: string;
      JWT_SECRET: string;
    }
  }
  

  export {};