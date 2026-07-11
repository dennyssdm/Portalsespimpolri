'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { apiFetch, MODULE_TO_CONTENT_TYPE } from '@/lib/api'
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  FolderIcon,
  DocumentTextIcon,
  UserGroupIcon,
  AcademicCapIcon,
  HomeIcon,
  CogIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

// Types for CMS items
type CMSItem = {
  id: string
  title: string
  category: string
  date: string
  status: 'Published' | 'Draft'
  author?: string
  image_url?: string
  content?: string
}

type RoleType = 'super_admin' | 'stakeholder' | 'admin' | 'serdik' | 'widyaiswara'

// Initial mock data per module
const initialMockData: Record<string, CMSItem[]> = {
  'Beranda': [
    { id: 'h-1', title: 'Wajah utama Portal Resmi Sespim Lemdiklat Polri', category: 'Hero Headline', date: '2026-07-01', status: 'Published' },
    { id: 'h-2', title: 'Kata Sambutan Kepala Sespim Polri', category: 'Sambutan', date: '2026-07-02', status: 'Published' }
  ],
  'Profil': [
    { id: 'p-1', title: 'Sejarah Perkembangan Kampus Lembang', category: 'Sejarah Sespim', date: '2026-07-03', status: 'Published' },
    { id: 'p-2', title: 'Visi dan Misi Lemdiklat', category: 'Visi Misi', date: '2026-07-03', status: 'Published' },
    { id: 'p-3', title: 'Tugas dan Fungsi Pokok Kepolisian', category: 'Tugas Fungsi', date: '2026-07-03', status: 'Published' },
    { id: 'p-4', title: 'Struktur Organisasi Pelaksana', category: 'Struktur Organisasi', date: '2026-07-04', status: 'Published' },
    { id: 'p-5', title: 'Pejabat Utama Sespim', category: 'Pejabat Sespim', date: '2026-07-04', status: 'Published' },
    { id: 'p-6', title: 'Fasilitas Belajar & Sarana Olahraga', category: 'Fasilitas', date: '2026-07-05', status: 'Published' },
    { id: 'p-7', title: 'Alamat dan Nomor Kontak Resmi Sespim', category: 'Contact', date: '2026-07-05', status: 'Published' },
    { id: 'p-8', title: 'Susunan Redaksi Website', category: 'Susunan Redaksi', date: '2026-07-05', status: 'Published' }
  ],
  'Program Pendidikan': [
    { id: 'e-1', title: 'Kalender Pendidikan TA 2026', category: 'Kalender Pendidikan', date: '2026-07-01', status: 'Published' },
    { id: 'e-2', title: 'Kurikulum Umum Sespimti', category: 'Kurikulum Umum', date: '2026-07-01', status: 'Published' },
    { id: 'e-3', title: 'Pedoman Akademik Serdik', category: 'Pedoman Akademik', date: '2026-07-02', status: 'Published' },
    { id: 'e-4', title: 'Evaluasi Mingguan dan Ujian', category: 'Evaluasi Pendidikan', date: '2026-07-02', status: 'Published' },
    { id: 'e-5', title: 'Panduan KKLN / KKDN', category: 'Informasi Peserta Didik', date: '2026-07-03', status: 'Published' },
    { id: 'e-6', title: 'Modul SESPIMTI POLRI', category: 'SESPIMTI', date: '2026-07-03', status: 'Published' },
    { id: 'e-7', title: 'Modul SESPIMMEN POLRI', category: 'SESPIMMEN', date: '2026-07-04', status: 'Published' },
    { id: 'e-8', title: 'Modul SESPIMMA POLRI', category: 'SESPIMMA', date: '2026-07-04', status: 'Published' },
    { id: 'e-9', title: 'Modul SPPK POLRI', category: 'SPPK', date: '2026-07-04', status: 'Published' }
  ],
  'Kelembagaan Internal': [
    { id: 'k-1', title: 'Tugas Pokok Bidang SETLEM', category: 'SETLEM', date: '2026-07-02', status: 'Published' },
    { id: 'k-2', title: 'Tugas Pokok Bidang JIANBANG', category: 'JIANBANG', date: '2026-07-02', status: 'Published' },
    { id: 'k-3', title: 'IKAS Alumni / Tracer Study', category: 'IKAS Alumni', date: '2026-07-03', status: 'Published' },
    { id: 'k-4', title: 'Tugas Pokok Bidang BIDANG', category: 'BIDANG', date: '2026-07-03', status: 'Published' }
  ],
  'Widyaiswara': [
    { id: 'w-1', title: 'Profil Tenaga Pendidik', category: 'Profil Widyaiswara', date: '2026-07-01', status: 'Published' },
    { id: 'w-2', title: 'Daftar Kompetensi & Bidang Keahlian', category: 'Bidang Keahlian', date: '2026-07-02', status: 'Published' },
    { id: 'w-3', title: 'Publikasi Karya Widyaiswara', category: 'Publikasi Widyaiswara', date: '2026-07-02', status: 'Published' },
    { id: 'w-4', title: 'Materi Kuliah Terbuka Serdik', category: 'Materi Terbuka', date: '2026-07-03', status: 'Published' },
    { id: 'w-5', title: 'Progress Pembimbingan Naskap', category: 'Pembimbingan Naskap', date: '2026-07-03', status: 'Published' },
    { id: 'w-6', title: 'Sistem Inpassing Jabatan Fungsional', category: 'Inpassing', date: '2026-07-04', status: 'Published' },
    { id: 'w-7', title: 'Sertifikasi BNSP / LSP Lemdiklat', category: 'LSP / BNSP', date: '2026-07-04', status: 'Published' }
  ],
  'Publikasi': [
    { id: 'pub-1', title: 'Artikel Opini Kepemimpinan Modern', category: 'Artikel', date: '2026-07-01', status: 'Published' },
    { id: 'pub-2', title: 'Policy Brief Kamtibmas Cyber', category: 'Policy Brief', date: '2026-07-02', status: 'Published' },
    { id: 'pub-3', title: 'Kajian Strategis Penanganan Kejahatan Jalanan', category: 'Kajian Strategis', date: '2026-07-02', status: 'Published' },
    { id: 'pub-4', title: 'Naskah Akademik Narkotika Siber', category: 'Naskah Akademik', date: '2026-07-03', status: 'Published' },
    { id: 'pub-5', title: 'Jurnal Ilmiah Sespim Volume 24', category: 'Jurnal Ilmiah', date: '2026-07-03', status: 'Published' },
    { id: 'pub-6', title: 'Resensi Buku Pengamanan Intelijen', category: 'Resensi Buku', date: '2026-07-04', status: 'Published' },
    { id: 'pub-7', title: 'Karya Terbaik Peserta Didik TA 2026', category: 'Karya Peserta Didik', date: '2026-07-04', status: 'Published' }
  ],
  'Berita & Informasi Publik': [
    { id: 'n-1', title: 'Kunjungan Kapolri ke Kampus Lembang', category: 'Berita Internal Sespim', date: '2026-07-05', status: 'Published' },
    { id: 'n-2', title: 'Feed Up To Date Pendidikan Dikreg-35', category: 'Feed Up To Date', date: '2026-07-05', status: 'Published' },
    { id: 'n-3', title: 'Portal Berita Nasional Pilihan', category: 'Portal Berita Nasional', date: '2026-07-06', status: 'Published' },
    { id: 'n-4', title: 'Media Sosial & Hashtag Sespim', category: 'Media Sosial & Hashtag', date: '2026-07-06', status: 'Published' },
    { id: 'n-5', title: 'Kalender Agenda Pendidikan', category: 'Agenda Pendidikan', date: '2026-07-07', status: 'Draft' },
    { id: 'n-6', title: 'Informasi Publik Berkala Sespim', category: 'Informasi Publik', date: '2026-07-07', status: 'Published' }
  ],
  'Galeri & Unduhan': [
    { id: 'g-1', title: 'Dokumentasi Upacara Pembukaan Pendidikan', category: 'Galeri Foto', date: '2026-07-01', status: 'Published' },
    { id: 'g-2', title: 'Video Profil Sespim Lemdiklat Polri', category: 'Galeri Video', date: '2026-07-01', status: 'Published' },
    { id: 'g-3', title: 'Template NASKAP Serdik Resmi', category: 'Template NASKAP', date: '2026-07-02', status: 'Published' },
    { id: 'g-4', title: 'Template Policy Brief Lemdiklat', category: 'Template Policy Brief', date: '2026-07-02', status: 'Published' },
    { id: 'g-5', title: 'Formulir Pendaftaran Ulang / Umum', category: 'Formulir Umum', date: '2026-07-03', status: 'Published' }
  ],
  'Kontak': [
    { id: 'con-1', title: 'Alamat Resmi Kampus Maribaya Lembang', category: 'Alamat resmi', date: '2026-07-01', status: 'Published' },
    { id: 'con-2', title: 'Tautan Google Maps Kampus Lembang', category: 'Peta lokasi', date: '2026-07-01', status: 'Published' },
    { id: 'con-3', title: 'Sosial Media & Form Kontak', category: 'Form kontak', date: '2026-07-02', status: 'Published' }
  ],
  'Sarana Prasarana': [
    { id: 's-1', title: 'eLibrary Katalog Digital SLIMS', category: 'eLibrary', date: '2026-07-01', status: 'Published' },
    { id: 's-2', title: 'Portal Perpusnas Indonesia', category: 'Perpusnas', date: '2026-07-01', status: 'Published' },
    { id: 's-3', title: 'Koleksi Ejurnal Internasional', category: 'Ejurnal', date: '2026-07-02', status: 'Published' },
    { id: 's-4', title: 'LMS SIAPSESPIM Platform Pembelajaran', category: 'LMS SIAPSESPIM', date: '2026-07-02', status: 'Published' },
    { id: 's-5', title: 'Turnitin Cek Plagiarisme', category: 'Cek Plagiarisme', date: '2026-07-03', status: 'Published' },
    { id: 's-6', title: 'Klinik Pratama Sespim Polri', category: 'Klinik Pratama', date: '2026-07-03', status: 'Published' }
  ]
}

