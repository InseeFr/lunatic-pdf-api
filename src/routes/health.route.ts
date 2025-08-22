import express from 'express';
import { healthcheck } from '../controllers/healthcheck.controller';

const router = express.Router();

/**
 * @swagger
 * /api/healthcheck:
 *   get:
 *     tags:
 *       - Healthcheck
 *     summary: Returning 200 if alive
 *     responses:
 *       '200':
 *         description: ok
 */
router.get('/', healthcheck);

export default router;
