import type { NextConfig } from "next";

export default () => {
  const nextConfig: NextConfig = {
    output: "standalone",
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config
    },
  }

  return nextConfig
}
