// NodeJS.ProcessEnv

//Haciendo esto podemos tener todas las variables de entorno que existen y las que declaremos
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    // #Config database
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    HASH_SALT: number;
    JWT_SECRET: string;
  }
}
