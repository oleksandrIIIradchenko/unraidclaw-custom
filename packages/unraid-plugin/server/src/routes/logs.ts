import type { FastifyInstance } from "fastify";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { Resource, Action } from "@unraidclaw/shared";
import type { GraphQLClient } from "../graphql-client.js";
import { requirePermission } from "../permissions.js";

const execFileAsync = promisify(execFile);

export function registerLogRoutes(app: FastifyInstance, _gql: GraphQLClient): void {
  app.get<{ Querystring: { lines?: string } }>("/api/logs/syslog", {
    preHandler: requirePermission(Resource.LOGS, Action.READ),
    handler: async (req, reply) => {
      const lines = Math.min(Math.max(parseInt(req.query.lines || "50", 10) || 50, 1), 1000);
      try {
        const { stdout } = await execFileAsync("tail", ["-n", String(lines), "/var/log/syslog"], { timeout: 5000 });
        const entries = stdout.trim().split("\n").filter(Boolean);
        return reply.send({ ok: true, data: { entries, total: entries.length } });
      } catch {
        return reply.status(500).send({ ok: false, error: { code: "SYSLOG_ERROR", message: "Failed to read syslog" } });
      }
    },
  });
}
