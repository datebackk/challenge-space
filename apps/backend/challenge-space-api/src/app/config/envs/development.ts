export const config = {
    db: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME,
        dropSchema: false,
        synchronize: true,
        logging: false,
        extra: {
            connectionLimit: 10,
        },
    },
    keycloack: {
        authServerUrl: 'http://localhost:8080/auth',
        realm: 'master',
        clientId: 'challenge-space-backend',
        secret: '21Q4Us6DET2lcReewnjNANlwH7iVUm6j',
    },
};
