// Helper layer to communicate with Node.js/Express API

export const API_BASE_URL = (() => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'https://10.221.76.170';
  
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // If accessing via localhost / 127.0.0.1, use local dev API
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:5001';
    }
    // If accessing via local network IP (e.g. 10.x.x.x or 192.168.x.x), dynamically use that IP but keep the port and protocol from the env URL
    if (/^[0-9.]+$/.test(hostname)) {
      try {
        const parsedUrl = new URL(envUrl);
        const port = parsedUrl.port || (parsedUrl.protocol === 'https:' ? '443' : '80');
        return `${parsedUrl.protocol}//${hostname}:${port}`;
      } catch (e) {
        // ignore
      }
    }
  } else {
    // Server-side environment
    // In local development mode, default to the local dev API
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:5001';
    }
  }
  return envUrl;
})();

// Map of Admin Sidebar Module Names to API Endpoint paths (contentType)
export const MODULE_TO_CONTENT_TYPE: Record<string, string> = {
  'Beranda': 'beranda-content',
  'Profil': 'profil-content',
  'Program Pendidikan': 'program-pendidikan-content',
  'Widyaiswara': 'widyaiswara-content',
  'Kelembagaan Internal': 'kelembagaan-internal-content',
  'Berita & Informasi Publik': 'berita-informasi-content',
  'Publikasi': 'publikasi-content',
  'Galeri & Unduhan': 'galeri-unduhan-content',
  'Kontak': 'kontak-content',
  'Sarana Prasarana': 'sarana-prasarana-content'
}

/**
 * Get JWT token from sessionStorage safely
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem('sespim_token')
}

/**
 * Standard fetch with auth header injected if present
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`
  const headers = new Headers(options.headers || {})

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  headers.set('Bypass-Tunnel-Reminder', 'true');

  const token = getAuthToken()
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return fetch(url, {
    ...options,
    headers
  })
}

/**
 * Fetch helper specifically for server components (no sessionStorage access)
 * We pass raw fetch url with revalidation controls
 */
export async function serverFetch(path: string, options: RequestInit = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 3000)
  const headers = new Headers(options.headers || {})
  headers.set('Bypass-Tunnel-Reminder', 'true');

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      next: { revalidate: 60, ...(options.next || {}) }
    })
    clearTimeout(timeoutId)
    return res
  } catch (err) {
    clearTimeout(timeoutId)
    throw err
  }
}

/**
 * Get full URL for media items. If it is a local upload path, prepend the backend API domain.
 */
export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  
  const path = url.startsWith('/') ? url : `/${url}`
  
  const isVercel = process.env.VERCEL === '1' || 
    (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
  const isApiLocalhost = API_BASE_URL.includes('localhost') || API_BASE_URL.includes('127.0.0.1')

  if (isVercel && isApiLocalhost) {
    return path
  }
  return `${API_BASE_URL}${path}`
}
