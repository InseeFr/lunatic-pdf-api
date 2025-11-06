import type { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { View } from "@react-pdf/renderer";
import { renderContent } from "../utils/markdownParser";
import { styles } from "./styles";

type Props = LunaticComponentProps<"CheckboxGroup">;

export function CheckboxGroup({ interpret, label, responses }: Props) {
  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <View>
        {responses
          .filter((r) => interpret(r.response.name))
          .map((r, k) => (
            renderContent(interpret, r.label, styles.answer)
          ))}
      </View>
    </ValueWithLabel>
  );
}
