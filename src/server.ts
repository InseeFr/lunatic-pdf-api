import createServer from './app';
import config from './config/config';
import { logger } from './logger';

async function start() {
    try {
        const app = await createServer();
        const server = app.listen(config.port, () => {
            logger.info(`Server is running on port ${config.port}`);
            logger.info(`Server configuration ${JSON.stringify(config, null, '\t')}`);
        });

        // Shutdown (SIGTERM/SIGINT) pour Kubernetes/Docker
        const shutdown = (signal: string) => {
            logger.info(`Received ${signal}, shutting down gracefully...`);
            server.close(err => {
                if (err) {
                    console.error(err);
                    logger.error(`Error during shutdown`);
                    process.exit(1);
                }
                process.exit(0);
            });
        };
        process.on("SIGTERM", () => shutdown("SIGTERM"));
        process.on("SIGINT", () => shutdown("SIGINT"));
    } catch (err) {
        console.error(err);
        logger.error(`Failed to start server`);
        process.exit(1);
    }
}

start();