export function isExternalHref(href: string) {
  return /^https?:\/\//.test(href)
}

export function isInternalHref(href: string) {
  return href.startsWith('/')
}

export function externalLinkProps(href: string) {
  return isExternalHref(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
