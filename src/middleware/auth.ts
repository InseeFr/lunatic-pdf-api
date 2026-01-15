import { expressjwt as jwt } from "express-jwt";
import { Request, Response, NextFunction } from "express";
import { expressJwtSecret } from "jwks-rsa";
import { ErrorCode, handleError } from "../error/api";
import { logger } from "../logger";
import config from "../config/config";

type OpenIDConfig = {
  jwks_uri: string;
  id_token_signing_alg_values_supported: any[];
  issuer: string;
};

async function getOpenidConfiguration(issuer: string): Promise<OpenIDConfig> {
  try {
    const response = await fetch(`${issuer}/.well-known/openid-configuration`);
    return (await response.json()) as OpenIDConfig;
  } catch (error) {
    console.error(error);
    logger.error(`Error retrieving OpenID configuration for ${issuer}`);
    throw new Error(`Error retrieving OpenID configuration for ${issuer}`);
  }
}

// create JWT middleware based on openidConfig
function createJwtMiddleware(openidConfig: OpenIDConfig) {
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

export async function initJwtMiddleware() {
  const internalConfig = await getOpenidConfiguration(config.oidcIssuer);

  const internalJwt = createJwtMiddleware(internalConfig).unless({
    path: config.publicUrls,
  });

  // Optional externalJwt middleware
  let externalJwt:
    | {
        (req: Request, res: Response, next: NextFunction): Promise<void>;
        unless: any;
      }
    | undefined;
  if (config.oidcIssuerExternal) {
    const externalConfig = await getOpenidConfiguration(
      config.oidcIssuerExternal
    );
    externalJwt = createJwtMiddleware(externalConfig).unless({
      path: config.publicUrls,
    });
  }

  return (req: Request, res: Response, next: NextFunction) => {
    internalJwt(req, res, (internalErr: any) => {
      // valid against internal issuer
      if (!internalErr) return next();
      // if no external issuer and internal validation error -> error
      if (!externalJwt) return next(internalErr);
      // no valid, check with external issuer
      externalJwt(req, res, (externalErr: any) => {
        if (!externalErr) return next();
        // no valid
        return next(externalErr);
      });
    });
  };
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
      401,
      err,
      err
    );
  }
  return next(err);
}
