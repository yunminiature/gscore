/** @type {import('next').NextConfig} */
const withSvgr = require('next-plugin-svgr');

module.exports = withSvgr({
  webpack(config, options) {
    return config;
  },
});