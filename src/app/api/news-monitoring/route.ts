export const dynamic = 'force-dynamic'

type RssNewsItem = {
  title: string
  href: string
  source: string
  publishedAt: string
}

const rssQuery = '("Sespim Polri" OR "Sespim Lemdiklat Polri" OR "Sekolah Staf dan Pimpinan Polri" OR "sespimlemdiklatpolri")'
const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(rssQuery)}&hl=id&gl=ID&ceid=ID:id`

function decodeXml(value: string) {
  return value
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-f0-9]+);/gi, (_, code: string) => String.fromCharCode(parseInt(code, 16)))
    .trim()
}

function getTagValue(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match?.[1] ? decodeXml(match[1]) : ''
}

function parseRssItems(xml: string): RssNewsItem[] {
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? []

  return itemBlocks
    .map((block) => ({
      title: getTagValue(block, 'title'),
      href: getTagValue(block, 'link'),
      source: getTagValue(block, 'source') || 'Google News',
      publishedAt: getTagValue(block, 'pubDate')
    }))
    .filter((item) => item.title && item.href)
    .slice(0, 8)
}

export async function GET() {
  try {
    const response = await fetch(rssUrl, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Sespim Polri Portal News Monitor'
      }
    })

    if (!response.ok) {
      throw new Error(`Google News RSS returned ${response.status}`)
    }

    const xml = await response.text()

    return Response.json({
      source: 'Google News',
      updatedAt: new Date().toISOString(),
      items: parseRssItems(xml)
    })
  } catch {
    return Response.json({
      source: 'Google News',
      updatedAt: new Date().toISOString(),
      items: [],
      error: 'Feed berita eksternal belum dapat dimuat.'
    })
  }
}
