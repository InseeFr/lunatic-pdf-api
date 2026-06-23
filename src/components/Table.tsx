import type { LunaticComponentProps } from "../models/types";
import { ValueWithLabel } from "./ValueWithLabel";
import { ErrorBoundary } from "react-error-boundary";
import { LunaticComponent } from "./LunaticComponent";

import {
  Table as PDFTable,
  TR as PDFTr,
  TD as PDFTd,
  TH as PDFTh
} from "@ag-media/react-pdf-table";
import { styles } from "./styles";
import { renderContent } from "../utils/markdownParser";
type Props = LunaticComponentProps<"Table">;

export function Table({ interpret, label, body, header }: Props) {

  const renderHeader = () => (
    header && (
      <PDFTh>
        {header.map((col, x) => (
          <PDFTd key={x} style={styles.th}>
            {renderContent(interpret, col.label, styles.headerText)}
          </PDFTd>
        ))}
      </PDFTh>
    )
  );
  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <PDFTable style={styles.table} wrap={true}>
        {renderHeader()}
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