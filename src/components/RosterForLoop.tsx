import type { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { decorateInterpretIteration } from "../utils/vtl";
import { LunaticComponent } from "./LunaticComponent";
import { View } from "@react-pdf/renderer";
import { Table, TR as PDFTr, TD as PDFTd, TH as PDFTh } from "@ag-media/react-pdf-table";
import { styles } from "./styles";
import { renderContent } from "../utils/markdownParser";

type Props = LunaticComponentProps<"RosterForLoop">;

export function RosterForLoop({
  interpret,
  label,
  components,
  header,
}: Props) {
  // There is no subcomponents for this roster for loop
  if (components.length === 0) {
    return null;
  }
  const firstComponent = components.filter((c) => "response" in c)[0];
  if (!firstComponent) {
    return "Cannot find a component with a variable inside this RosterForLoop";
  }
  const firstComponentValue = interpret(firstComponent.response.name);
  if (!Array.isArray(firstComponentValue)) {
    return "Expected an array for the value of the first component";
  }
  const iterations = firstComponentValue.length;
  const columnCount = header?.length || components.length;
  const shouldSplit = columnCount > 5;
  const splitPoint = Math.ceil(components.length / 2);

  const renderHeader = (cols: typeof components, startIndex: number) => (
    header && (
      <PDFTh fixed wrap={false}>
        {cols.map((_, x) => (
          <PDFTd key={x} style={styles.th}>
            {renderContent(interpret, header[startIndex + x]?.label || "", styles.headerText)}
          </PDFTd>
        ))}
      </PDFTh>
    )
  );

  const renderTable = (cols: typeof components, startIndex: number) => (
    <Table style={styles.table} >
      {renderHeader(cols, startIndex)}
      {Array.from({ length: iterations }).map((_, k) => {
        const interpretAtIteration = decorateInterpretIteration(interpret, [k]);
        return (
          <PDFTr key={k} wrap={false}>
            {cols.map((component, j) => (
              <PDFTd key={j} style={styles.td}>
                <LunaticComponent
                  component={component}
                  interpret={interpretAtIteration}
                />
              </PDFTd>
            ))}
          </PDFTr>
        );
      })}
    </Table>
  );

  if (shouldSplit) {
    const firstHalf = components.slice(0, splitPoint);
    const secondHalf = components.slice(splitPoint);
    console.log({ firstHalf, secondHalf });
    return (
      <ValueWithLabel interpret={interpret} label={label}>
        <View wrap>
          {renderTable(firstHalf, 0)}
        </View>
        <View wrap>
          {renderTable(secondHalf, splitPoint)}
        </View>
      </ValueWithLabel>
    );
  }

  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <View wrap>
        {renderTable(components, 0)}
      </View>
    </ValueWithLabel>
  );
}
