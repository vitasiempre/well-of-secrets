import pkg from "pg";
const { Pool } = pkg;

const isCloud = !!process.env.CLOUD_SQL_CONNECTION_NAME;

const pool = new Pool(
  isCloud
    ? {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
      }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
      }
);

export default pool;