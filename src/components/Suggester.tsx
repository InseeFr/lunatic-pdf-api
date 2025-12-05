import { Text } from "@react-pdf/renderer";
import { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { styles } from "./styles";
import { nomenclatureCache } from "../utils/nomenclatureCacheService";

type Props = LunaticComponentProps<"Suggester">;

export function Suggester({ interpret, label, response, storeName }: Props) {
  const collectedValue = interpret(response.name) as string;

  console.log(`Collect value ${collectedValue} for nomenclature ${storeName}`);

  // Get label from cache 
  // TODO: handle missing nomenclature (async fetch if not in cache) not currently handled if the fetching somehow fails
  const nomenclatureLabel = storeName
    ? nomenclatureCache.getLabelFromCache(storeName, collectedValue)
    : undefined;

  console.log(`Found label: ${nomenclatureLabel}`);

  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <Text style={styles.answer}>
        {nomenclatureLabel ?? collectedValue ?? "__"}
      </Text>
    </ValueWithLabel>
  );
}