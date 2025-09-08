import { createRoot } from "react-dom/client";
import { PDFViewer } from "@react-pdf/renderer";
import source from "./source.json";
import interrogationData from "./data.json";

import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";

createRoot(document.getElementById("root")!).render(
  <PDFViewer>
    {/* @ts-ignore*/}
    <LunaticQuestionnaire source={source} data={interrogationData.data} />
  </PDFViewer>
);
