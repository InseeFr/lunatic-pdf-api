import type { PropsWithChildren, ReactNode } from "react";
import { Text, View } from "@react-pdf/renderer";
import { depth, styles } from "./styles";
import { MarkdownPDF } from "../utils/markdownParser";

type Props = PropsWithChildren<{
  label: ReactNode;
}>;
export function ValueWithLabel({ label, children }: Props) {
  if (!label) {
    return children;
  }
  const renderLabel = () => {
    if (typeof label === 'string') {
      return <MarkdownPDF style={styles.label} markdown={label} />;
    }
    return <Text style={styles.label}>{label}</Text>;
  };

  if (depth.current === 2) {
    return (
      <View style={styles.question1} wrap={false}>
        <View style={[styles.question1, styles.question]} wrap={false}>
          {renderLabel()}
          {children}
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.question, styles.question1]} wrap={false}>
      {renderLabel()}
      {children}
    </View>
  );
}
