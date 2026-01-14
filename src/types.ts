import type {
  LunaticComponentDefinition,
  LunaticData,
  LunaticSource,
} from "@inseefr/lunatic";
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

export interface PdfRequestFromBody extends Request {
  body: {
    source: LunaticSource;
    interrogation: {
      data: LunaticData;
    };
  };
}
