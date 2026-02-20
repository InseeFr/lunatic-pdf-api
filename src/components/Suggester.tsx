import { Text } from "@react-pdf/renderer";
import { LunaticComponentProps } from "../models/types";
import { ValueWithLabel } from "./ValueWithLabel";
import { styles } from "./styles";

type Props = LunaticComponentProps<"Suggester">;

export function Suggester({ interpret, label, response }: Props) {
  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <Text style={styles.answer}>{interpret(response.name) ?? "__"} </Text>
    </ValueWithLabel>
  );
}
