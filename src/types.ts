import type { LunaticComponentDefinition } from "@inseefr/lunatic";
import type { ReactNode } from "react";

export type LunaticComponentProps<T extends string> = {
  interpret: (expr: VTLExpression | string | undefined) => ReactNode;
} & LunaticComponentDefinition<T>;

export type VTLExpression = {
  value: string;
  bindingDependencies?: string[];
  type: "VTL" | "VTL|MD" | "TXT";
};
