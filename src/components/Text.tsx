import { Text as PdfText } from "@react-pdf/renderer";
import { styles } from "./styles";
import { LunaticComponentProps } from "../types";
import { MarkdownPDF } from "../utils/markdownParser";

type Props = LunaticComponentProps<"Text">;

export function Text({ interpret, label }: Props) {
  const interpretedLabel = interpret(label);

  if (typeof interpretedLabel === 'string') {
    return <MarkdownPDF style={styles.label} markdown={interpretedLabel} />;
  }

  // Fallback to the previous implementation
  return <PdfText style={styles.label}>{interpretedLabel}</PdfText>;
}