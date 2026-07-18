import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const analyticsFilePath = path.join(process.cwd(), 'src/data/chatbot_analytics.json')

export type ChatLogEntry = {
  id: string
  timestamp: string
  userMessage: string
  topic: string
  status: 'answered_ai' | 'needs_operator'
  operatorContact: string
}

export type ChatbotAnalyticsData = {
  operatorNumber: string
  operatorName: string
  logs: ChatLogEntry[]
}

const initialData: ChatbotAnalyticsData = {
  operatorNumber: '628123456789',
  operatorName: 'Admin Operator Sespim',
  logs: [
    {
      id: 'log-1',
      timestamp: '2026-07-18 08:00:00',
      userMessage: 'Apa saja program pendidikan di Sespimti dan Sespimmen?',
      topic: 'Program Pendidikan (Sespimti, Sespimmen, Sespimma)',
      status: 'answered_ai',
      operatorContact: '628123456789'
    },
    {
      id: 'log-2',
      timestamp: '2026-07-18 08:12:30',
      userMessage: 'Bagaimana cara melakukan klaim sertifikat inpassing Widyaiswara?',
      topic: 'Inpassing Widyaiswara',
      status: 'answered_ai',
      operatorContact: '628123456789'
    },
    {
      id: 'log-3',
      timestamp: '2026-07-18 08:20:15',
      userMessage: 'Saya mengalami kendala jaringan saat upload berkas persyaratan',
      topic: 'Bantuan Operator / Kendala Teknis',
      status: 'needs_operator',
      operatorContact: '628123456789'
    }
  ]
}

export async function readAnalytics(): Promise<ChatbotAnalyticsData> {
  try {
    const content = await fs.readFile(analyticsFilePath, 'utf8')
    return JSON.parse(content)
  } catch {
    // Return initial data if file doesn't exist yet
    return initialData
  }
}

export async function writeAnalytics(data: ChatbotAnalyticsData) {
  try {
    await fs.writeFile(analyticsFilePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (err) {
    console.error('Failed to write chatbot analytics:', err)
  }
}

export async function GET() {
  const data = await readAnalytics()
  
  // Calculate analytics summary metrics
  const totalChats = data.logs.length
  const answeredByAi = data.logs.filter(l => l.status === 'answered_ai').length
  const redirectedToOperator = data.logs.filter(l => l.status === 'needs_operator').length

  // Calculate top topics / FAQs
  const topicCounts: Record<string, number> = {}
  data.logs.forEach((l) => {
    topicCounts[l.topic] = (topicCounts[l.topic] || 0) + 1
  })

  const topFaqs = Object.entries(topicCounts)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count)

  return NextResponse.json({
    status: 'success',
    data: {
      metrics: {
        totalChats,
        answeredByAi,
        redirectedToOperator,
        aiSuccessRate: totalChats > 0 ? Math.round((answeredByAi / totalChats) * 100) : 100
      },
      operatorSettings: {
        operatorNumber: data.operatorNumber,
        operatorName: data.operatorName
      },
      topFaqs,
      recentLogs: data.logs.slice(-30).reverse()
    }
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, operatorNumber, operatorName } = body

    const data = await readAnalytics()

    if (action === 'update_operator') {
      if (operatorNumber) data.operatorNumber = operatorNumber
      if (operatorName) data.operatorName = operatorName
      await writeAnalytics(data)
      return NextResponse.json({ status: 'success', message: 'Pengaturan operator berhasil diperbarui.', data })
    }

    if (action === 'clear_logs') {
      data.logs = []
      await writeAnalytics(data)
      return NextResponse.json({ status: 'success', message: 'Riwayat percakapan berhasil dibersihkan.' })
    }

    return NextResponse.json({ status: 'error', message: 'Action tidak valid.' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message || 'Internal Error' }, { status: 500 })
  }
}
