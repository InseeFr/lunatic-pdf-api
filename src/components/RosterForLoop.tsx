import type { LunaticComponentProps } from "../types";
import { ValueWithLabel } from "./ValueWithLabel";
import { decorateInterpretIteration } from "../utils/vtl";
import { LunaticComponent } from "./LunaticComponent";
import { Table, TR as PDFTr, TD as PDFTd } from "@ag-media/react-pdf-table";

type Props = LunaticComponentProps<"RosterForLoop">;

export function RosterForLoop({ interpret, label, components }: Props) {
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
  return (
    <ValueWithLabel interpret={interpret} label={label}>
      <Table>
        {Array.from({ length: iterations }).map((_, k) => {
          const interpretAtIteration = decorateInterpretIteration(interpret, [
            k,
          ]);
          return (
            <PDFTr key={k}>
              {components.map((component, j) => (
                <PDFTd key={j}>
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
    </ValueWithLabel>
  );
}
