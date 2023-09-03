/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['swagger-client', 'swagger-ui-react'],
  output: 'standalone'
};

module.exports = nextConfig;
