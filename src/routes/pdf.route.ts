import express from 'express';
import { generatePdf } from '../controllers/pdf.controller';

const pdfRouter = express.Router();

/**
 * @swagger
 * /api/pdf/generate-from-source:
 *   post:
 *     tags:
 *       - Pdf generation
 *     summary: Generate PDF
 *     description: Generate PDF from source and data from body
 *     parameters:
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *           format: uri
 *         required: true
 *         description: the url of lunatic questionnaire
 *     requestBody:
 *       description: the interrogation data containing lunatic-data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                data:
 *                  type: object
 *                stateData:
 *                  type: object
 *                  properties:
 *                    state:
 *                      type: string
 *                      enum: [INIT, VALIDATED, COMPLETED]
 *                    date:
 *                      type: number
 *                    currentPage:
 *                      type: string
 *     responses:
 *       '200':
 *         description: Return pdf
 *       '500':
 *         description: Internal server error
 */
pdfRouter.post('/generate-from-source', generatePdf);

export default pdfRouter;
