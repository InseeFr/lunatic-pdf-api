import { createRoot } from "react-dom/client";
import { PDFViewer } from "@react-pdf/renderer";
import { DummyPdf } from "../components/DummyPdf";

createRoot(document.getElementById("root")!).render(
  <>
    <PDFViewer>
      <DummyPdf source={""} data={{ data: {} }} />
    </PDFViewer>
  </>
);
