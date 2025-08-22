import app from './app';
import config from './config/config';

const server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

// Shutdown (SIGTERM/SIGINT) for kubernetes/docker
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
