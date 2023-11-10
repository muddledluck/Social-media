/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Necessary to import @passes/api-client and @passes/shared-constants
    // https://github.com/vercel/next.js/issues/9474#issuecomment-810212174
    externalDir: true,
  },
};

module.exports = nextConfig;
