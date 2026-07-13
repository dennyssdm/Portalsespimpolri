import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: rootDir
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5001'
      }
    ],
    dangerouslyAllowLocalIP: true
  }
}

export default nextConfig
