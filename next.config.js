/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['swagger-client', 'swagger-ui-react']
};

module.exports = nextConfig;
