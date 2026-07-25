import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = dirname(fileURLToPath(import.meta.url))

const remotePatterns = [
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
]

if (process.env.NEXT_PUBLIC_API_URL) {
  try {
    const parsed = new URL(process.env.NEXT_PUBLIC_API_URL)
    remotePatterns.push({
      protocol: parsed.protocol.replace(':', ''),
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? '443' : '80')
    })
  } catch (e) {
    // ignore invalid URL
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: rootDir
  },
  images: {
    remotePatterns,
    dangerouslyAllowLocalIP: true
  }
}

export default nextConfig
