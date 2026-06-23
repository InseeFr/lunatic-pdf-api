import type { LunaticComponentProps } from "../models/types";
import { ValueWithLabel } from "./ValueWithLabel";
import { Text } from "@react-pdf/renderer";
import { styles } from "./styles";

type Props = LunaticComponentProps<"Radio">;

export function Radio(definition: Props) {
  const { interpret, label, response } = definition;
  let displayValue;

  const value = interpret(response.name);

  if ("optionSource" in definition && definition.optionSource) {
    displayValue = value;
  } else if ("options" in definition && definition.options) {
    const selectedOption = definition.options.find((o) => o.value === value);
    displayValue = selectedOption  ? `${value} - ${interpret(selectedOption.label)}`  : "Aucune option sélectionnée";
  }

  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <Text style={styles.answer}>{displayValue}</Text>
    </ValueWithLabel>
  );
}
