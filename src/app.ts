import express, { Request, Response } from 'express';
import swaggerjsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import pdfRoute from './routes/pdf.route';
import healthRoute from './routes/health.route';
import { swaggerOptions } from './config/swagger';


const swaggerDocs = swaggerjsdoc(swaggerOptions)

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.redirect("/api-docs");
});
// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api/pdf', pdfRoute);
app.use('/api/healthcheck', healthRoute)
export default app;
