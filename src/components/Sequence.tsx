import type { LunaticComponentProps } from "../types";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<
  LunaticComponentProps<"Sequence" | "Subsequence">
>;

export function Sequence({ interpret, label, componentType, children }: Props) {
  const text = interpret(label);
  const textStyle = componentType === "Sequence" ? styles.h1 : styles.h2;

  return (
    // @ts-ignore
    <View bookmark={{ title: text, fit: true, expanded: false }}>
      <Text style={textStyle}>{text}</Text>
      <View style={styles.sequence}>{children}</View>
    </View>
  );
}
