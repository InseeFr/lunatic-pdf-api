import type { LunaticComponentProps, VTLExpression } from "../types";
import { LunaticComponents } from "./LunaticComponent";
import { Text, View } from "@react-pdf/renderer";
import { forceInt } from "../utils/cast";
import { decorateInterpretIteration } from "../utils/vtl";
import { styles } from "./styles";

type Props = LunaticComponentProps<"Loop"> & { iterations?: VTLExpression } & {
  lines?: { min?: VTLExpression; max?: VTLExpression };
};

export function Loop({
  id,
  interpret,
  components,
  iterations: iterationsExpr,
  lines,
}: Props) {
  if (components.length === 0) {
    return null;
  }

  const getNbRows = () => {
    const iterationsValue = typeof iterationsExpr === 'object' && iterationsExpr !== null ? iterationsExpr.value : iterationsExpr ?? "1";
    const iterations = forceInt(
      interpret(iterationsExpr ?? "1"),
      `Cannot interpret ${iterationsValue} to get loop size ${id}`
    );

    const minValue = typeof lines?.min === 'object' && lines?.min !== null ? lines.min.value : lines?.min ?? "1";
    const min = forceInt(
      interpret(lines?.min ?? "1"),
      `Cannot interpret ${minValue} to get loop size ${id}`
    );

    return Math.max(min, iterations);
  };

  return (
    <>
      {Array.from({ length: getNbRows() }).map((_, k) => {
        const interpretAtIteration = decorateInterpretIteration(interpret, [k]);
        return (
          <View key={`${id}-${k}`} wrap>
            <Text style={styles.h3}>Iteration #{k + 1}</Text>
            <LunaticComponents
              components={components}
              interpret={interpretAtIteration}
            />
          </View >
        );
      })}
    </>
  );
}
