import withBundleAnalyzer from "@next/bundle-analyzer";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["next-international"],
  experimental: {
    swcPlugins: [["@swc-jotai/react-refresh", {}]],
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
};

export default bundleAnalyzer(config);
