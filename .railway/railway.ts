import { defineRailway, github, postgres, preserve, project, service } from "railway/iac";

export default defineRailway(() => {
  const db = postgres("db");

  const repo = { branch: "main" };

  const api = service("api", {
    source: github("ahm-hossam/I-career", repo),
    build: "pnpm turbo run build --filter=api...",
    preDeploy: "pnpm --filter @i-career/database exec prisma migrate deploy",
    start: "pnpm --filter api start:prod",
    healthcheck: "/health",
    healthcheckTimeout: 100,
    env: {
      DATABASE_URL: db.env.DATABASE_URL,
      ALLOWED_ORIGINS: "https://i-career.onrender.com",
      NODE_ENV: "production",
      AUTH_JWT_SECRET: preserve(),
      INTERNAL_API_TOKEN: preserve(),
      CLOUDINARY_CLOUD_NAME: preserve(),
      CLOUDINARY_API_KEY: preserve(),
      CLOUDINARY_API_SECRET: preserve(),
      FB_PIXEL_ID: preserve(),
      FB_CONVERSIONS_ACCESS_TOKEN: preserve(),
    },
  });

  const dashboard = service("dashboard", {
    source: github("ahm-hossam/I-career", repo),
    build: "pnpm turbo run build --filter=dashboard...",
    start: "pnpm --filter dashboard start",
    env: {
      API_URL: preserve(),
      AUTH_JWT_SECRET: preserve(),
      INTERNAL_API_TOKEN: preserve(),
      NODE_ENV: "production",
    },
  });

  const web = service("web", {
    source: github("ahm-hossam/I-career", repo),
    build: "pnpm turbo run build --filter=web...",
    start: "pnpm --filter web start",
    env: {
      API_URL: preserve(),
      AUTH_JWT_SECRET: preserve(),
      INTERNAL_API_TOKEN: preserve(),
      NEXT_PUBLIC_FB_PIXEL_ID: preserve(),
      NODE_ENV: "production",
    },
  });

  return project("i-career", { resources: [db, api, dashboard, web] });
});
