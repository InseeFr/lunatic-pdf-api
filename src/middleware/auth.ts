import { expressjwt as jwt } from "express-jwt";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import { expressJwtSecret } from "jwks-rsa";
import { ErrorCode, handleError } from "../error/api";
import { logger } from "../logger";

async function getOpenidConfiguration() {
  try {
    const response = await fetch(
      `${config.oidcIssuer}/.well-known/openid-configuration`
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    logger.error(`Error retrieving OpenID configuration`);
    throw new Error("Error retrieving OpenID configuration");
  }
}

// Initialize JWT middleware
export async function initJwtMiddleware() {
  const openidConfig = await getOpenidConfiguration();

  return jwt({
    secret: expressJwtSecret({
      jwksUri: openidConfig.jwks_uri,
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
    }),
    algorithms: openidConfig.id_token_signing_alg_values_supported ?? ["RS256"],
    issuer: openidConfig.issuer,
    requestProperty: "auth",
  });
}

// Middleware for jwt error
export function jwtErrorHandler(
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "UnauthorizedError") {
    return handleError(
      res,
      ErrorCode.UNAUTHORIZED_ERROR,
      "Invalid or expired token",
      401
    );
  }
  return next(err);
}
