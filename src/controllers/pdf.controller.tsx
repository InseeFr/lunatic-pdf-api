import { renderToStream } from "@react-pdf/renderer";
import { Request, Response } from "express";
import type { LunaticData, LunaticSource } from "@inseefr/lunatic";
import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";

export const generatePdf = async (req: Request, res: Response) => {
  const data = req.body as { data: LunaticData };
  let sourceUri = req.query.source as string;
  let source: LunaticSource;

  try {
    // TODO : prevent loading arbitrary code from the query (whitelist domains ?)
    console.log(`Reading source from URI ${sourceUri}`);
    const responseSource = await fetch(sourceUri);
    source = await responseSource.json();
  } catch (e) {
    console.error(e);
    return res.status(500).send(`Cannot fetch source ${sourceUri}`);
  }
  const pdfResult = await renderToStream(
    <LunaticQuestionnaire source={source} data={data.data} />
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  pdfResult.pipe(res);
};
