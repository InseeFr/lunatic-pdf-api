import { useMemo } from "react";
import {
  LunaticData,
  type LunaticSource,
  LunaticVariablesStore,
} from "@inseefr/lunatic";
import { Document, Page } from "@react-pdf/renderer";
import { styles } from "./styles";
import { makeInterpret } from "../utils/vtl";
import { LunaticComponents } from "./LunaticComponent";
import { InterrogationInfos } from "../models/types";
import TitlePage from "../ui/TitlePage";
import Footer from "../ui/Footer";

type Props = {
  source: LunaticSource;
  data: LunaticData;
  interrogationInfos: InterrogationInfos
};
// Create Document Component
export const LunaticQuestionnaire = ({ source, data, interrogationInfos }: Props) => {
  const store = useMemo(
    () => LunaticVariablesStore.makeFromSource(source, data),
    [source, data],
  );
  const surveyTitle = interrogationInfos.collectionInstrumentId;
  const usualSurveyUnitId = interrogationInfos.usualSurveyUnitId;
  const validationDate = interrogationInfos.validationDate;
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
