import type { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { Text } from "@react-pdf/renderer";
import { styles } from "./styles";

type Props = LunaticComponentProps<"CheckboxBoolean">;

export function CheckboxBoolean({ interpret, label, response }: Props) {
  return (
    <ValueWithLabel label={interpret(label)}>
      <Text style={styles.answer}>
        {interpret(response.name) ? "Oui" : "Non"}
      </Text>
    </ValueWithLabel>
  );
}
