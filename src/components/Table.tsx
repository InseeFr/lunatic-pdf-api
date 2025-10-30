import type { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { ErrorBoundary } from "react-error-boundary";
import { LunaticComponent } from "./LunaticComponent";

import {
  Table as PDFTable,
  TR as PDFTr,
  TD as PDFTd,
} from "@ag-media/react-pdf-table";
import { styles } from "./styles";
import { renderContent } from "../utils/markdownParser";

type Props = LunaticComponentProps<"Table">;

export function Table({ interpret, label, body, header }: Props) {
  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <PDFTable style={styles.table}>
        {header && (
          <PDFTr>
            {header.map((col, x) => (
              <PDFTd key={x} style={styles.th}>
                {renderContent(interpret, col.label, styles.headerText)}
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
                  renderContent(interpret, col.label, styles.answer)
                )}
              </PDFTd>
            ))}
          </PDFTr>
        ))}
      </PDFTable>
    </ValueWithLabel>
  );
}