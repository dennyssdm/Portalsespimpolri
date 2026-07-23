import { notFound } from 'next/navigation'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'
import { KurikulumTabs } from '@/components/pages/KurikulumTabs'
import { serverFetch } from '@/lib/api'

export const dynamic = 'force-dynamic'

const staticFallback = {
  sespimti: {
    title: "Kurikulum SESPIMTI POLRI",
    overview: "Kurikulum Sekolah Staf dan Pimpinan Tinggi (Sespimti) Polri dirancang untuk mencetak pemimpin tingkat tinggi yang profesional, cerdas, bermoral, modern, dan kolaboratif. Pendidikan difokuskan pada manajemen strategis, geopolitik, siber, serta riset kebijakan strategis.",
    subjects: [
      "Penguatan Karakter Kebangsaan & Moral Pemimpin",
      "Manajemen Strategis & Kepemimpinan Organisasi Tingkat Tinggi",
      "Analisis Lingkungan Strategis (Geopolitik & Kamtibmas)",
      "Teknologi & Kepemimpinan Digital Berbasis Data",
      "Aplikasi Metodologi & Riset Kebijakan Strategis (NASTRAP)"
    ],
    previewUrl: "https://drive.google.com/file/d/1-gP5QjUue8Kr2O1mXP0NuEpBX4cWoLUQ/view",
    downloadUrl: "https://drive.google.com/file/d/1-gP5QjUue8Kr2O1mXP0NuEpBX4cWoLUQ/view"
  },
  sespimmen: {
    title: "Kurikulum SESPIMMEN POLRI",
    overview: "Kurikulum Sekolah Staf dan Pimpinan Menengah (Sespimmen) Polri berfokus pada pemantapan kepemimpinan menengah, manajemen operasional kepolisian, koordinasi lintas fungsi, serta pemecahan masalah kamtibmas kewilayahan secara prediktif.",
    subjects: [
      "Kepemimpinan Transformatif & Manajemen Perubahan",
      "Manajemen Operasional Kepolisian Kewilayahan",
      "Hukum, HAM, & Administrasi Organisasi Polri",
      "Sosiologi Keamanan & Hubungan Lintas Sektoral",
      "Metodologi Kajian Strategis Perorangan (Naskap)"
    ],
    previewUrl: "https://drive.google.com/file/d/1-gP5QjUue8Kr2O1mXP0NuEpBX4cWoLUQ/view",
    downloadUrl: "https://drive.google.com/file/d/1-gP5QjUue8Kr2O1mXP0NuEpBX4cWoLUQ/view"
  },
  sppk: {
    title: "Kurikulum SPPK POLRI",
    overview: "Kurikulum Sekolah Pengembangan Profesi Kepolisian (SPPK) ditujukan untuk meningkatkan kompetensi spesialis fungsional, kepatuhan kode etik profesi, audit penegakan hukum, serta sertifikasi keahlian khusus di lingkungan Polri.",
    subjects: [
      "Spesialisasi Fungsi Teknis Kepolisian Lanjutan",
      "Manajemen Penyidikan & Audit Investigatif Modern",
      "Kepatuhan Etika Profesi & Pengawasan Mutu Operasional",
      "Sertifikasi Kompetensi & Standardisasi Penyelenggaraan Tugas"
    ],
    previewUrl: "https://drive.google.com/file/d/1-gP5QjUue8Kr2O1mXP0NuEpBX4cWoLUQ/view",
    downloadUrl: "https://drive.google.com/file/d/1-gP5QjUue8Kr2O1mXP0NuEpBX4cWoLUQ/view"
  },
  sespimma: {
    title: "Kurikulum SESPIMMA POLRI",
    overview: "Kurikulum Sekolah Staf dan Pimpinan Pertama (Sespimma) membekali perwira pertama dengan kemampuan dasar manajerial, kepemimpinan dasar kewilayahan, pengelolaan staf, serta teknik komunikasi pelayanan publik.",
    subjects: [
      "Administrasi Umum & Tata Kelola Manajemen Staf",
      "Taktik & Teknik Operasional Dasar Kepolisian",
      "Kepemimpinan Lapangan & Pembinaan Masyarakat",
      "Komunikasi Publik & Manajemen Pelayanan Prima"
    ],
    previewUrl: "https://drive.google.com/file/d/1-gP5QjUue8Kr2O1mXP0NuEpBX4cWoLUQ/view",
    downloadUrl: "https://drive.google.com/file/d/1-gP5QjUue8Kr2O1mXP0NuEpBX4cWoLUQ/view"
  }
}

export default async function Page() {
  const path = "/program-pendidikan/kurikulum"
  
  // Try to load dynamically from DB
  let dbData = null
  try {
    const res = await serverFetch('/api/program-pendidikan-content/e-2', { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json.status === 'success' && json.data?.record?.content) {
        dbData = JSON.parse(json.data.record.content)
      }
    }
  } catch (err) {
    console.warn('Failed to fetch dynamic Kurikulum Umum from DB, using fallback:', err)
  }

  const data = dbData || staticFallback

  return (
    <main className="bg-polri-cream/20 pb-20">
      <PageHero
        title="Kurikulum Umum"
        eyebrow="Akademik"
        description="Informasi standar capaian pembelajaran dan kurikulum pendidikan kepemimpinan Lemdiklat Sespim Polri."
      />
      <Container className="mt-12">
        <KurikulumTabs data={data} />
      </Container>
    </main>
  )
}
