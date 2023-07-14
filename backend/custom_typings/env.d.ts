declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AUTHENTICATION_TOKEN: string;
            PORT: string;
            HOST: string;
        }
    }
}
export {};
