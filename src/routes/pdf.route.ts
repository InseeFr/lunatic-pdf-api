import express from 'express';
import { generatePdf as generatePdfWithUri } from '../controllers/pdf-source-uri.controller';

const pdfRouter = express.Router();

/**
 * @swagger
 * /api/pdf/generate-from-source:
 *   post:
 *     tags:
 *       - Pdf generation
 *     summary: Generate a PDF from a source and provided data
 *     description: |
 *       This endpoint generates a PDF based on:
 *       - A **source** (the Lunatic questionnaire URL) provided as a query parameter. (ex URI from Registry-Api )
 *       - Data provided in the request body (JSON format).
 *
 *       The PDF is returned as a binary file with the header `Content-Disposition: attachment; filename=export.pdf`.
 *     parameters:
 *       - in: query
 *         name: source
 *         required: true
 *         description: URL of the Lunatic questionnaire (URI format)
 *         schema:
 *           type: string
 *           format: uri
 *     requestBody:
 *       required: true
 *       description: Data used to populate the PDF
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *             description: |
 *               The exact structure depends on your implementation, but should include:
 *               - `data` (object): Questionnaire data
 *               - `stateData` (object): State information
 *             properties:
 *               data:
 *                 type: object
 *                 description: Questionnaire data from Lunatic
 *               stateData:
 *                 type: object
 *                 properties:
 *                   state:
 *                     type: string
 *                     enum: [INIT, VALIDATED, COMPLETED]
 *                     description: Current status of the questionnaire
 *                   date:
 *                     type: number
 *                     description: Timestamp in milliseconds
 *                   currentPage:
 *                     type: string
 *                     description: Current page of the questionnaire
 *     responses:
 *       '200':
 *         description: Returns a PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       '400':
 *         description: Missing or invalid `source` parameter
 *       '500':
 *         description: Internal server error during PDF generation
 */
pdfRouter.post('/generate-from-source', generatePdfWithUri);

export default pdfRouter;
