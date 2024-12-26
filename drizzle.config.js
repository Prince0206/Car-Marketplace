/** @type { import("drizzle-kit").Config} */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://car-marketplace_owner:1l5HTFQROupE@ep-odd-fire-a5awt87c.us-east-2.aws.neon.tech/car-marketplace?sslmode=require",
  },
};
