// Helper layer to communicate with Node.js/Express API running on port 5001

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

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

  try {
    const res = await fetch(url, {
      ...options,
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
  if (url.startsWith('/uploads/')) {
    return `${API_BASE_URL}${url}`
  }
  return url
}
