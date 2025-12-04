import { Text } from "@react-pdf/renderer";
import { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { styles } from "./styles";
import nomenclatures from "../preview/nomenclature.json"

type Props = LunaticComponentProps<"Suggester">;

export function Suggester({ interpret, label, response, storeName }: Props) {

  console.log('Suggester nomenclature', storeName);
  console.log('response:', response);
  console.log('Label:', label);

  const collectedValue = interpret(response.name);
  console.log('Collected value:', collectedValue);

  const nomenclature = nomenclatures.find(nom => nom.id === storeName);
  console.log('Using nomenclature:', nomenclature);

  const nomenclatureLabel = nomenclature?.items.find(item => item.id === collectedValue)?.label;
  console.log('Matched nomenclature label:', nomenclatureLabel);

  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <Text style={styles.answer}>{nomenclatureLabel ?? "__"} </Text>
    </ValueWithLabel>
  );
}
