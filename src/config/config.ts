import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  appScheme: string;
  appHost: string;
  trustUriDomains: string[];
  oidcEnabled: boolean;
  oidcIssuer: string;
  oidcIssuerExternal: string;
  publicUrls: (string | RegExp)[];
  jsonBodyLimit: string;
  isProd: boolean;
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  appScheme: process.env.APPLICATION_SCHEME || "http",
  appHost: process.env.APPLICATION_HOST || "localhost",
  trustUriDomains: (process.env.TRUST_URI_DOMAINS || "localhost").split(","),
  oidcEnabled: process.env.OIDC_ENABLED === "true",
  oidcIssuer: process.env.OIDC_ISSUER || "",
  publicUrls: [
    /^\/api\/healthcheck/, // exclude all routes start with /api/healthcheck
    /^\/api-docs/, // exclude swagger UI
    "/", // exclude root (redirect to swagger-ui)
  ],
  oidcIssuerExternal: process.env.OIDC_ISSUER_EXTERNAL || "",
  jsonBodyLimit: process.env.API_BODY_SIZE_LIMIT || "1mb",
  isProd: process.env.NODE_ENV === "production",
};

export default config;
