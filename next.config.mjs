/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paybackend.getshield.xyz',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
