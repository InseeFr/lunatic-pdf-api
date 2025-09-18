import { Response } from "express";

interface ApiError {
    code: string; // Code interne pour identifier l'erreur
    message: string; // Message lisible par l'utilisateur ou le développeur
    details?: unknown; // Détails supplémentaires (optionnel)
}

export const errorResponse = (res: Response, code: string, message: string, status = 500, details?: unknown) => {
    return res.status(status).json({
        code,
        message,
        details,
    } as ApiError);
};
