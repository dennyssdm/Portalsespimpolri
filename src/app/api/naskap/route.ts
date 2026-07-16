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
    const { action, id } = body

    const data = await readDb()

    if (action === 'create') {
      const { name, rank, classGroup, email, phone, meetingUrl, proposedTitles, serdikNrpNip, widyaiswaraName, widyaiswaraNip, scheduleText } = body
      if (!name) {
        return Response.json({ error: 'Missing Serdik Name' }, { status: 400 })
      }
      
      const newId = `s-${Date.now()}`
      const newSerdik = {
        id: newId,
        name,
        rank: rank || 'Ajun Komisaris Besar Polisi',
        classGroup: classGroup || 'Sespimmen Polri Dikreg Ke-64',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        status: 'Pengajuan Judul',
        proposedTitles: Array.isArray(proposedTitles) 
          ? proposedTitles 
          : (proposedTitles ? [proposedTitles] : []),
        comments: [
          {
            sender: 'Serdik',
            text: 'Sesi bimbingan baru didaftarkan oleh administrator.',
            date: new Date().toLocaleString('id-ID', { hour12: false })
          }
        ],
        email: email || '',
        phone: phone || '',
        meetingUrl: meetingUrl || '',
        serdikNrpNip: serdikNrpNip || '',
        widyaiswaraName: widyaiswaraName || '',
        widyaiswaraNip: widyaiswaraNip || '',
        scheduleText: scheduleText || ''
      }
      
      data.push(newSerdik)
      await writeDb(data)
      return Response.json({ success: true, data: newSerdik })
    }

    if (!id) {
      return Response.json({ error: 'Missing Serdik ID' }, { status: 400 })
    }

    const serdikIndex = data.findIndex((s: any) => s.id === id)
    if (serdikIndex === -1) {
      return Response.json({ error: 'Serdik not found' }, { status: 404 })
    }

    const serdik = data[serdikIndex]

    if (action === 'delete') {
      data.splice(serdikIndex, 1)
      await writeDb(data)
      return Response.json({ success: true, message: 'Serdik pairing deleted successfully' })
    }

    if (action === 'update') {
      const { name, rank, classGroup, status, activeTitle, currentChapter, email, phone, meetingUrl, proposedTitles, serdikNrpNip, widyaiswaraName, widyaiswaraNip, scheduleText } = body
      
      if (name) serdik.name = name
      if (rank) serdik.rank = rank
      if (classGroup) serdik.classGroup = classGroup
      if (status) serdik.status = status
      if (activeTitle !== undefined) serdik.activeTitle = activeTitle
      if (currentChapter !== undefined) serdik.currentChapter = currentChapter
      if (email !== undefined) serdik.email = email
      if (phone !== undefined) serdik.phone = phone
      if (meetingUrl !== undefined) serdik.meetingUrl = meetingUrl
      if (serdikNrpNip !== undefined) serdik.serdikNrpNip = serdikNrpNip
      if (widyaiswaraName !== undefined) serdik.widyaiswaraName = widyaiswaraName
      if (widyaiswaraNip !== undefined) serdik.widyaiswaraNip = widyaiswaraNip
      if (scheduleText !== undefined) serdik.scheduleText = scheduleText
      
      if (proposedTitles !== undefined) {
        serdik.proposedTitles = Array.isArray(proposedTitles) 
          ? proposedTitles 
          : (proposedTitles ? [proposedTitles] : [])
      }

      data[serdikIndex] = serdik
      await writeDb(data)
      return Response.json({ success: true, data: serdik })
    }

    if (action === 'select-title') {
      const { title } = body
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
      const { comment } = body
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
