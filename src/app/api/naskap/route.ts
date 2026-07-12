import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const dbFilePath = path.join(process.cwd(), 'src/data/naskap_db.json')

async function readDb() {
  try {
    const data = await fs.readFile(dbFilePath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error('Error reading naskap DB file:', err)
    return []
  }
}

async function writeDb(data: any) {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (err) {
    console.error('Error writing to naskap DB file:', err)
  }
}

export async function GET() {
  const data = await readDb()
  return Response.json(data)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, id, title, comment } = body

    if (!id) {
      return Response.json({ error: 'Missing Serdik ID' }, { status: 400 })
    }

    const data = await readDb()
    const serdikIndex = data.findIndex((s: any) => s.id === id)

    if (serdikIndex === -1) {
      return Response.json({ error: 'Serdik not found' }, { status: 404 })
    }

    const serdik = data[serdikIndex]

    if (action === 'select-title') {
      if (!title) {
        return Response.json({ error: 'Missing title' }, { status: 400 })
      }
      serdik.status = 'Bimbingan Draf'
      serdik.activeTitle = title
      serdik.currentChapter = 'Bab I: Pendahuluan'
      delete serdik.proposedTitles
      serdik.comments.push({
        sender: 'Widyaiswara',
        text: `Judul terpilih dan disetujui: "${title}". Silakan susun kerangka Bab I (Pendahuluan).`,
        date: new Date().toLocaleString('id-ID', { hour12: false })
      })
    } else if (action === 'add-comment') {
      if (!comment) {
        return Response.json({ error: 'Missing comment text' }, { status: 400 })
      }
      serdik.comments.push({
        sender: 'Widyaiswara',
        text: comment,
        date: new Date().toLocaleString('id-ID', { hour12: false })
      })
    } else if (action === 'approve') {
      serdik.status = 'Selesai'
      serdik.comments.push({
        sender: 'Widyaiswara',
        text: 'Saya sudah meninjau Bab II dan Bab III secara keseluruhan. Hasil kerja sangat memuaskan, naskah ini disetujui (ACC) untuk diujikan.',
        date: new Date().toLocaleString('id-ID', { hour12: false })
      })
    } else {
      return Response.json({ error: 'Invalid action specified' }, { status: 400 })
    }

    data[serdikIndex] = serdik
    await writeDb(data)

    return Response.json({ success: true, data: serdik })
  } catch (err: any) {
    return Response.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}
