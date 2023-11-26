/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

// @ts-expect-error - next-plugin-svgr is not typed
import withSvgr from "next-plugin-svgr";
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {};

export default withSvgr(config);
