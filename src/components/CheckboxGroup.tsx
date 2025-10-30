import type { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

type Props = LunaticComponentProps<"CheckboxGroup">;

export function CheckboxGroup({ interpret, label, responses }: Props) {
  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <View>
        {responses
          .filter((r) => interpret(r.response.name))
          .map((r, k) => (
            <Text style={styles.answer} key={r.id}>
              - {interpret(r.label)}
            </Text>
          ))}
      </View>
    </ValueWithLabel>
  );
}
