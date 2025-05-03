import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // env: {
  //   PGHOST: process.env.PGHOST,
  //   PGPORT: process.env.PGPORT,
  //   PGUSER: process.env.PGUSER,
  //   PGPASSWORD: process.env.PGPASSWORD,
  //   PGDATABASE: process.env.PGDATABASE,
  // },
};

export default nextConfig;
