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
import { MarkdownPDF } from "../utils/markdownParser";

type Props = LunaticComponentProps<"Table">;

function renderCellContent(interpretedLabel: any) {
  return typeof interpretedLabel === 'string' ? (
    <MarkdownPDF markdown={interpretedLabel} />
  ) : (
    <Text style={styles.answer}>{interpretedLabel}</Text>
  );
}

function renderHeaderContent(interpretedLabel: any) {
  return typeof interpretedLabel === 'string' ? (
    <MarkdownPDF style={styles.headerText} markdown={interpretedLabel} />
  ) : (
    <Text style={styles.headerText}>{interpretedLabel}</Text>
  );
}

export function Table({ interpret, label, body, header }: Props) {
  return (
    <ValueWithLabel label={interpret(label)}>
      <PDFTable style={styles.table}>
        {header && (
          <PDFTr>
            {header.map((col, x) => (
              <PDFTd key={x} style={styles.th}>
                {renderHeaderContent(interpret(col.label))}
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
                  renderCellContent(interpret(col.label))
                )}
              </PDFTd>
            ))}
          </PDFTr>
        ))}
      </PDFTable>
    </ValueWithLabel>
  );
}