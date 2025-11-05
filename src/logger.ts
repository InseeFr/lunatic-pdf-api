import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

// Format personnalisé des logs
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info", // debug, info, warn, error
  format: combine(colorize(), timestamp(), logFormat),
  transports: [
    new transports.Console(), // output to std console
  ],
  exitOnError: false,
});
