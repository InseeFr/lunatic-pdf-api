import type { LunaticVariablesStore } from "@inseefr/lunatic";
import type { ReactNode } from "react";
import type { VTLExpression } from "../types";
import { logger } from "../logger";

export type Interpreter = ReturnType<typeof makeInterpret>;

/**
 * Generate an interpret function that will execute VTL expression
 */
export function makeInterpret(store: LunaticVariablesStore) {
  return (expr: VTLExpression | string | undefined, iteration?: number[]) => {
    try {
      if (!expr) {
        return null;
      }
      if (typeof expr === "string") {
        return store.run(expr, { iteration }) as ReactNode;
      }
      return store.run(expr.value, { iteration }) as ReactNode;
    } catch (error) {
      // Log the error for debugging purposes
      logger.error(`Error interpreting VTL expression: ${JSON.stringify(error, null, "\t")}`);
      // fallback: return expression as string
      return typeof expr === "string" ? expr : expr?.value
    }

  };
}

/**
 * Decorate the interpet function to automatically pass the iteration
 */
export function decorateInterpretIteration(
  interpreter: Interpreter,
  iteration: number[],
) {
  return (...args: Parameters<Interpreter>) => {
    return interpreter(args[0], args[1] ?? iteration);
  };
}
