import { styles } from "./styles";
import { LunaticComponentProps } from "../types";
import { renderContent } from "../utils/markdownParser";


type Props = LunaticComponentProps<"Text">;

export function Text({ interpret, label }: Props) {
  return (
    renderContent(interpret, label, styles.label)
  )
}