import { renderToStream } from "@react-pdf/renderer";
import { Request, Response } from "express";
import { DummyPdf } from "../components/DummyPdf";

export const generatePdf = async (req: Request, res: Response) => {
  const source = req.query.source as string;
  const data = req.body;

  fetch(source)
    .then((res) => res.json())
    .then((data) => {
      console.log("data fetched");
      console.log(data);
    });

  const pdfResult = await renderToStream(
    <DummyPdf source={source} data={data} />
  );

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=export.pdf`);
  pdfResult.pipe(res);
};
