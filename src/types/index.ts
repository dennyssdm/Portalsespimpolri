export type NavItem = {
  label: string
  href: string
  description?: string
  children?: NavItem[]
}

export type SocialLink = {
  label: string
  href: string
  platform: 'instagram' | 'facebook' | 'x' | 'threads' | 'youtube'
}

export type PageContent = {
  title: string
  eyebrow: string
  description: string
  heroImage?: string
  heroImageAlt?: string
  media?: {
    src: string
    alt: string
    caption?: string
  }
  externalLink?: {
    label: string
    href: string
    description?: string
  }
  chatbot?: {
    name: string
    url: string
  }
  alamatResmi?: string
  noKontakResmi?: string
  emailResmi?: string
  resources?: {
    title: string
    description: string
    fileName: string
    href: string
    format: string
    category?: string
  }[]
  officials?: {
    name?: string
    rank?: string
    position: string
    photoSrc?: string
    photoAlt?: string
    group?: string
  }[]
  facilities?: {
    title: string
    description: string
    photoSrc?: string
    group?: string
  }[]
  sections: {
    title: string
    body: string
    items?: string[]
  }[]
  plagiarismSources?: {
    domain: string
    percentage: number
    matchCount: number
  }[]
}

export type ImplementationStatus = {
  phase: string
  deliverable: string
  status: 'Draft' | 'Need Review' | 'Approved' | 'In Progress' | 'Revision' | 'Ready for QA' | 'Done' | 'Hold' | 'Belum Dimulai'
  note: string
  approval: 'Menunggu' | 'Disetujui' | 'Belum' | 'Tidak Perlu'
}
