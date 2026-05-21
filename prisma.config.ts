// prisma.config.ts があると CLI は .env を自動読み込みしない。
// 接続 URL は schema.prisma の env("DATABASE_URL") + プロジェクト直下の .env / .env.local
import { config } from "dotenv";
import { defineConfig } from "prisma/config";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

config({ path: path.join(rootDir, ".env") });
config({ path: path.join(rootDir, ".env.local"), override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
});
