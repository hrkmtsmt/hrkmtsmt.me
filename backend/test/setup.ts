import { env, applyD1Migrations } from "cloudflare:test";
import { beforeAll, afterEach, inject } from "vitest";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@schema/index";

const db = drizzle(env.DB, { schema });

beforeAll(async () => {
  const migrations = inject("migrations");
  await applyD1Migrations(env.DB, migrations);
});

afterEach(async () => {
  await Promise.all(Object.values(schema).map((s) => db.delete(s)));
});
