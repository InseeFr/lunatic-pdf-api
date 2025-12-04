import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    appScheme: string,
    appHost: string,
    trustUriDomains: string[],
    oidcEnabled: boolean,
    oidcIssuer: string,
    isProd: boolean,
    nomenclatureSourceUri: string,
}

const config: Config = {
    port: Number(process.env.PORT) || 8080,
    appScheme: process.env.APPLICATION_SCHEME || "http",
    appHost: process.env.APPLICATION_HOST || "localhost",
    trustUriDomains: (process.env.TRUST_URI_DOMAINS || "localhost").split(","),
    oidcEnabled: process.env.OIDC_ENABLED === "true",
    oidcIssuer: process.env.OIDC_ISSUER || "",
    isProd: process.env.NODE_ENV === "production",
    nomenclatureSourceUri: process.env.NOMENCLATURE_SOURCE_URI || "",
};

export default config;