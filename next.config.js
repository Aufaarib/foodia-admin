/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ["api.foodia-dev.nuncorp.id"],
  },
  devIndicators: {
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/ui-components/detonator",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ui-components/detonator",
        statusCode: 301,
      },
    ];
  },
};
