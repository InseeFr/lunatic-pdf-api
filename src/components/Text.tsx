import { Text as PdfText } from "@react-pdf/renderer";
import { styles } from "./styles";
import { LunaticComponentProps } from "../types";

type Props = LunaticComponentProps<"Text">;

export function Text({ interpret, label }: Props) {
  return <PdfText style={styles.label}>{interpret(label)}</PdfText>;
}
