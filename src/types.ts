import type { LunaticComponentDefinition } from "@inseefr/lunatic";
import { Request } from "express";
import type { ReactNode } from "react";

export type LunaticComponentProps<T extends string> = {
  interpret: (expr: VTLExpression | string | undefined) => ReactNode;
} & LunaticComponentDefinition<T>;

export type VTLExpression = {
  value: string;
  bindingDependencies?: string[];
  type: "VTL" | "VTL|MD" | "TXT";
};

export interface PdfRequestFromUri extends Request {
  query: {
    source?: string;
  };
  body: unknown;
}

// Interface pour les requêtes multipart/form-data
export interface PdfRequestFromFormData extends Request {
  files: {
    source: Express.Multer.File[];
    data: Express.Multer.File[];
  };
}
