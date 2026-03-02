import type { LunaticComponentProps, VTLExpression } from "../models/types";
import { LunaticComponents } from "./LunaticComponent";
import { Text, View } from "@react-pdf/renderer";
import { forceBool, forceInt } from "../utils/cast";
import { decorateInterpretIteration } from "../utils/vtl";
import { styles } from "./styles";

type Props = LunaticComponentProps<"Loop"> & { iterations?: VTLExpression } & {
  item?: { description?: VTLExpression; disabled?: VTLExpression };
};
export function Roundabout({
  id,
  interpret,
  item,
  components,
  iterations: iterationsExpr,
}: Props) {
  const getNbRows = () => {
    const iterations = forceInt(
      interpret(iterationsExpr ?? "1"),
      `Cannot interpret ${iterationsExpr} to get roundabout size ${id}`
    );

    return iterations;
  };

  return (
    <>
      {Array.from({ length: getNbRows() }).map((_, k) => {
        const interpretAtIteration = decorateInterpretIteration(interpret, [k]);
        if (forceBool(interpretAtIteration(item?.disabled), "")) return;
        return (
          <View key={`${id}-${k}`}>
            <Text style={styles.h3}>
              {interpretAtIteration(item?.description)}
            </Text>
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
