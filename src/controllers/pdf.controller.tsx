import { renderToStream } from "@react-pdf/renderer";
import { Request, Response } from "express";
import type { LunaticData, LunaticSource } from "@inseefr/lunatic";
import { LunaticQuestionnaire } from "../components/LunaticQuestionnaire";

export const generatePdf = async (req: Request, res: Response) => {
  const data = req.body as { data: LunaticData };
  let source: LunaticSource;

  try {
    // TODO : prevent loading arbitrary code from the query (whitelist domains ?)
    const responseSource = await fetch(req.query.source as string);
    source = await responseSource.json();
    console.log("data fetched from source");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Cannot fetch source");
  }
  const pdfResult = await renderToStream(
    <LunaticQuestionnaire source={source} data={data.data} />,
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  pdfResult.pipe(res);
};
