import { renderToStream } from "@react-pdf/renderer";
import { Request, Response } from "express";
import { DummyPdf } from "../components/DummyPdf";

export const generatePdf = async (req: Request, res: Response) => {
  const source = req.query.source as string;
  const data = req.body;

  try {
    const responseSource = await fetch(source);
    const sourceData = await responseSource.json();
    console.log("data fetched from source");
    console.log(sourceData);
  } catch (e) {
    console.error(e);
    // return res.status(500).send("KO");
  }

  const pdfResult = await renderToStream(
    <DummyPdf source={source} data={data} />
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  pdfResult.pipe(res);
};
