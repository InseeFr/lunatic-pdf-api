import { createRoot } from "react-dom/client";
import { PDFViewer } from "@react-pdf/renderer";
import source from "./source.json";
import interrogationData from "./data.json";

import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";

const { data, ...interrogationInfos } = interrogationData;

createRoot(document.getElementById("root")!).render(
  <PDFViewer>
    <LunaticQuestionnaire source={source} data={data} interrogationInfos={interrogationInfos} />
  </PDFViewer>
);
