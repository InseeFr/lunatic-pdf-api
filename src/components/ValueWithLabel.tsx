import type { PropsWithChildren, ReactNode } from "react";
import { View } from "@react-pdf/renderer";
import { depth, styles } from "./styles";
import { renderContent } from "../utils/markdownParser";
import { VTLExpression } from "../types";

type Props = PropsWithChildren<{
  interpret: (expr: VTLExpression | string | undefined) => ReactNode;
  label: VTLExpression | undefined
}>;

export function ValueWithLabel({ interpret, label, children }: Props) {
  if (!label) {
    return children;
  }
  if (depth.current === 2) {
    return (
      <View style={styles.question1} wrap={false}>
        <View style={[styles.question1, styles.question]} wrap={false}>
          {renderContent(interpret, label, styles.label)}
          {children}
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.question, styles.question1]} wrap={true}>
      {renderContent(interpret, label, styles.label)}
      {children}
    </View>
  );
}
