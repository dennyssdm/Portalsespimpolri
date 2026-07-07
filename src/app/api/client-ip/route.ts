import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const headersList = await headers()
  const forwardedFor = headersList.get('x-forwarded-for')
  const ip =
    forwardedFor?.split(',')[0]?.trim() ||
    headersList.get('x-real-ip') ||
    headersList.get('cf-connecting-ip') ||
    headersList.get('true-client-ip') ||
    'Tidak tersedia'

  return NextResponse.json(
    { ip },
    {
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  )
}
