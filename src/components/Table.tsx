import type { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { ErrorBoundary } from "react-error-boundary";
import { LunaticComponent } from "./LunaticComponent";

import {
  Table as PDFTable,
  TR as PDFTr,
  TD as PDFTd,
} from "@ag-media/react-pdf-table";
import { Text } from "@react-pdf/renderer";
import { styles } from "./styles";
type Props = LunaticComponentProps<"Table">;

export function Table({ interpret, label, body, header }: Props) {
  return (
    <ValueWithLabel label={interpret(label)}>
      <PDFTable style={styles.table}>
        {header && (
          <PDFTr>
            {header.map((col, x) => (
              <PDFTd key={x} style={styles.th}>
                <Text style={styles.headerText}>
                  {interpret(col.label)}
                </Text>
              </PDFTd>
            ))}
          </PDFTr>
        )}
        {body.map((row, y) => (
          <PDFTr key={y}>
            {row.map((col, x) => (
              <PDFTd key={x} style={styles.td}>
                {"componentType" in col ? (
                  <ErrorBoundary
                    fallback={<article>Error {col.componentType}</article>}
                    key={x}
                  >
                    <LunaticComponent interpret={interpret} component={col} />
                  </ErrorBoundary>
                ) : (
                  <Text style={styles.answer}>{interpret(col.label)}</Text>
                )}
              </PDFTd>
            ))}
          </PDFTr>
        ))}
      </PDFTable>
    </ValueWithLabel>
  );
}
