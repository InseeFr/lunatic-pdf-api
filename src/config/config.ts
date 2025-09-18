import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    appScheme: string,
    appHost: string,
    trustUriDomains: string[],
    isProd: boolean
}

const config: Config = {
    port: Number(process.env.PORT) || 8080,
    appScheme: process.env.APPLICATION_SCHEME || "http",
    appHost: process.env.APPLICATION_HOST || "localhost",
    trustUriDomains: (process.env.TRUST_URI_DOMAINS || "localhost").split(","),
    isProd: process.env.NODE_ENV === "production"
};

export default config;