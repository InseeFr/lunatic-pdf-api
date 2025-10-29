import type { LunaticVariablesStore } from "@inseefr/lunatic";
import type { ReactNode } from "react";
import type { VTLExpression } from "../types";
import { logger } from "../logger";

export type Interpreter = ReturnType<typeof makeInterpret>;

/**
 * Remove infobulle content from text
 */
function removeInfobulle(text: string): string {
  return text.replace(/\[([^\]]+)\]\([.\s]*["'][^"']*["'][.\s]*\)/g, '$1');
}

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
        const result = store.run(expr, { iteration }) as ReactNode;
        return typeof result === "string" ? removeInfobulle(result) : result;
      }
      const result = store.run(expr.value, { iteration }) as ReactNode;
      return typeof result === "string" ? removeInfobulle(result) : result;
    } catch (error) {
      // Log the error for debugging purposes
      logger.error(`Error interpreting VTL expression: ${JSON.stringify(error, null, "\t")}`);
      // fallback: return expression as string with infobulle removed
      const fallbackText = typeof expr === "string" ? expr : expr?.value;
      return fallbackText && typeof fallbackText === "string" ? removeInfobulle(fallbackText) : fallbackText;
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

