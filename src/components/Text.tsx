import { Text as PdfText } from "@react-pdf/renderer";
import { styles } from "./styles";
import { LunaticComponentProps } from "../types";
import { renderContent } from "../utils/markdownParser";
import { render } from "@testing-library/react";

type Props = LunaticComponentProps<"Text">;

export function Text({ interpret, label }: Props) {
  return (
    renderContent(interpret, label, styles.label)
  )
}