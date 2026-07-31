import { randomUUID } from "crypto";

const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };

// Ueber LOG_LEVEL steuerbar, Standard "info". Unbekannte Werte fallen auf info
// zurueck, damit ein Tippfehler in der Env nicht das komplette Log abschaltet.
const threshold = LEVELS[process.env.LOG_LEVEL] ?? LEVELS.info;

const timestamp = () => new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

function write(level, message, { error, reqId } = {}) {
  if (LEVELS[level] > threshold) return;

  // Fehler auf stderr, alles andere auf stdout - so kann der Log-Viewer die
  // beiden Stroeme unterscheiden.
  const stream = level === "error" ? process.stderr : process.stdout;

  let line = `${timestamp()} ${level.toUpperCase().padEnd(5)} ${message}`;

  // Ohne Fehler bleibt alles auf einer Zeile, sonst waere das Log doppelt so
  // lang. Nur der Stack bekommt eine eigene, eingerueckte Zeile.
  if (error) {
    const prefix = reqId ? `req-id=${reqId}  ` : "";
    line += `\n  ${prefix}${error.stack || String(error)}`;
  } else if (reqId) {
    line += `  req-id=${reqId}`;
  }

  stream.write(`${line}\n`);
}

export const logger = {
  error: (message, options) => write("error", message, options),
  warn: (message, options) => write("warn", message, options),
  info: (message, options) => write("info", message, options),
  debug: (message, options) => write("debug", message, options),
};

/*
 * Loggt jeden abgeschlossenen Request. API-Aufrufe immer, Auslieferung von
 * statischen Dateien und der SPA nur im Fehlerfall - sonst waeren die Logs von
 * Bildern und JS-Chunks zugemuellt.
 */
export function requestLogger(req, res, next) {
  req.id = randomUUID().slice(0, 6);
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const isApiRequest = req.originalUrl.startsWith("/api/");
    if (!isApiRequest && res.statusCode < 400) return;

    const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
    const level =
      res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";

    logger[level](
      `${req.method.padEnd(4)} ${req.originalUrl} ${res.statusCode} ${durationMs.toFixed(0)}ms`,
      { reqId: req.id }
    );
  });

  next();
}

/*
 * Letztes Netz fuer Fehler, die keine Route selbst abgefangen hat. Nach aussen
 * geht bewusst nur eine generische Meldung, Details bleiben im Log.
 */
export function errorHandler(err, req, res, next) {
  logger.error(`${req.method} ${req.originalUrl} - unhandled error`, {
    error: err,
    reqId: req.id,
  });

  if (res.headersSent) return next(err);
  res.status(500).json({ error: "Internal server error" });
}
