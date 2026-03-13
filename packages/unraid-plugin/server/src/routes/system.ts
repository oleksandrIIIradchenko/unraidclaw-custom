import type { FastifyInstance } from "fastify";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { Resource, Action } from "@unraidclaw/shared";
import type { GraphQLClient } from "../graphql-client.js";
import { requirePermission } from "../permissions.js";

const execFileAsync = promisify(execFile);

const INFO_QUERY = `query {
  info {
    os {
      platform
      hostname
      uptime
    }
    cpu {
      model
      cores
      threads
    }
    memory {
      __typename
    }
  }
}`;

const SERVICES_QUERY = `query {
  services {
    name
    id
    online
  }
}`;

export function registerSystemRoutes(app: FastifyInstance, gql: GraphQLClient): void {
  // System info
  app.get("/api/system/info", {
    preHandler: requirePermission(Resource.INFO, Action.READ),
    handler: async (_req, reply) => {
      const data = await gql.query<{ info: unknown }>(INFO_QUERY);
      return reply.send({ ok: true, data: data.info });
    },
  });

  // System metrics (same as info — Unraid 7 doesn't have separate metrics query)
  app.get("/api/system/metrics", {
    preHandler: requirePermission(Resource.INFO, Action.READ),
    handler: async (_req, reply) => {
      const data = await gql.query<{ info: unknown }>(INFO_QUERY);
      return reply.send({ ok: true, data: data.info });
    },
  });

  // List services
  app.get("/api/system/services", {
    preHandler: requirePermission(Resource.SERVICES, Action.READ),
    handler: async (_req, reply) => {
      const data = await gql.query<{ services: unknown[] }>(SERVICES_QUERY);
      return reply.send({ ok: true, data: data.services });
    },
  });

  // Reboot
  app.post("/api/system/reboot", {
    preHandler: requirePermission(Resource.OS, Action.UPDATE),
    handler: async (_req, reply) => {
      try {
        reply.send({ ok: true, data: { message: "Reboot initiated" } });
        execFileAsync("nohup", ["/sbin/reboot"]).catch(() => {});
      } catch {
        return reply.status(500).send({ ok: false, error: { code: "REBOOT_ERROR", message: "Failed to initiate reboot" } });
      }
    },
  });

  // Shutdown
  app.post("/api/system/shutdown", {
    preHandler: requirePermission(Resource.OS, Action.UPDATE),
    handler: async (_req, reply) => {
      try {
        reply.send({ ok: true, data: { message: "Shutdown initiated" } });
        execFileAsync("nohup", ["/sbin/poweroff"]).catch(() => {});
      } catch {
        return reply.status(500).send({ ok: false, error: { code: "SHUTDOWN_ERROR", message: "Failed to initiate shutdown" } });
      }
    },
  });
}
