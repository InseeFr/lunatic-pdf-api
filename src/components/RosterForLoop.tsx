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

  const renderHeader = () => (
    header && (
      <PDFTh fixed>
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
      <View wrap>
        <Table style={styles.table} >
          {renderHeader()}
          {Array.from({ length: iterations }).map((_, k) => {
            const interpretAtIteration = decorateInterpretIteration(interpret, [
              k,
            ]);
            return (
              <PDFTr key={k} wrap={false}>
                {components.map((component, j) => (
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
      </View>
    </ValueWithLabel>
  );
}
