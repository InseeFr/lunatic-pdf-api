import type { LunaticComponentProps, VTLExpression } from "../types";
import { LunaticComponents } from "./LunaticComponent";
import { Text, View } from "@react-pdf/renderer";
import { forceInt } from "../utils/number";
import { decorateInterpretIteration } from "../utils/vtl";
import { styles } from "./styles";
import { hasResponse } from "../utils/lunatic";

type Props = LunaticComponentProps<"Loop"> & { iterations?: VTLExpression };

export function Loop({
  id,
  label,
  interpret,
  components,
  iterations: iterationsExpr,
}: Props) {
  if (components.length === 0) {
    return null;
  }

  const getIterations = () => {
    // We have an iteration expression we can use to resolve the number of iteration
    if (iterationsExpr) {
      return forceInt(
        interpret(iterationsExpr),
        `Cannot interpret ${iterationsExpr} to get loop size ${label}`
      );
    }

    // Otherwise, look for the first variable inside the children
    for (const component of components) {
      if (hasResponse(component)) {
        // @ts-expect-error component.response is a known value
        const value = interpret(component.response);
        if (Array.isArray(value)) {
          return value.length;
        }
      }
    }
    return 0;
  };

  return (
    <>
      {Array.from({ length: getIterations() }).map((_, k) => {
        const interpretAtIteration = decorateInterpretIteration(interpret, [k]);
        return (
          <View key={`${id}-${k}`}>
            <Text style={styles.h3}>Iteration #{k + 1}</Text>
            <LunaticComponents
              components={components}
              interpret={interpretAtIteration}
            />
          </View>
        );
      })}
    </>
  );
}
