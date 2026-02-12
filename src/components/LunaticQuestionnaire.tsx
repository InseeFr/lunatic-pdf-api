import { useMemo } from "react";
import {
  type LunaticSource,
  LunaticVariablesStore,
} from "@inseefr/lunatic";
import { Document, Page } from "@react-pdf/renderer";
import { styles } from "./styles";
import { makeInterpret } from "../utils/vtl";
import { LunaticComponents } from "./LunaticComponent";
import { PdfRequestFromBody } from "../models/types";
import TitlePage from "../ui/TitlePage";
import Footer from "../ui/Footer";

type Props = {
  source: LunaticSource;
  data: PdfRequestFromBody;
};
// Create Document Component
export const LunaticQuestionnaire = ({ source, data }: Props) => {
  const store = useMemo(
    () => LunaticVariablesStore.makeFromSource(source, data.body.interrogation.data),
    [source, data],
  );
  const surveyTitle = data.body.interrogation.collectionInstrumentId;
  const usualSurveyUnitId = data.body.interrogation.usualSurveyUnitId;
  const validationDate = data.body.interrogation.validationDate;
  const interpret = useMemo(() => makeInterpret(store), [store]);
  return (
    <Document pageMode="useOutlines">
      <TitlePage surveyTitle={surveyTitle} usualSurveyUnitId={usualSurveyUnitId} validationDate={validationDate} />
      <Page size="A4" style={styles.page}>
        <LunaticComponents
          components={source.components}
          interpret={interpret}
        />
        <Footer surveyTitle={surveyTitle} usualSurveyUnitId={usualSurveyUnitId} />
      </Page>
    </Document>
  );
};