interface CMSSidebarItem {
  label: string
  type: 'module' | 'link'
  href?: string
  moduleName?: string
}



const ADMIN_SIDEBAR_ITEMS: CMSSidebarItem[] = [
  { label: 'Beranda', type: 'module', moduleName: 'Beranda' },
  { label: 'Profil', type: 'module', moduleName: 'Profil' },
  { label: 'Program Pendidikan', type: 'module', moduleName: 'Program Pendidikan' },
  { label: 'Widyaiswara', type: 'module', moduleName: 'Widyaiswara' },
  { label: 'Kelembagaan Internal', type: 'module', moduleName: 'Kelembagaan Internal' },
  { label: 'Berita & Informasi Publik', type: 'module', moduleName: 'Berita & Informasi Publik' },
  { label: 'Publikasi', type: 'module', moduleName: 'Publikasi' },
  { label: 'Galeri & Unduhan', type: 'module', moduleName: 'Galeri & Unduhan' },
  { label: 'Kontak', type: 'module', moduleName: 'Kontak' },
  { label: 'Sarana Prasarana', type: 'module', moduleName: 'Sarana Prasarana' }
]

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeRoleParam = searchParams.get('role') as RoleType

  const [user, setUser] = useState<{
    name: string
    role: string
    roleLabel: string
  } | null>(null)

  useEffect(() => {
    const userJson = sessionStorage.getItem('sespim_user')
    if (!userJson) {
      router.push('/login?message=unauthorized')
      return
    }

    const sessionUser = JSON.parse(userJson)
    if (sessionUser.role !== 'super_admin' && sessionUser.role !== 'admin') {
      router.push('/login?message=forbidden')
      return
    }

    setUser(sessionUser)

    if (activeRoleParam !== sessionUser.role) {
      router.replace(`/admin/dashboard?role=${sessionUser.role}`)
    }
  }, [router, activeRoleParam])

  const activeRole: RoleType = ['super_admin', 'admin'].includes(activeRoleParam)
    ? activeRoleParam
    : (user ? (user.role as RoleType) : 'admin')

  const hasWriteAccess = activeRole === 'super_admin' || activeRole === 'admin'
  const hasDeleteAccess = activeRole === 'super_admin'
  
  const sidebarItems = ADMIN_SIDEBAR_ITEMS

  // States
  const [currentModule, setCurrentModule] = useState('Beranda')
  const [currentSidebarLabel, setCurrentSidebarLabel] = useState('Beranda')
  const [items, setItems] = useState<CMSItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All')

  // Modals States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  // Selected item state for edit/delete/view
  const [selectedItem, setSelectedItem] = useState<CMSItem | null>(null)

  // Form Fields State
  const [formTitle, setFormTitle] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft'>('Published')
  const [formImageUrl, setFormImageUrl] = useState('')
  const [formContent, setFormContent] = useState('')

  // Program Pendidikan Specific Form Fields
  const [formProgSlug, setFormProgSlug] = useState('')
  const [formProgAudience, setFormProgAudience] = useState('')
  const [formProgDuration, setFormProgDuration] = useState('')
  const [formProgLevel, setFormProgLevel] = useState('')
  const [formProgFocusTitle, setFormProgFocusTitle] = useState('')
  const [formProgOutcomesTitle, setFormProgOutcomesTitle] = useState('')
  const [formProgStagesTitle, setFormProgStagesTitle] = useState('')
  const [formProgStatusTitle, setFormProgStatusTitle] = useState('')
  const [formProgStatusDescription, setFormProgStatusDescription] = useState('')
  const [formProgOverview, setFormProgOverview] = useState('')
  const [formProgFocusAreas, setFormProgFocusAreas] = useState('')
  const [formProgOutcomes, setFormProgOutcomes] = useState('')
  const [formProgStages, setFormProgStages] = useState('')
  const [formProgDocuments, setFormProgDocuments] = useState('')

  // Check if a category/item is a program school
  const isProgramSchool = (categoryVal: string, itemId?: string) => {
    return categoryVal === 'program-sekolah' || (itemId && itemId.startsWith('prog-'));
  }

  // Parsing a program JSON string into state
  const parseProgramContent = (contentStr: string, titleVal: string) => {
    try {
      const parsed = JSON.parse(contentStr)
      setFormProgSlug(parsed.slug || titleVal.toLowerCase().replace(/\s+/g, '-'))
      setFormProgAudience(parsed.audience || '')
      setFormProgDuration(parsed.duration || '')
      setFormProgLevel(parsed.level || '')
      setFormProgFocusTitle(parsed.focusTitle || '')
      setFormProgOutcomesTitle(parsed.outcomesTitle || '')
      setFormProgStagesTitle(parsed.stagesTitle || '')
      setFormProgStatusTitle(parsed.statusTitle || '')
      setFormProgStatusDescription(parsed.statusDescription || '')
      setFormProgOverview(Array.isArray(parsed.overview) ? parsed.overview.join('\n\n') : '')
      setFormProgFocusAreas(Array.isArray(parsed.focusAreas) ? parsed.focusAreas.join('\n') : '')
      setFormProgOutcomes(Array.isArray(parsed.outcomes) ? parsed.outcomes.join('\n') : '')
      
      const stagesStr = Array.isArray(parsed.stages) 
        ? parsed.stages.map((s: any) => `${s.title}: ${s.description}`).join('\n')
        : ''
      setFormProgStages(stagesStr)

      const docsStr = Array.isArray(parsed.documents)
        ? parsed.documents.map((d: any) => `${d.title}: ${d.href}`).join('\n')
        : ''
      setFormProgDocuments(docsStr)
    } catch (e) {
      setFormProgSlug(titleVal.toLowerCase().replace(/\s+/g, '-'))
      setFormProgAudience('')
      setFormProgDuration('')
      setFormProgLevel('')
      setFormProgFocusTitle('')
      setFormProgOutcomesTitle('')
      setFormProgStagesTitle('')
      setFormProgStatusTitle('')
      setFormProgStatusDescription('')
      setFormProgOverview(contentStr || '')
      setFormProgFocusAreas('')
      setFormProgOutcomes('')
      setFormProgStages('')
      setFormProgDocuments('')
    }
  }

  // Building the program JSON string from state
  const buildProgramContent = (titleVal: string) => {
    const slugVal = formProgSlug || titleVal.toLowerCase().replace(/\s+/g, '-')
    const overview = formProgOverview.split(/\r?\n\r?\n/).map(p => p.trim()).filter(Boolean)
    const focusAreas = formProgFocusAreas.split(/\r?\n/).map(f => f.trim()).filter(Boolean)
    const outcomes = formProgOutcomes.split(/\r?\n/).map(o => o.trim()).filter(Boolean)
    
    const stages = formProgStages.split(/\r?\n/).map(line => {
      const idx = line.indexOf(':')
      if (idx !== -1) {
        return { title: line.substring(0, idx).trim(), description: line.substring(idx + 1).trim() }
      }
      return { title: line.trim(), description: '' }
    }).filter(s => s.title)

    const documents = formProgDocuments.split(/\r?\n/).map(line => {
      const idx = line.indexOf(':')
      if (idx !== -1) {
        return { title: line.substring(0, idx).trim(), href: line.substring(idx + 1).trim() }
      }
      return { title: line.trim(), href: '#' }
    }).filter(d => d.title)

    return JSON.stringify({
      slug: slugVal,
      title: titleVal,
      eyebrow: 'Program Pendidikan',
      href: `/program-pendidikan/${slugVal}`,
      summary: overview[0] || '',
      audience: formProgAudience,
      duration: formProgDuration,
      level: formProgLevel,
      focusTitle: formProgFocusTitle || undefined,
      outcomesTitle: formProgOutcomesTitle || undefined,
      stagesTitle: formProgStagesTitle || undefined,
      statusTitle: formProgStatusTitle || undefined,
      statusDescription: formProgStatusDescription || undefined,
      overview,
      focusAreas,
      outcomes,
      stages,
      documents
    })
  }

  // Profil Specific Form Fields
  const [formPejabatItems, setFormPejabatItems] = useState<{ group: string; name: string; pangkat: string; jabatan: string; foto: string }[]>([])
  const [formFasilitasItems, setFormFasilitasItems] = useState<{ group: string; name: string; keterangan: string; foto: string }[]>([])
  
  const [formContactChatbotName, setFormContactChatbotName] = useState('')
  const [formContactChatbotUrl, setFormContactChatbotUrl] = useState('')
  const [formContactAlamat, setFormContactAlamat] = useState('')
  const [formContactTelepon, setFormContactTelepon] = useState('')
  const [formContactEmail, setFormContactEmail] = useState('')

  const [formRedaksiPenanggungJawab, setFormRedaksiPenanggungJawab] = useState('')
  const [formRedaksiPengarah, setFormRedaksiPengarah] = useState('')
  const [formRedaksiPemimpinRedaksi, setFormRedaksiPemimpinRedaksi] = useState('')
  const [formRedaksiEditor, setFormRedaksiEditor] = useState('')
  const [formRedaksiAdminTeknis, setFormRedaksiAdminTeknis] = useState('')
  const [formRedaksiKontributorSespimti, setFormRedaksiKontributorSespimti] = useState('')
  const [formRedaksiKontributorSespimmen, setFormRedaksiKontributorSespimmen] = useState('')
  const [formRedaksiKontributorSppk, setFormRedaksiKontributorSppk] = useState('')
  const [formRedaksiKontributorSespimma, setFormRedaksiKontributorSespimma] = useState('')
  const [formRedaksiKontributorBidang, setFormRedaksiKontributorBidang] = useState('')
  const [formRedaksiKontributorJianbang, setFormRedaksiKontributorJianbang] = useState('')
  const [formRedaksiKontributorSetlem, setFormRedaksiKontributorSetlem] = useState('')
  const [formRedaksiKontributorWidyaiswara, setFormRedaksiKontributorWidyaiswara] = useState('')
  const [formRedaksiReviewer, setFormRedaksiReviewer] = useState('')

  // Parsing a profil string content into states
  const parseProfilContent = (itemId: string, contentStr: string) => {
    if (itemId === 'p-5') {
      const lines = contentStr.split(/\r?\n/)
      const list: any[] = []
      let currentGroup = 'UNSUR PIMPINAN'
      let currentItem: any = null
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        if (trimmed.toUpperCase().startsWith('KELOMPOK:')) {
          currentGroup = trimmed.substring(9).trim()
          continue
        }
        if (trimmed.toUpperCase().startsWith('NAMA:')) {
          currentItem = { group: currentGroup, name: trimmed.substring(5).trim(), pangkat: '', jabatan: '', foto: '' }
          list.push(currentItem)
          continue
        }
        if (currentItem) {
          if (trimmed.toUpperCase().startsWith('PANGKAT:')) {
            currentItem.pangkat = trimmed.substring(8).trim()
          } else if (trimmed.toUpperCase().startsWith('JABATAN:')) {
            currentItem.jabatan = trimmed.substring(8).trim()
          } else if (trimmed.toUpperCase().startsWith('FOTO:')) {
            currentItem.foto = trimmed.substring(5).trim()
          }
        }
      }
      setFormPejabatItems(list.length > 0 ? list : [{ group: 'UNSUR PIMPINAN', name: '', pangkat: '', jabatan: '', foto: '' }])
    } else if (itemId === 'p-6') {
      const lines = contentStr.split(/\r?\n/)
      const list: any[] = []
      let currentGroup = 'RUANG KELAS'
      let currentItem: any = null
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        if (trimmed.toUpperCase().startsWith('KELOMPOK:')) {
          currentGroup = trimmed.substring(9).trim()
          continue
        }
        if (trimmed.toUpperCase().startsWith('NAMA:')) {
          currentItem = { group: currentGroup, name: trimmed.substring(5).trim(), keterangan: '', foto: '' }
          list.push(currentItem)
          continue
        }
        if (currentItem) {
          if (trimmed.toUpperCase().startsWith('KETERANGAN:')) {
            currentItem.keterangan = trimmed.substring(11).trim()
          } else if (trimmed.toUpperCase().startsWith('FOTO:')) {
            currentItem.foto = trimmed.substring(5).trim()
          }
        }
      }
      setFormFasilitasItems(list.length > 0 ? list : [{ group: 'RUANG KELAS', name: '', keterangan: '', foto: '' }])
    } else if (itemId === 'p-7') {
      const lines = contentStr.split(/\r?\n/)
      let chatbotName = ''
      let chatbotUrl = ''
      let alamat = ''
      let telepon = ''
      let email = ''
      for (const line of lines) {
        const parts = line.split(':')
        if (parts.length >= 2) {
          const key = parts[0].trim().toLowerCase()
          const val = parts.slice(1).join(':').trim()
          if (key === 'nama agen chatbot') chatbotName = val
          else if (key === 'whatsapp chatbot url') chatbotUrl = val
          else if (key === 'alamat resmi') alamat = val
          else if (key === 'nomor kontak resmi') telepon = val
          else if (key === 'email resmi') email = val
        }
      }
      setFormContactChatbotName(chatbotName)
      setFormContactChatbotUrl(chatbotUrl)
      setFormContactAlamat(alamat)
      setFormContactTelepon(telepon)
      setFormContactEmail(email)
    } else if (itemId === 'p-8') {
      const lines = contentStr.split(/\r?\n/)
      const getVal = (prefix: string) => {
        const found = lines.find(l => l.trim().toLowerCase().startsWith(prefix.toLowerCase()))
        if (found) {
          const parts = found.split(':')
          return parts.slice(1).join(':').trim()
        }
        return ''
      }
      setFormRedaksiPenanggungJawab(getVal('Penanggung Jawab'))
      setFormRedaksiPengarah(getVal('Pengarah'))
      setFormRedaksiPemimpinRedaksi(getVal('Pemimpin Redaksi'))
      setFormRedaksiEditor(getVal('Editor'))
      setFormRedaksiAdminTeknis(getVal('Admin Teknis'))
      setFormRedaksiKontributorSespimti(getVal('Kontributor Sespimti'))
      setFormRedaksiKontributorSespimmen(getVal('Kontributor Sespimmen'))
      setFormRedaksiKontributorSppk(getVal('Kontributor SPPK'))
      setFormRedaksiKontributorSespimma(getVal('Kontributor Sespimma'))
      setFormRedaksiKontributorBidang(getVal('Kontributor Bidang'))
      setFormRedaksiKontributorJianbang(getVal('Kontributor Jianbang'))
      setFormRedaksiKontributorSetlem(getVal('Kontributor Setlem'))
      setFormRedaksiKontributorWidyaiswara(getVal('Kontributor Widyaiswara'))
      setFormRedaksiReviewer(getVal('Reviewer'))
    }
  }

  // Building profil content string from states
  const buildProfilContent = (itemId: string): string => {
    if (itemId === 'p-5') {
      let contentStr = ''
      let currentGroup = ''
      for (const item of formPejabatItems) {
        if (!item.name.trim()) continue
        if (item.group !== currentGroup) {
          currentGroup = item.group
          contentStr += `KELOMPOK: ${currentGroup}\n`
        }
        contentStr += `Nama: ${item.name}\n`
        if (item.pangkat) contentStr += `Pangkat: ${item.pangkat}\n`
        if (item.jabatan) contentStr += `Jabatan: ${item.jabatan}\n`
        contentStr += `Foto: ${item.foto || ''}\n\n`
      }
      return contentStr.trim()
    }
    if (itemId === 'p-6') {
      let contentStr = ''
      let currentGroup = ''
      for (const item of formFasilitasItems) {
        if (!item.name.trim()) continue
        if (item.group !== currentGroup) {
          currentGroup = item.group
          contentStr += `KELOMPOK: ${currentGroup}\n`
        }
        contentStr += `Nama: ${item.name}\n`
        if (item.keterangan) contentStr += `Keterangan: ${item.keterangan}\n`
        contentStr += `Foto: ${item.foto || ''}\n\n`
      }
      return contentStr.trim()
    }
    if (itemId === 'p-7') {
      return [
        `Nama Agen Chatbot: ${formContactChatbotName}`,
        `WhatsApp Chatbot URL: ${formContactChatbotUrl}`,
        `Alamat Resmi: ${formContactAlamat}`,
        `Nomor Kontak Resmi: ${formContactTelepon}`,
        `Email Resmi: ${formContactEmail}`
      ].join('\n')
    }
    if (itemId === 'p-8') {
      return [
        `Penanggung Jawab: ${formRedaksiPenanggungJawab}`,
        `Pengarah: ${formRedaksiPengarah}`,
        `Pemimpin Redaksi: ${formRedaksiPemimpinRedaksi}`,
        `Editor: ${formRedaksiEditor}`,
        `Admin Teknis: ${formRedaksiAdminTeknis}`,
        `Kontributor Sespimti: ${formRedaksiKontributorSespimti}`,
        `Kontributor Sespimmen: ${formRedaksiKontributorSespimmen}`,
        `Kontributor SPPK: ${formRedaksiKontributorSppk}`,
        `Kontributor Sespimma: ${formRedaksiKontributorSespimma}`,
        `Kontributor Bidang: ${formRedaksiKontributorBidang}`,
        `Kontributor Jianbang: ${formRedaksiKontributorJianbang}`,
        `Kontributor Setlem: ${formRedaksiKontributorSetlem}`,
        `Kontributor Widyaiswara: ${formRedaksiKontributorWidyaiswara}`,
        `Reviewer: ${formRedaksiReviewer}`
      ].join('\n')
    }
    return formContent
  }

  const [loading, setLoading] = useState(false)

  const loadItems = async (moduleName: string) => {
    setLoading(true)
    const contentType = MODULE_TO_CONTENT_TYPE[moduleName]
    if (!contentType) {
      setItems([])
      setLoading(false)
      return
    }

    try {
      const res = await apiFetch(`/api/${contentType}?limit=100`)
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success' && json.data && json.data.records) {
          const formatted: CMSItem[] = json.data.records.map((r: any) => ({
            id: r.id,
            title: r.title,
            category: r.category || 'General',
            date: r.date ? new Date(r.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            status: r.status === 'Draft' ? 'Draft' : 'Published',
            author: r.author || 'Admin',
            image_url: r.image_url || '',
            content: r.content || ''
          }))
          setItems(formatted)
          setLoading(false)
          return
        }
      }
    } catch (e) {
      console.warn(`Failed to fetch ${contentType} from API, falling back to mock data:`, e)
    }

    // Fallback to local mock data
    const data = initialMockData[moduleName] || []
    setItems(data)
    setLoading(false)
  }

  // Load items from mock data or local state
  useEffect(() => {
    const validModules = sidebarItems
      .filter((item) => item.type === 'module')
      .map((item) => item.moduleName as string)
    if (!validModules.includes(currentModule)) {
      const match = sidebarItems.find((item) => item.type === 'module')
      if (match) {
        setCurrentModule(match.moduleName as string)
        setCurrentSidebarLabel(match.label)
      }
    } else {
      loadItems(currentModule)
    }
  }, [activeRole, sidebarItems, currentModule])

  const getItemDescription = (item: CMSItem): React.ReactNode => {
    if (item.id && item.id.startsWith('prog-')) {
      try {
        const parsed = JSON.parse(item.content || '{}')
        return <span className="font-bold text-polri-goldSoft">{parsed.summary || parsed.audience || '-'}</span>
      } catch (e) {}
    }
    if (item.id === 'p-1') return <span className="font-bold text-polri-goldSoft">Sejarah Sespim Polri</span>
    if (item.id === 'p-2') return <span className="font-bold text-polri-goldSoft">Visi & Misi Sespim</span>
    if (item.id === 'p-3') return <span className="font-bold text-polri-goldSoft">Tugas Pokok & Fungsi</span>
    if (item.id === 'p-4') return <span className="font-bold text-polri-goldSoft">Bagan Struktur Organisasi</span>
    if (item.id === 'p-5') return <span className="font-bold text-polri-goldSoft">Pejabat Utama Sespim</span>
    if (item.id === 'p-6') return <span className="font-bold text-polri-goldSoft">Fasilitas Belajar & Sarana</span>
    if (item.id === 'p-7') return <span className="font-bold text-polri-goldSoft">Alamat & Kontak Resmi</span>
    if (item.id === 'p-8') return <span className="font-bold text-polri-goldSoft">Dewan Redaksi Website</span>
    
    return <span className="text-neutral-400 font-normal">{item.content ? item.content.substring(0, 80).replace(/\r?\n/g, ' ') + '...' : '-'}</span>
  }

  const getItemContentSnippet = (item: CMSItem): React.ReactNode => {
    const contentStr = item.content || ''
    
    // Program Pendidikan parser
    if (item.id && item.id.startsWith('prog-')) {
      try {
        const parsed = JSON.parse(contentStr)
        const docs = Array.isArray(parsed.documents) ? parsed.documents.map((d: any) => d.title).join(', ') : '-'
        return (
          <div className="flex flex-col gap-1 text-[10px] text-neutral-300">
            <div><span className="text-polri-goldSoft font-bold">Sasaran:</span> {parsed.audience || '-'}</div>
            <div><span className="text-polri-goldSoft font-bold">Durasi:</span> {parsed.duration || '-'}</div>
            <div><span className="text-polri-goldSoft font-bold">Level:</span> {parsed.level || '-'}</div>
            <div className="truncate max-w-[200px]"><span className="text-polri-goldSoft font-bold">Dokumen:</span> {docs}</div>
          </div>
        )
      } catch (e) {}
    }
    
    // Pejabat parser (p-5)
    if (item.id === 'p-5') {
      const lines = contentStr.split('\n')
      const list: any[] = []
      let currentGroup = 'UNSUR PIMPINAN'
      let currentItem: any = null
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        if (trimmed.toUpperCase().startsWith('KELOMPOK:')) {
          currentGroup = trimmed.substring(9).trim()
          continue
        }
        if (trimmed.toUpperCase().startsWith('NAMA:')) {
          currentItem = { group: currentGroup, name: trimmed.substring(5).trim(), pangkat: '', jabatan: '' }
          list.push(currentItem)
          continue
        }
        if (currentItem) {
          if (trimmed.toUpperCase().startsWith('PANGKAT:')) currentItem.pangkat = trimmed.substring(8).trim()
          if (trimmed.toUpperCase().startsWith('JABATAN:')) currentItem.jabatan = trimmed.substring(8).trim()
        }
      }
      return (
        <div className="flex flex-col gap-1 text-[10px] text-neutral-300 max-h-[120px] overflow-y-auto pr-1">
          {list.slice(0, 4).map((p, i) => (
            <div key={i} className="flex items-center gap-1.5 leading-tight">
              <span className="bg-neutral-900 border border-neutral-800 text-polri-goldSoft px-1.5 py-0.5 rounded text-[8px] font-black uppercase shrink-0">{p.group}</span>
              <span className="text-white font-bold truncate max-w-[120px]">{p.name}</span>
              <span className="text-neutral-400">({p.jabatan})</span>
            </div>
          ))}
          {list.length > 4 && <span className="text-neutral-500 italic text-[9px]">+ {list.length - 4} pejabat lainnya...</span>}
        </div>
      )
    }

    // Fasilitas parser (p-6)
    if (item.id === 'p-6') {
      const lines = contentStr.split('\n')
      const list: any[] = []
      let currentGroup = 'RUANG KELAS'
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        if (trimmed.toUpperCase().startsWith('KELOMPOK:')) {
          currentGroup = trimmed.substring(9).trim()
          continue
        }
        if (trimmed.toUpperCase().startsWith('NAMA:')) {
          list.push({ group: currentGroup, name: trimmed.substring(5).trim() })
        }
      }
      return (
        <div className="flex flex-col gap-1 text-[10px] text-neutral-300 max-h-[120px] overflow-y-auto pr-1">
          {list.slice(0, 4).map((f, i) => (
            <div key={i} className="flex items-center gap-1.5 leading-tight">
              <span className="bg-neutral-900 border border-neutral-800 text-polri-goldSoft px-1.5 py-0.5 rounded text-[8px] font-black uppercase shrink-0">{f.group}</span>
              <span className="text-white font-bold truncate max-w-[150px]">{f.name}</span>
            </div>
          ))}
          {list.length > 4 && <span className="text-neutral-500 italic text-[9px]">+ {list.length - 4} fasilitas lainnya...</span>}
        </div>
      )
    }

    // Kontak parser (p-7)
    if (item.id === 'p-7') {
      const lines = contentStr.split('\n')
      const items: any[] = []
      for (const line of lines) {
        const idx = line.indexOf(':')
        if (idx !== -1) {
          items.push({ key: line.substring(0, idx).trim(), val: line.substring(idx + 1).trim() })
        }
      }
      return (
        <div className="flex flex-col gap-1 text-[10px] text-neutral-300">
          {items.map((it, i) => (
            <div key={i} className="flex items-start gap-1 leading-tight">
              <span className="text-polri-goldSoft font-bold shrink-0">{it.key}:</span>
              <span className="text-white truncate max-w-[160px]">{it.val}</span>
            </div>
          ))}
        </div>
      )
    }

    // Redaksi parser (p-8)
    if (item.id === 'p-8') {
      const lines = contentStr.split('\n')
      const items: any[] = []
      for (const line of lines) {
        const idx = line.indexOf(':')
        if (idx !== -1) {
          items.push({ key: line.substring(0, idx).trim(), val: line.substring(idx + 1).trim() })
        }
      }
      return (
        <div className="flex flex-col gap-1 text-[10px] text-neutral-300 max-h-[120px] overflow-y-auto pr-1">
          {items.slice(0, 4).map((it, i) => (
            <div key={i} className="flex items-start gap-1 leading-tight">
              <span className="text-polri-goldSoft font-bold shrink-0">{it.key}:</span>
              <span className="text-white truncate max-w-[150px]">{it.val}</span>
            </div>
          ))}
          {items.length > 4 && <span className="text-neutral-500 italic text-[9px]">+ {items.length - 4} peranan lainnya...</span>}
        </div>
      )
    }

    // General parser (Sejarah, Visi Misi, Tugas Fungsi, Berita, etc.)
    const lines = contentStr.split('\n').filter(l => l.trim()).slice(0, 3)
    return (
      <div className="flex flex-col gap-1 text-[10px] text-neutral-300 font-normal leading-relaxed max-w-[220px]">
        {lines.map((l, i) => {
          const trimmed = l.trim()
          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            return (
              <div key={i} className="flex items-start gap-1 pl-1">
                <span className="text-polri-goldSoft select-none shrink-0">•</span>
                <span className="truncate">{trimmed.substring(1).trim()}</span>
              </div>
            )
          }
          return <p key={i} className="line-clamp-2 truncate">{trimmed}</p>
        })}
      </div>
    )
  }

  const getItemFrontEndRoute = (item: CMSItem) => {
    if (item.id === 'p-1') return '/profil/sejarah'
    if (item.id === 'p-2') return '/profil/visi-misi'
    if (item.id === 'p-3') return '/profil/tugas-fungsi'
    if (item.id === 'p-4') return '/profil/struktur-organisasi'
    if (item.id === 'p-5') return '/profil/pejabat'
    if (item.id === 'p-6') return '/profil/fasilitas'
    if (item.id === 'p-7') return '/profil/kontak/contact'
    if (item.id === 'p-8') return '/profil/kontak/susunan-redaksi'
    if (item.id && item.id.startsWith('prog-')) {
      const slug = item.id.replace('prog-', '')
      return `/program-pendidikan/${slug}`
    }
    const catLower = (item.category || '').toLowerCase()
    if (catLower.includes('berita') || catLower.includes('kegiatan')) {
      const slug = item.title.toLowerCase().replace(/\s+/g, '-')
      return `/berita/${slug}`
    }
    return '-'
  }

  const renderProfilStructuredFields = (itemId: string) => {
    if (itemId === 'p-5') {
      const groups = [
        'UNSUR PIMPINAN', 'SETLEM', 'JIANBANG', 
        'BIDANG STRATEGI', 'BIDANG MANAJEMEN', 'BIDANG HUKUM & PERUNDANG-UNDANGAN (KUMDANG)',
        'BIDANG PENGETAHUAN SOCIAL (PENGSOS)', 'BIDANG PROFESI DAN TEKNOLOGI (PROFTEK)', 
        'BIDANG PEMBINAAN TENAGA PENDIDIK (BIDBINGADIK)', 'PARA KEPALA SEKOLAH'
      ]
      return (
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Pejabat Utama</p>
            <button
              type="button"
              onClick={() => setFormPejabatItems([...formPejabatItems, { group: 'UNSUR PIMPINAN', name: '', pangkat: '', jabatan: '', foto: '' }])}
              className="px-2 py-1 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
            >
              + Tambah Pejabat
            </button>
          </div>
          <div className="space-y-4">
            {formPejabatItems.map((item, idx) => (
              <div key={idx} className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 space-y-2 relative">
                <button
                  type="button"
                  onClick={() => setFormPejabatItems(formPejabatItems.filter((_, i) => i !== idx))}
                  className="absolute right-2 top-2 text-red-500 hover:text-red-400 font-bold text-xs"
                >
                  Hapus
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kelompok / Divisi</label>
                    <select
                      value={item.group}
                      onChange={(e) => {
                        const updated = [...formPejabatItems]
                        updated[idx].group = e.target.value
                        setFormPejabatItems(updated)
                      }}
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                    >
                      {groups.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama Pejabat (Lengkap)</label>
                    <input
                      type="text"
                      required
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...formPejabatItems]
                        updated[idx].name = e.target.value
                        setFormPejabatItems(updated)
                      }}
                      placeholder="Irjen Pol Eko..."
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[8px] uppercase text-neutral-500 font-bold">Pangkat</label>
                    <input
                      type="text"
                      value={item.pangkat}
                      onChange={(e) => {
                        const updated = [...formPejabatItems]
                        updated[idx].pangkat = e.target.value
                        setFormPejabatItems(updated)
                      }}
                      placeholder="Irjen Pol"
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase text-neutral-500 font-bold">Jabatan</label>
                    <input
                      type="text"
                      value={item.jabatan}
                      onChange={(e) => {
                        const updated = [...formPejabatItems]
                        updated[idx].jabatan = e.target.value
                        setFormPejabatItems(updated)
                      }}
                      placeholder="Kasespim"
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase text-neutral-500 font-bold">Foto URL</label>
                    <input
                      type="text"
                      value={item.foto}
                      onChange={(e) => {
                        const updated = [...formPejabatItems]
                        updated[idx].foto = e.target.value
                        setFormPejabatItems(updated)
                      }}
                      placeholder="/images/kasespim.png"
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (itemId === 'p-6') {
      const groups = ['INFORMASI FASILITAS PENDIDIKAN', 'RUANG KELAS', 'ASRAMA', 'PENDUKUNG AKADEMIK', 'FASILITAS UMUM']
      return (
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Fasilitas Sespim</p>
            <button
              type="button"
              onClick={() => setFormFasilitasItems([...formFasilitasItems, { group: 'RUANG KELAS', name: '', keterangan: '', foto: '' }])}
              className="px-2 py-1 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
            >
              + Tambah Fasilitas
            </button>
          </div>
          <div className="space-y-4">
            {formFasilitasItems.map((item, idx) => (
              <div key={idx} className="p-3 bg-neutral-950 rounded-xl border border-neutral-850 space-y-2 relative">
                <button
                  type="button"
                  onClick={() => setFormFasilitasItems(formFasilitasItems.filter((_, i) => i !== idx))}
                  className="absolute right-2 top-2 text-red-500 hover:text-red-400 font-bold text-xs"
                >
                  Hapus
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kelompok / Kategori</label>
                    <select
                      value={item.group}
                      onChange={(e) => {
                        const updated = [...formFasilitasItems]
                        updated[idx].group = e.target.value
                        setFormFasilitasItems(updated)
                      }}
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                    >
                      {groups.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama Fasilitas</label>
                    <input
                      type="text"
                      required
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...formFasilitasItems]
                        updated[idx].name = e.target.value
                        setFormFasilitasItems(updated)
                      }}
                      placeholder="Gedung Kuliah..."
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Keterangan / Deskripsi</label>
                  <input
                    type="text"
                    value={item.keterangan}
                    onChange={(e) => {
                      const updated = [...formFasilitasItems]
                      updated[idx].keterangan = e.target.value
                      setFormFasilitasItems(updated)
                    }}
                    placeholder="Deskripsi fasilitas..."
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Foto URL</label>
                  <input
                    type="text"
                    value={item.foto}
                    onChange={(e) => {
                      const updated = [...formFasilitasItems]
                      updated[idx].foto = e.target.value
                      setFormFasilitasItems(updated)
                    }}
                    placeholder="/images/fasilitas.png"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (itemId === 'p-7') {
      return (
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
          <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Detail Kontak Resmi</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] uppercase text-neutral-400 font-bold">Nama Agen Chatbot</label>
              <input
                type="text"
                value={formContactChatbotName}
                onChange={(e) => setFormContactChatbotName(e.target.value)}
                placeholder="Agen Wira"
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase text-neutral-400 font-bold">WhatsApp Chatbot URL</label>
              <input
                type="text"
                value={formContactChatbotUrl}
                onChange={(e) => setFormContactChatbotUrl(e.target.value)}
                placeholder="https://wa.me/..."
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
          </div>
          <div>
            <label className="block text-[9px] uppercase text-neutral-400 font-bold">Alamat Resmi</label>
            <textarea
              value={formContactAlamat}
              onChange={(e) => setFormContactAlamat(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] uppercase text-neutral-400 font-bold">Nomor Kontak Resmi</label>
              <input
                type="text"
                value={formContactTelepon}
                onChange={(e) => setFormContactTelepon(e.target.value)}
                placeholder="+62 ..."
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
            <div>
              <label className="block text-[9px] uppercase text-neutral-400 font-bold">Email Resmi</label>
              <input
                type="email"
                value={formContactEmail}
                onChange={(e) => setFormContactEmail(e.target.value)}
                placeholder="info@..."
                className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
          </div>
        </div>
      )
    }

    if (itemId === 'p-8') {
      const redaksiRoles = [
        { label: 'Penanggung Jawab', state: formRedaksiPenanggungJawab, setter: setFormRedaksiPenanggungJawab },
        { label: 'Pengarah', state: formRedaksiPengarah, setter: setFormRedaksiPengarah },
        { label: 'Pemimpin Redaksi', state: formRedaksiPemimpinRedaksi, setter: setFormRedaksiPemimpinRedaksi },
        { label: 'Editor', state: formRedaksiEditor, setter: setFormRedaksiEditor },
        { label: 'Admin Teknis', state: formRedaksiAdminTeknis, setter: setFormRedaksiAdminTeknis },
        { label: 'Reviewer', state: formRedaksiReviewer, setter: setFormRedaksiReviewer },
        { label: 'Kontributor Sespimti', state: formRedaksiKontributorSespimti, setter: setFormRedaksiKontributorSespimti },
        { label: 'Kontributor Sespimmen', state: formRedaksiKontributorSespimmen, setter: setFormRedaksiKontributorSespimmen },
        { label: 'Kontributor SPPK', state: formRedaksiKontributorSppk, setter: setFormRedaksiKontributorSppk },
        { label: 'Kontributor Sespimma', state: formRedaksiKontributorSespimma, setter: setFormRedaksiKontributorSespimma },
        { label: 'Kontributor Bidang', state: formRedaksiKontributorBidang, setter: setFormRedaksiKontributorBidang },
        { label: 'Kontributor Jianbang', state: formRedaksiKontributorJianbang, setter: setFormRedaksiKontributorJianbang },
        { label: 'Kontributor Setlem', state: formRedaksiKontributorSetlem, setter: setFormRedaksiKontributorSetlem },
        { label: 'Kontributor Widyaiswara', state: formRedaksiKontributorWidyaiswara, setter: setFormRedaksiKontributorWidyaiswara }
      ]
      return (
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
          <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Susunan Redaksi Website</p>
          <div className="grid grid-cols-2 gap-3">
            {redaksiRoles.map((role) => (
              <div key={role.label}>
                <label className="block text-[9px] uppercase text-neutral-400 font-bold">{role.label}</label>
                <input
                  type="text"
                  value={role.state}
                  onChange={(e) => role.setter(e.target.value)}
                  placeholder={`Nama ${role.label}...`}
                  className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                />
              </div>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

  // Actions
  const handleOpenCreate = () => {
    setFormTitle('')
    setFormCategory('')
    setFormStatus('Published')
    setFormImageUrl('')
    setFormContent('')
    setFormProgSlug('')
    setFormProgAudience('')
    setFormProgDuration('')
    setFormProgLevel('')
    setFormProgFocusTitle('')
    setFormProgOutcomesTitle('')
    setFormProgStagesTitle('')
    setFormProgStatusTitle('')
    setFormProgStatusDescription('')
    setFormProgOverview('')
    setFormProgFocusAreas('')
    setFormProgOutcomes('')
    setFormProgStages('')
    setFormProgDocuments('')
    setFormPejabatItems([{ group: 'UNSUR PIMPINAN', name: '', pangkat: '', jabatan: '', foto: '' }])
    setFormFasilitasItems([{ group: 'RUANG KELAS', name: '', keterangan: '', foto: '' }])
    setFormContactChatbotName('')
    setFormContactChatbotUrl('')
    setFormContactAlamat('')
    setFormContactTelepon('')
    setFormContactEmail('')
    setFormRedaksiPenanggungJawab('')
    setFormRedaksiPengarah('')
    setFormRedaksiPemimpinRedaksi('')
    setFormRedaksiEditor('')
    setFormRedaksiAdminTeknis('')
    setFormRedaksiKontributorSespimti('')
    setFormRedaksiKontributorSespimmen('')
    setFormRedaksiKontributorSppk('')
    setFormRedaksiKontributorSespimma('')
    setFormRedaksiKontributorBidang('')
    setFormRedaksiKontributorJianbang('')
    setFormRedaksiKontributorSetlem('')
    setFormRedaksiKontributorWidyaiswara('')
    setFormRedaksiReviewer('')
    setIsCreateModalOpen(true)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const contentType = MODULE_TO_CONTENT_TYPE[currentModule]
    const dateStr = new Date().toISOString().split('T')[0]
    const authorName = user?.name || 'Admin'

    const slugVal = formProgSlug || formTitle.toLowerCase().replace(/\s+/g, '-')
    const isProg = currentModule === 'Program Pendidikan' && formCategory === 'program-sekolah'
    const finalId = isProg ? `prog-${slugVal}` : undefined
    const isProfilStructured = currentModule === 'Profil' && ['p-5', 'p-6', 'p-7', 'p-8'].includes(finalId || '')
    const finalContent = isProg 
      ? buildProgramContent(formTitle) 
      : (isProfilStructured ? buildProfilContent(finalId || '') : formContent)

    const body = {
      id: finalId,
      title: formTitle,
      category: formCategory || 'General',
      date: dateStr,
      status: formStatus,
      author: authorName,
      image_url: formImageUrl,
      content: finalContent
    }

    try {
      const res = await apiFetch(`/api/${contentType}`, {
        method: 'POST',
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success') {
          await loadItems(currentModule)
          setIsCreateModalOpen(false)
          return
        }
      }
    } catch (err) {
      console.warn(`Failed to create item via API, falling back to local state updates:`, err)
    }

    // Fallback local update
    const newItem: CMSItem = {
      id: finalId || `mock-${Date.now()}`,
      title: formTitle,
      category: formCategory || 'General',
      date: dateStr,
      status: formStatus,
      author: authorName,
      image_url: formImageUrl,
      content: finalContent
    }
    setItems([newItem, ...items])
    setLoading(false)
    setIsCreateModalOpen(false)
  }

  const handleOpenEdit = (item: CMSItem) => {
    setSelectedItem(item)
    setFormTitle(item.title)
    setFormCategory(item.category)
    setFormStatus(item.status)
    setFormImageUrl(item.image_url || '')
    setFormContent(item.content || '')

    if (currentModule === 'Program Pendidikan' && isProgramSchool(item.category, item.id)) {
      parseProgramContent(item.content || '', item.title)
    } else {
      setFormProgSlug('')
      setFormProgAudience('')
      setFormProgDuration('')
      setFormProgLevel('')
      setFormProgFocusTitle('')
      setFormProgOutcomesTitle('')
      setFormProgStagesTitle('')
      setFormProgStatusTitle('')
      setFormProgStatusDescription('')
      setFormProgOverview('')
      setFormProgFocusAreas('')
      setFormProgOutcomes('')
      setFormProgStages('')
      setFormProgDocuments('')
    }

    if (currentModule === 'Profil' && ['p-5', 'p-6', 'p-7', 'p-8'].includes(item.id)) {
      parseProfilContent(item.id, item.content || '')
    } else {
      setFormPejabatItems([{ group: 'UNSUR PIMPINAN', name: '', pangkat: '', jabatan: '', foto: '' }])
      setFormFasilitasItems([{ group: 'RUANG KELAS', name: '', keterangan: '', foto: '' }])
      setFormContactChatbotName('')
      setFormContactChatbotUrl('')
      setFormContactAlamat('')
      setFormContactTelepon('')
      setFormContactEmail('')
      setFormRedaksiPenanggungJawab('')
      setFormRedaksiPengarah('')
      setFormRedaksiPemimpinRedaksi('')
      setFormRedaksiEditor('')
      setFormRedaksiAdminTeknis('')
      setFormRedaksiKontributorSespimti('')
      setFormRedaksiKontributorSespimmen('')
      setFormRedaksiKontributorSppk('')
      setFormRedaksiKontributorSespimma('')
      setFormRedaksiKontributorBidang('')
      setFormRedaksiKontributorJianbang('')
      setFormRedaksiKontributorSetlem('')
      setFormRedaksiKontributorWidyaiswara('')
      setFormRedaksiReviewer('')
    }
    setIsEditModalOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem) return
    setLoading(true)
    const contentType = MODULE_TO_CONTENT_TYPE[currentModule]
    const authorName = selectedItem.author || user?.name || 'Admin'

    const isProg = currentModule === 'Program Pendidikan' && isProgramSchool(formCategory, selectedItem.id)
    const isProfilStructured = currentModule === 'Profil' && ['p-5', 'p-6', 'p-7', 'p-8'].includes(selectedItem.id)
    const finalContent = isProg 
      ? buildProgramContent(formTitle) 
      : (isProfilStructured ? buildProfilContent(selectedItem.id) : formContent)

    const body = {
      title: formTitle,
      category: formCategory,
      status: formStatus,
      date: selectedItem.date,
      author: authorName,
      image_url: formImageUrl,
      content: finalContent
    }

    try {
      const res = await apiFetch(`/api/${contentType}/${selectedItem.id}`, {
        method: 'PUT',
        body: JSON.stringify(body)
      })
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success') {
          await loadItems(currentModule)
          setIsEditModalOpen(false)
          setSelectedItem(null)
          return
        }
      }
    } catch (err) {
      console.warn(`Failed to update item via API, falling back to local state updates:`, err)
    }

    // Fallback local update
    const updated = items.map((item) => 
      item.id === selectedItem.id 
        ? { ...item, title: formTitle, category: formCategory, status: formStatus, image_url: formImageUrl, content: formContent }
        : item
    )
    setItems(updated)
    setLoading(false)
    setIsEditModalOpen(false)
    setSelectedItem(null)
  }

  const handleOpenDelete = (item: CMSItem) => {
    setSelectedItem(item)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedItem) return
    setLoading(true)
    const contentType = MODULE_TO_CONTENT_TYPE[currentModule]

    try {
      const res = await apiFetch(`/api/${contentType}/${selectedItem.id}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        const json = await res.json()
        if (json.status === 'success') {
          await loadItems(currentModule)
          setIsDeleteModalOpen(false)
          setSelectedItem(null)
          return
        }
      }
    } catch (err) {
      console.warn(`Failed to delete item via API, falling back to local state updates:`, err)
    }

    // Fallback local update
    setItems(items.filter((item) => item.id !== selectedItem.id))
    setLoading(false)
    setIsDeleteModalOpen(false)
    setSelectedItem(null)
  }

  const handleOpenView = (item: CMSItem) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  // Filter & Search Logic
  const filteredItems = items.filter((item) => {

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' ? true : item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getRoleBadgeColor = (r: RoleType) => {
    switch (r) {
      case 'super_admin': return 'bg-emerald-100 text-emerald-800 border-emerald-300'
      case 'admin': return 'bg-blue-100 text-blue-800 border-blue-300'
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-300'
    }
  }

  const getRoleTitleLabel = (r: RoleType) => {
    switch (r) {
      case 'super_admin': return 'Super Admin (CRUD)'
      case 'admin': return 'Admin Staf (CRU)'
      default: return 'Akses Umum (Read Only)'
    }
  }

  return (
    <div className="bg-neutral-900 min-h-screen text-neutral-100 flex flex-col lg:flex-row font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-80 bg-neutral-950 border-r border-neutral-800 shrink-0 flex flex-col justify-between">
        <div>
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src="/images/logo-sespim.png"
                alt="Logo Sespim"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-polri-goldSoft">SESPIM POLRI</h1>
              <p className="text-[10px] text-neutral-400">Content Management System</p>
            </div>
          </div>

          {/* Active Role Card */}
          <div className="p-5 border-b border-neutral-800 bg-neutral-900/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Izin Akses Aktif</p>
            <div className="mt-2 flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-polri-goldSoft shrink-0" />
              <div>
                <p className="text-xs font-black text-white">{getRoleTitleLabel(activeRole)}</p>
                <p className="text-[10px] text-neutral-400 font-semibold mt-0.5">Akun: {user ? user.name : 'Memuat...'}</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)]">
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500 mb-2 block">Daftar Modul Konten</p>
            {sidebarItems.map((item) => {
              if (item.type === 'link') {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderIcon className="h-4 w-4 shrink-0 text-polri-goldSoft" />
                      {item.label}
                    </div>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 shrink-0 opacity-60">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )
              }

              const active = currentSidebarLabel === item.label
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setCurrentModule(item.moduleName as string)
                    setCurrentSidebarLabel(item.label)
                  }}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide transition ${
                    active 
                      ? 'bg-polri-maroon text-white border border-polri-gold/20 shadow-md' 
                      : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  }`}
                >
                  <FolderIcon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900 py-2.5 text-xs font-bold text-neutral-400 hover:text-white transition"
          >
            <HomeIcon className="h-4 w-4" />
            Kembali ke Portal
          </Link>
          <button
            onClick={() => router.push('/login')}
            type="button"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-neutral-900 hover:bg-polri-maroon py-2.5 text-xs font-bold text-neutral-400 hover:text-white transition"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Ganti Akun / Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-neutral-900">
        {/* TOP BAR */}
        <header className="h-16 border-b border-neutral-800 bg-neutral-950 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-polri-goldSoft">Dasbor CMS &bull; {currentSidebarLabel}</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 text-[10px] font-black uppercase rounded-full border ${getRoleBadgeColor(activeRole)}`}>
              {activeRole}
            </span>
          </div>
        </header>

        {/* ROLE ALERTS */}
        {activeRole === 'stakeholder' && (
          <div className="bg-amber-950/40 border-b border-amber-900/60 px-6 py-3 text-xs text-amber-300 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-amber-500" />
            <span>
              <strong>Akses Umum (Read Only) Aktif:</strong> Sebagai pengunjung umum tanpa login, Anda hanya dapat mengakses menu yang diizinkan untuk melihat konten. Tombol tambah, edit, dan hapus dinonaktifkan.
            </span>
          </div>
        )}
        {activeRole === 'admin' && (
          <div className="bg-blue-950/40 border-b border-blue-900/60 px-6 py-3 text-xs text-blue-300 flex items-center gap-2">
            <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-blue-500" />
            <span>
              <strong>Mode Admin (CRU) Aktif:</strong> Anda memiliki izin untuk membuat (Create) dan memperbarui (Update) data. Aksi hapus data dibatasi hanya untuk Super Admin.
            </span>
          </div>
        )}
        {activeRole === 'super_admin' && (
          <div className="bg-emerald-950/30 border-b border-emerald-900/40 px-6 py-3 text-xs text-emerald-300 flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 shrink-0 text-emerald-500" />
            <span>
              <strong>Akses Penuh Super Admin (CRUD) Aktif:</strong> Anda memiliki hak akses penuh untuk melakukan operasi Create, Read, Update, dan Delete di seluruh modul website.
            </span>
          </div>
        )}

        {/* PAGE CONTENT CONTAINER */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Header Title Section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-black text-white">{currentSidebarLabel}</h3>
              <p className="text-xs text-neutral-400 mt-1">Kelola dan atur konfigurasi data konten dinamis untuk modul ini.</p>
            </div>
            {hasWriteAccess && currentModule !== 'Profil' && (
              <button
                onClick={handleOpenCreate}
                type="button"
                className="inline-flex items-center gap-2 bg-polri-maroon hover:bg-polri-brownDark text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition"
              >
                <PlusIcon className="h-4.5 w-4.5" />
                Tambah Konten
              </button>
            )}
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <MagnifyingGlassIcon className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berdasarkan judul atau kategori..."
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-500"
              />
            </div>
            
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-neutral-400">Filter Status:</span>
              <div className="flex bg-neutral-900 rounded-xl p-0.5 border border-neutral-800">
                {(['All', 'Published', 'Draft'] as const).map((filter) => {
                  const active = statusFilter === filter
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        active 
                          ? 'bg-neutral-800 text-polri-goldSoft shadow-sm' 
                          : 'text-neutral-500 hover:text-neutral-300'
                      }`}
                    >
                      {filter}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">Gambar</th>
                    <th className="px-6 py-4">Judul</th>
                    <th className="px-6 py-4">Keterangan</th>
                    <th className="px-6 py-4">Isi Konten</th>
                    <th className="px-6 py-4">Elemen Front-End</th>
                    <th className="px-6 py-4">Tautan URL</th>
                    <th className="px-6 py-4">Tanggal / Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-semibold">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-900/30 transition">
                        {/* 1. Gambar Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-14 h-10 object-cover rounded-lg border border-neutral-800 shadow"
                            />
                          ) : (
                            <span className="text-[9px] text-neutral-500 font-black uppercase tracking-wider bg-neutral-900 border border-neutral-850 px-2.5 py-1.5 rounded-lg">
                              No Image
                            </span>
                          )}
                        </td>

                        {/* 2. Judul Column */}
                        <td className="px-6 py-4 font-bold text-white max-w-[160px] truncate" title={item.title}>
                          {item.title}
                        </td>

                        {/* 3. Keterangan Column */}
                        <td className="px-6 py-4 text-neutral-300 max-w-[180px] font-normal">
                          {getItemDescription(item)}
                        </td>

                        {/* 4. Isi Konten Column */}
                        <td className="px-6 py-4 text-neutral-400 max-w-[220px] font-normal">
                          {getItemContentSnippet(item)}
                        </td>

                        {/* 5. Elemen Front-End Route Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-neutral-900 text-polri-goldSoft px-2.5 py-1 rounded-lg border border-neutral-800 text-[10px] font-mono select-all">
                            {getItemFrontEndRoute(item)}
                          </span>
                        </td>

                        {/* 6. Tautan URL Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getItemFrontEndRoute(item) !== '-' ? (
                            <a
                              href={getItemFrontEndRoute(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-polri-gold/45 text-polri-goldSoft hover:text-white transition text-[10px] font-bold"
                            >
                              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                              Buka Link
                            </a>
                          ) : (
                            <span className="text-neutral-500 italic text-[10px]">-</span>
                          )}
                        </td>

                        {/* 7. Tanggal / Status Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] text-neutral-500 font-bold">{item.date}</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase max-w-max ${
                              item.status === 'Published' 
                                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/30' 
                                : 'bg-amber-950/60 text-amber-400 border border-amber-900/30'
                            }`}>
                              <span className={`h-1 w-1 rounded-full ${item.status === 'Published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                              {item.status}
                            </span>
                          </div>
                        </td>

                        {/* 7. Aksi Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* View button */}
                            <button
                              onClick={() => handleOpenView(item)}
                              type="button"
                              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition border border-neutral-800"
                              title="Lihat Detail Konten"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>

                            {/* Edit Button */}
                            {hasWriteAccess && (
                              <button
                                onClick={() => handleOpenEdit(item)}
                                type="button"
                                className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-polri-goldSoft hover:text-white transition border border-neutral-800 hover:border-polri-gold/45"
                                title="Edit Konten"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </button>
                            )}

                            {/* Delete Button */}
                            {hasDeleteAccess ? (
                              <button
                                onClick={() => handleOpenDelete(item)}
                                type="button"
                                className="p-2 rounded-lg bg-neutral-900 hover:bg-polri-maroon/20 text-polri-red hover:text-white transition border border-neutral-800 hover:border-polri-red/45"
                                title="Hapus Konten"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            ) : hasWriteAccess && (
                              <button
                                disabled
                                type="button"
                                className="p-2 rounded-lg bg-neutral-900 text-neutral-700 border border-neutral-800 cursor-not-allowed"
                                title="Aksi Hapus Dibatasi Hanya untuk Super Admin"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-10 text-center text-neutral-500 font-bold">
                        {loading ? (
                          <div className="flex flex-col items-center justify-center gap-3">
                            <svg className="animate-spin h-6 w-6 text-polri-goldSoft" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span className="text-neutral-400 text-xs">Menghubungkan ke database & memuat data...</span>
                          </div>
                        ) : (
                          'Belum ada data konten untuk pencarian/filter ini.'
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp text-neutral-200">
            <div className="bg-neutral-950 p-5 border-b border-neutral-800 flex justify-between items-center">
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Tambah Konten Baru</h4>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-neutral-500 hover:text-white font-bold">&times;</button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Judul Konten</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Masukkan judul konten..."
                  className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Sub-Kategori</label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  placeholder="Contoh: Sejarah Sespim, Kurikulum, dll."
                  className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Status Publikasi</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                  className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">URL Foto / Gambar</label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="Contoh: /images/kasespim.png atau link gambar..."
                  className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600"
                />
              </div>

              {currentModule === 'Program Pendidikan' && formCategory === 'program-sekolah' ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3">
                  <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Detail Program Pendidikan (Structured)</p>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Slug Halaman (e.g. sespimma, leadership-camp)</label>
                    <input
                      type="text"
                      required
                      value={formProgSlug}
                      onChange={(e) => setFormProgSlug(e.target.value)}
                      placeholder="sespimma"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Sasaran Peserta</label>
                    <input
                      type="text"
                      value={formProgAudience}
                      onChange={(e) => setFormProgAudience(e.target.value)}
                      placeholder="e.g. Perwira siswa Sespimma"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Durasi Pendidikan</label>
                    <input
                      type="text"
                      value={formProgDuration}
                      onChange={(e) => setFormProgDuration(e.target.value)}
                      placeholder="e.g. Menyesuaikan kalender pendidikan"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Tingkat / Level Kepemimpinan</label>
                    <input
                      type="text"
                      value={formProgLevel}
                      onChange={(e) => setFormProgLevel(e.target.value)}
                      placeholder="e.g. Kepemimpinan tingkat pertama"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Judul Blok Fokus (Opsional)</label>
                    <input
                      type="text"
                      value={formProgFocusTitle}
                      onChange={(e) => setFormProgFocusTitle(e.target.value)}
                      placeholder="e.g. Tugas Sespimma"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Judul Blok Capaian (Opsional)</label>
                    <input
                      type="text"
                      value={formProgOutcomesTitle}
                      onChange={(e) => setFormProgOutcomesTitle(e.target.value)}
                      placeholder="e.g. Ruang Tanggung Jawab"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Judul Blok Tahapan (Opsional)</label>
                    <input
                      type="text"
                      value={formProgStagesTitle}
                      onChange={(e) => setFormProgStagesTitle(e.target.value)}
                      placeholder="e.g. Fungsi Sespimma"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Judul Status / Badge (Opsional)</label>
                    <input
                      type="text"
                      value={formProgStatusTitle}
                      onChange={(e) => setFormProgStatusTitle(e.target.value)}
                      placeholder="e.g. Unsur Pelaksana Utama"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Deskripsi Status (Opsional)</label>
                    <textarea
                      value={formProgStatusDescription}
                      onChange={(e) => setFormProgStatusDescription(e.target.value)}
                      placeholder="Deskripsi status program..."
                      rows={2}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Gambaran Program (Pisahkan dengan 2 baris baru)</label>
                    <textarea
                      value={formProgOverview}
                      onChange={(e) => setFormProgOverview(e.target.value)}
                      placeholder="Paragraf 1&#10;&#10;Paragraf 2..."
                      rows={4}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Fokus Pembelajaran (Satu baris per item)</label>
                    <textarea
                      value={formProgFocusAreas}
                      onChange={(e) => setFormProgFocusAreas(e.target.value)}
                      placeholder="Fokus 1&#10;Fokus 2..."
                      rows={3}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Capaian Program (Satu baris per item)</label>
                    <textarea
                      value={formProgOutcomes}
                      onChange={(e) => setFormProgOutcomes(e.target.value)}
                      placeholder="Capaian 1&#10;Capaian 2..."
                      rows={3}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Tahapan Pendidikan (Format: Judul Tahap: Deskripsi, satu per baris)</label>
                    <textarea
                      value={formProgStages}
                      onChange={(e) => setFormProgStages(e.target.value)}
                      placeholder="Rencana pendidikan: Menyusun rencana pendidikan...&#10;Tahap Kedua: Melaksanakan koordinasi..."
                      rows={4}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Dokumen Terkait (Format: Nama Dokumen: /url/link, satu per baris)</label>
                    <textarea
                      value={formProgDocuments}
                      onChange={(e) => setFormProgDocuments(e.target.value)}
                      placeholder="Kalender Pendidikan: /program-pendidikan/kalender-pendidikan&#10;Pedoman Akademik: /program-pendidikan/pedoman-akademik"
                      rows={3}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>
              ) : currentModule === 'Profil' && ['p-5', 'p-6', 'p-7', 'p-8'].includes(formCategory) ? (
                renderProfilStructuredFields(formCategory)
              ) : (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Isi Konten (News / Detail)</label>
                  <textarea
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Tuliskan detail konten / teks artikel..."
                    rows={4}
                    className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600 resize-none"
                  />
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 rounded-xl bg-neutral-850 py-3 text-xs font-bold text-neutral-400 hover:bg-neutral-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-polri-maroon hover:bg-polri-brownDark py-3 text-xs font-bold text-white transition"
                >
                  Simpan Konten
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp text-neutral-200">
            <div className="bg-neutral-950 p-5 border-b border-neutral-800 flex justify-between items-center">
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Perbarui Konten</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-neutral-500 hover:text-white font-bold">&times;</button>
            </div>
            <form onSubmit={handleEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Judul Konten</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Sub-Kategori</label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Status Publikasi</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as any)}
                  className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold"
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">URL Foto / Gambar</label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="/images/kasespim.png"
                  className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold"
                />
              </div>

              {currentModule === 'Program Pendidikan' && isProgramSchool(formCategory, selectedItem?.id) ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3">
                  <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Detail Program Pendidikan (Structured)</p>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Slug Halaman (e.g. sespimma, leadership-camp)</label>
                    <input
                      type="text"
                      required
                      value={formProgSlug}
                      onChange={(e) => setFormProgSlug(e.target.value)}
                      placeholder="sespimma"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Sasaran Peserta</label>
                    <input
                      type="text"
                      value={formProgAudience}
                      onChange={(e) => setFormProgAudience(e.target.value)}
                      placeholder="e.g. Perwira siswa Sespimma"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Durasi Pendidikan</label>
                    <input
                      type="text"
                      value={formProgDuration}
                      onChange={(e) => setFormProgDuration(e.target.value)}
                      placeholder="e.g. Menyesuaikan kalender pendidikan"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Tingkat / Level Kepemimpinan</label>
                    <input
                      type="text"
                      value={formProgLevel}
                      onChange={(e) => setFormProgLevel(e.target.value)}
                      placeholder="e.g. Kepemimpinan tingkat pertama"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Judul Blok Fokus (Opsional)</label>
                    <input
                      type="text"
                      value={formProgFocusTitle}
                      onChange={(e) => setFormProgFocusTitle(e.target.value)}
                      placeholder="e.g. Tugas Sespimma"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Judul Blok Capaian (Opsional)</label>
                    <input
                      type="text"
                      value={formProgOutcomesTitle}
                      onChange={(e) => setFormProgOutcomesTitle(e.target.value)}
                      placeholder="e.g. Ruang Tanggung Jawab"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Judul Blok Tahapan (Opsional)</label>
                    <input
                      type="text"
                      value={formProgStagesTitle}
                      onChange={(e) => setFormProgStagesTitle(e.target.value)}
                      placeholder="e.g. Fungsi Sespimma"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Judul Status / Badge (Opsional)</label>
                    <input
                      type="text"
                      value={formProgStatusTitle}
                      onChange={(e) => setFormProgStatusTitle(e.target.value)}
                      placeholder="e.g. Unsur Pelaksana Utama"
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Deskripsi Status (Opsional)</label>
                    <textarea
                      value={formProgStatusDescription}
                      onChange={(e) => setFormProgStatusDescription(e.target.value)}
                      placeholder="Deskripsi status program..."
                      rows={2}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Gambaran Program (Pisahkan dengan 2 baris baru)</label>
                    <textarea
                      value={formProgOverview}
                      onChange={(e) => setFormProgOverview(e.target.value)}
                      placeholder="Paragraf 1&#10;&#10;Paragraf 2..."
                      rows={4}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Fokus Pembelajaran (Satu baris per item)</label>
                    <textarea
                      value={formProgFocusAreas}
                      onChange={(e) => setFormProgFocusAreas(e.target.value)}
                      placeholder="Fokus 1&#10;Fokus 2..."
                      rows={3}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Capaian Program (Satu baris per item)</label>
                    <textarea
                      value={formProgOutcomes}
                      onChange={(e) => setFormProgOutcomes(e.target.value)}
                      placeholder="Capaian 1&#10;Capaian 2..."
                      rows={3}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Tahapan Pendidikan (Format: Judul Tahap: Deskripsi, satu per baris)</label>
                    <textarea
                      value={formProgStages}
                      onChange={(e) => setFormProgStages(e.target.value)}
                      placeholder="Rencana pendidikan: Menyusun rencana pendidikan...&#10;Tahap Kedua: Melaksanakan koordinasi..."
                      rows={4}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-neutral-400">Dokumen Terkait (Format: Nama Dokumen: /url/link, satu per baris)</label>
                    <textarea
                      value={formProgDocuments}
                      onChange={(e) => setFormProgDocuments(e.target.value)}
                      placeholder="Kalender Pendidikan: /program-pendidikan/kalender-pendidikan&#10;Pedoman Akademik: /program-pendidikan/pedoman-akademik"
                      rows={3}
                      className="mt-1 w-full rounded-lg bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>
              ) : currentModule === 'Profil' && ['p-5', 'p-6', 'p-7', 'p-8'].includes(selectedItem?.id || '') ? (
                renderProfilStructuredFields(selectedItem?.id || '')
              ) : (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Isi Konten (News / Detail)</label>
                  <textarea
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    rows={4}
                    className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold resize-none"
                  />
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 rounded-xl bg-neutral-850 py-3 text-xs font-bold text-neutral-400 hover:bg-neutral-800 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-polri-maroon hover:bg-polri-brownDark py-3 text-xs font-bold text-white transition"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp text-neutral-200">
            <div className="bg-neutral-950 p-5 border-b border-neutral-800 flex justify-between items-center">
              <h4 className="text-sm font-black uppercase text-polri-red tracking-wider">Konfirmasi Hapus</h4>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-neutral-500 hover:text-white font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-neutral-300 leading-6">
                Apakah Anda yakin ingin menghapus konten berikut? Aksi ini tidak dapat dibatalkan.
              </p>
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                <p className="text-xs font-bold text-white">{selectedItem.title}</p>
                <p className="text-[10px] text-neutral-500 mt-1">Kategori: {selectedItem.category}</p>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 rounded-xl bg-neutral-850 py-3 text-xs font-bold text-neutral-400 hover:bg-neutral-800 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  type="button"
                  className="flex-1 rounded-xl bg-polri-red hover:bg-red-800 py-3 text-xs font-bold text-white transition"
                >
                  Hapus Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {isViewModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp text-neutral-200">
            <div className="bg-neutral-950 p-5 border-b border-neutral-800 flex justify-between items-center">
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Detail Konten</h4>
              <button onClick={() => setIsViewModalOpen(false)} className="text-neutral-500 hover:text-white font-bold">&times;</button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-polri-maroon">Judul Konten</p>
                <p className="text-sm font-black text-white">{selectedItem.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-polri-maroon">Kategori</p>
                  <p className="text-xs font-bold text-neutral-300">{selectedItem.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-polri-maroon">Terakhir Modifikasi</p>
                  <p className="text-xs font-bold text-neutral-300">{selectedItem.date}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-polri-maroon">Status Publikasi</p>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                  selectedItem.status === 'Published' 
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/30' 
                    : 'bg-amber-950/60 text-amber-400 border border-amber-900/30'
                }`}>
                  {selectedItem.status}
                </span>
              </div>

              {selectedItem.image_url && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-polri-maroon">URL Foto</p>
                  <p className="text-xs text-neutral-300 font-mono truncate bg-neutral-950 p-2 rounded-lg border border-neutral-800">{selectedItem.image_url}</p>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-polri-maroon">Isi Konten (News / Detail)</p>
                <div className="text-xs text-neutral-400 leading-6 bg-neutral-950 p-3 rounded-xl border border-neutral-800 max-h-40 overflow-y-auto whitespace-pre-line">
                  {selectedItem.content || 'Konten belum diisi.'}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="w-full rounded-xl bg-neutral-850 hover:bg-neutral-800 py-3 text-xs font-bold text-neutral-300 transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-polri-gold border-t-transparent"></div>
          <p className="text-xs font-bold text-neutral-400">Memuat Dasbor CMS...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
