import createServer from './app';
import config from './config/config';

async function start() {
    try {
        const app = await createServer(); // ⚡ on attend l’app async
        const server = app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`);
            console.log(`Server configuration`, config);
        });

        // Shutdown (SIGTERM/SIGINT) pour Kubernetes/Docker
        const shutdown = (signal: string) => {
            console.log(`\nReceived ${signal}, shutting down gracefully...`);
            server.close(err => {
                if (err) {
                    console.error("Error during shutdown:", err);
                    process.exit(1);
                }
                process.exit(0);
            });
        };
        process.on("SIGTERM", () => shutdown("SIGTERM"));
        process.on("SIGINT", () => shutdown("SIGINT"));
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
}

start();