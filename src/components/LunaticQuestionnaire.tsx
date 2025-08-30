import { useMemo } from "react";
import {
  type LunaticData,
  type LunaticSource,
  LunaticVariablesStore,
} from "@inseefr/lunatic";
import { Document, Page } from "@react-pdf/renderer";
import { styles } from "./styles";
import { makeInterpret } from "../utils/vtl";
import { LunaticComponents } from "./LunaticComponent";

type Props = {
  source: LunaticSource;
  data: LunaticData;
};

// Create Document Component
export const LunaticQuestionnaire = ({ source, data }: Props) => {
  const store = useMemo(
    () => LunaticVariablesStore.makeFromSource(source, data),
    [source, data],
  );
  const interpret = useMemo(() => makeInterpret(store), [store]);
  return (
    <Document pageMode="useOutlines">
      <Page size="A4" style={styles.page}>
        <LunaticComponents
          components={source.components}
          interpret={interpret}
        />
      </Page>
    </Document>
  );
};
