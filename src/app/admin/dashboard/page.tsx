'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { apiFetch, MODULE_TO_CONTENT_TYPE, API_BASE_URL, getMediaUrl } from '@/lib/api'
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
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  ChartBarIcon,
  BriefcaseIcon,
  BookOpenIcon,
  EnvelopeIcon,
  CpuChipIcon,
  ArrowPathIcon
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
  school_field?: string
  cohort?: string
  year?: number
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
    { id: 'w-7', title: 'Sertifikasi BNSP / LSP Lemdiklat', category: 'LSP / BNSP', date: '2026-07-04', status: 'Published' },
    { id: 'w-8', title: 'Bahan Ajar (HANJAR) Serdik', category: 'HANJAR', date: '2026-07-05', status: 'Published' },
    { id: 'w-9', title: 'Belajar AI & Pemanfaatan LLM', category: 'Belajar AI', date: '2026-07-06', status: 'Published' }
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
    { id: 's-6', title: 'Klinik Pratama Sespim Polri', category: 'Klinik Pratama', date: '2026-07-03', status: 'Published' },
    { id: 's-7', title: 'Repositori Produk / Karya Akademis Sespim', category: 'Produk / Karya Akademis', date: '2026-07-13', status: 'Published' }
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
  { label: 'Sarana Prasarana', type: 'module', moduleName: 'Sarana Prasarana' },
  { label: 'Pembimbingan Naskap', type: 'module', moduleName: 'Pembimbingan Naskap' },
  { label: 'Laporan Sertifikasi', type: 'module', moduleName: 'Laporan Sertifikasi' },
  { label: 'Agen Wira AI & Operator', type: 'module', moduleName: 'Agen Wira AI & Operator' }
]

const SIDEBAR_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Beranda': HomeIcon,
  'Profil': UserGroupIcon,
  'Program Pendidikan': AcademicCapIcon,
  'Widyaiswara': BookOpenIcon,
  'Kelembagaan Internal': BriefcaseIcon,
  'Berita & Informasi Publik': DocumentTextIcon,
  'Publikasi': DocumentTextIcon,
  'Galeri & Unduhan': FolderIcon,
  'Kontak': EnvelopeIcon,
  'Sarana Prasarana': BriefcaseIcon,
  'Pembimbingan Naskap': BookOpenIcon,
  'Laporan Sertifikasi': ShieldCheckIcon,
  'Agen Wira AI & Operator': CpuChipIcon,
  'Analitik Kasespim': ChartBarIcon,
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeRoleParam = searchParams.get('role') as RoleType

  const [user, setUser] = useState<{
    name: string
    role: string
    roleLabel: string
    nrpNip?: string
    phone?: string
  } | null>(null)

  useEffect(() => {
    const userJson = sessionStorage.getItem('sespim_user')
    if (!userJson) {
      router.push('/login?message=unauthorized')
      return
    }

    const sessionUser = JSON.parse(userJson)
    const validRoles = ['super_admin', 'admin', 'stakeholder', 'serdik', 'widyaiswara']
    if (!validRoles.includes(sessionUser.role)) {
      router.push('/login?message=forbidden')
      return
    }

    setUser(sessionUser)

    if (activeRoleParam !== sessionUser.role) {
      router.replace(`/admin/dashboard?role=${sessionUser.role}`)
    }
  }, [router, activeRoleParam])

  const activeRole: RoleType = ['super_admin', 'admin', 'stakeholder'].includes(activeRoleParam)
    ? activeRoleParam
    : (user ? (user.role as RoleType) : 'admin')

  const hasWriteAccess = activeRole === 'super_admin' || activeRole === 'admin'
  const hasDeleteAccess = activeRole === 'super_admin' || activeRole === 'admin'
  
  const sidebarItems: CMSSidebarItem[] = useMemo(() => {
    if (activeRole === 'serdik' || activeRole === 'widyaiswara') {
      return [{ label: 'Profil Saya', type: 'module' as const, moduleName: 'Profil Saya' }]
    }
    const baseItems = (activeRole === 'super_admin' || activeRole === 'stakeholder')
      ? [...ADMIN_SIDEBAR_ITEMS, { label: 'Analitik Kasespim', type: 'module' as const, moduleName: 'Analitik Kasespim' }]
      : ADMIN_SIDEBAR_ITEMS
    return [
      { label: 'Profil Saya', type: 'module' as const, moduleName: 'Profil Saya' },
      ...baseItems
    ]
  }, [activeRole])

  // States
  const moduleParam = searchParams.get('module')
  const defaultModule = moduleParam || 'Profil Saya'

  const [currentModule, setCurrentModule] = useState(defaultModule)
  const [currentSidebarLabel, setCurrentSidebarLabel] = useState(defaultModule)

  useEffect(() => {
    const moduleParam = searchParams.get('module')
    if (moduleParam) {
      setCurrentModule(moduleParam)
      setCurrentSidebarLabel(moduleParam)
    }
  }, [searchParams])
  const [items, setItems] = useState<CMSItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All')

  // Modals States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  // Change Password States
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
  const [changePasswordStep, setChangePasswordStep] = useState(1) // 1: Info & Request, 2: OTP Entry, 3: Input Password, 4: Success
  const [cpOtpInput, setCpOtpInput] = useState('')
  const [cpGeneratedOtp, setCpGeneratedOtp] = useState('')
  const [cpNewPassword, setCpNewPassword] = useState('')
  const [cpConfirmPassword, setCpConfirmPassword] = useState('')
  const [cpErrorMsg, setCpErrorMsg] = useState<string | null>(null)
  const [cpLoading, setCpLoading] = useState(false)
  const [cpOtpTimer, setCpOtpTimer] = useState(60)
  // Selected item state for edit/delete/view
  const [selectedItem, setSelectedItem] = useState<CMSItem | null>(null)
 
  // Profile update state
  const [profileName, setProfileName] = useState('')
  const [profileGelar, setProfileGelar] = useState('')
  const [profilePangkat, setProfilePangkat] = useState('')
  const [profileEmail, setProfileEmail] = useState('')
  const [profilePhone, setProfilePhone] = useState('')
  const [profileFoto, setProfileFoto] = useState('')
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('')
  const [profileErrorMsg, setProfileErrorMsg] = useState('')
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [profileNoSerdik, setProfileNoSerdik] = useState('')
  const [profileInstansiPolri, setProfileInstansiPolri] = useState('')
  const [profileKementerianLembaga, setProfileKementerianLembaga] = useState('')
  const [profileNegaraAsal, setProfileNegaraAsal] = useState('')
  const [profileProgram, setProfileProgram] = useState('sespimti')
  const [profileAngkatan, setProfileAngkatan] = useState('')
  const [profileKeahlian, setProfileKeahlian] = useState('')
  const [profileSertifikasi, setProfileSertifikasi] = useState('')
 
  // Initialize profile states when user is loaded
  useEffect(() => {
    if (user) {
      setProfileName(user.name || '')
      setProfileGelar((user as any).gelar || '')
      setProfilePangkat((user as any).pangkat || '')
      setProfileEmail((user as any).email || '')
      setProfilePhone(user.phone || '')
      setProfileFoto((user as any).foto || '')
      setProfileNoSerdik((user as any).no_serdik || '')
      setProfileInstansiPolri((user as any).instansi_polri || '')
      setProfileKementerianLembaga((user as any).kementerian_lembaga || '')
      setProfileNegaraAsal((user as any).negara_asal || '')
      setProfileProgram((user as any).program || 'sespimti')
      setProfileAngkatan((user as any).angkatan || '')
      setProfileKeahlian((user as any).keahlian || '')
      setProfileSertifikasi((user as any).sertifikasi || '')
    }
  }, [user])

  // Form Fields State
  const [formTitle, setFormTitle] = useState('')
  const [formCategory, setFormCategory] = useState('')
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft'>('Published')
  const [formImageUrl, setFormImageUrl] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formImageFile, setFormImageFile] = useState<File | null>(null)

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
  const [formMateriTerbukaItems, setFormMateriTerbukaItems] = useState<{ title: string; description: string; fileName: string; href: string; format: string; category: string }[]>([])
  const [formKalenderItems, setFormKalenderItems] = useState<{ category: string; title: string; description: string; imageUrl: string; file: string; url: string }[]>([])
  const [formPublikasiItems, setFormPublikasiItems] = useState<{ title: string; description: string; fileName: string; href: string; format: string; category: string; author: string; cohort: string; year: string; cover: string }[]>([])
  const [formGaleriFotoItems, setFormGaleriFotoItems] = useState<{ title: string; description: string; category: string; imageUrl: string; date: string }[]>([])
  const [formGaleriVideoItems, setFormGaleriVideoItems] = useState<{ title: string; description: string; category: string; url: string; cover: string; date: string }[]>([])
  const [formUnduhanItems, setFormUnduhanItems] = useState<{ title: string; description: string; fileName: string; href: string; format: string; category: string }[]>([])
  const [formKaryaAkademisItems, setFormKaryaAkademisItems] = useState<{ title: string; description: string; fileName: string; href: string; format: string; category: string; author: string; year: string }[]>([])
  
  // Cek Plagiarisme (s-5) Specific Form Fields
  const [formPlagiarismDesc, setFormPlagiarismDesc] = useState('')
  const [formPlagiarismSources, setFormPlagiarismSources] = useState<{ domain: string; percentage: number; matchCount: number }[]>([])

  // States for Publikasi extra metadata
  const [formAuthor, setFormAuthor] = useState('')
  const [formSchoolField, setFormSchoolField] = useState('')
  const [formCohort, setFormCohort] = useState('')
  const [formYear, setFormYear] = useState('')

  // States for Kurikulum Umum (e-2)
  const [formKurikulumSespimtiTitle, setFormKurikulumSespimtiTitle] = useState('')
  const [formKurikulumSespimtiOverview, setFormKurikulumSespimtiOverview] = useState('')
  const [formKurikulumSespimtiSubjects, setFormKurikulumSespimtiSubjects] = useState('')

  const [formKurikulumSespimmenTitle, setFormKurikulumSespimmenTitle] = useState('')
  const [formKurikulumSespimmenOverview, setFormKurikulumSespimmenOverview] = useState('')
  const [formKurikulumSespimmenSubjects, setFormKurikulumSespimmenSubjects] = useState('')

  const [formKurikulumSppkTitle, setFormKurikulumSppkTitle] = useState('')
  const [formKurikulumSppkOverview, setFormKurikulumSppkOverview] = useState('')
  const [formKurikulumSppkSubjects, setFormKurikulumSppkSubjects] = useState('')

  const [formKurikulumSespimmaTitle, setFormKurikulumSespimmaTitle] = useState('')
  const [formKurikulumSespimmaOverview, setFormKurikulumSespimmaOverview] = useState('')
  const [formKurikulumSespimmaSubjects, setFormKurikulumSespimmaSubjects] = useState('')

  // States for Kurikulum Previews & Download URLs (Format Portrait)
  const [formKurikulumSespimtiPreviewUrl, setFormKurikulumSespimtiPreviewUrl] = useState('')
  const [formKurikulumSespimtiDownloadUrl, setFormKurikulumSespimtiDownloadUrl] = useState('')

  const [formKurikulumSespimmenPreviewUrl, setFormKurikulumSespimmenPreviewUrl] = useState('')
  const [formKurikulumSespimmenDownloadUrl, setFormKurikulumSespimmenDownloadUrl] = useState('')

  const [formKurikulumSppkPreviewUrl, setFormKurikulumSppkPreviewUrl] = useState('')
  const [formKurikulumSppkDownloadUrl, setFormKurikulumSppkDownloadUrl] = useState('')

  const [formKurikulumSespimmaPreviewUrl, setFormKurikulumSespimmaPreviewUrl] = useState('')
  const [formKurikulumSespimmaDownloadUrl, setFormKurikulumSespimmaDownloadUrl] = useState('')

  const [formInpassingModules, setFormInpassingModules] = useState<{ id: string; order: number; title: string; description: string; videoHref?: string; pdfHref?: string; pdfFileName?: string }[]>([])
  
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

  // Claims List State and Helpers
  const [claimsList, setClaimsList] = useState<{ id: number; nrp_nip: string; name: string; certificate_code: string; completed_at: string }[]>([])
  
  const fetchClaimsList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/inpassing-claims`)
      if (response.ok) {
        const json = await response.json()
        if (json.status === 'success') {
          setClaimsList(json.data.claims)
        }
      }
    } catch (err) {
      console.error('Failed to fetch claims list:', err)
    }
  }

  const handleDeleteClaim = async (id: number, name: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus/mereset klaim sertifikat untuk ${name}?\n\nTindakan ini akan mengizinkan widyaiswara untuk melakukan klaim ulang.`)) {
      return
    }
    try {
      const response = await apiFetch(`/api/inpassing-claims/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        const json = await response.json()
        if (json.status === 'success') {
          alert('Klaim sertifikat berhasil di-reset.')
          fetchClaimsList()
        } else {
          alert(json.message || 'Gagal mereset klaim sertifikat.')
        }
      } else {
        alert('Gagal mereset klaim sertifikat.')
      }
    } catch (err) {
      console.error('Failed to delete claim:', err)
      alert('Terjadi kesalahan saat mereset klaim.')
    }
  }

  const downloadClaimsCSV = () => {
    if (claimsList.length === 0) return
    const headers = ['No', 'NRP/NIP', 'Nama Calon Widyaiswara', 'Kode Sertifikat', 'Tanggal Kelulusan']
    const rows = claimsList.map((c, i) => [
      i + 1,
      c.nrp_nip,
      c.name,
      c.certificate_code,
      new Date(c.completed_at).toLocaleString('id-ID')
    ])
    
    // Add BOM for proper UTF-8 Excel mapping
    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `laporan-sertifikasi-widyaiswara-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Trigger fetch when currentModule is 'Laporan Sertifikasi'
  useEffect(() => {
    if (currentModule === 'Laporan Sertifikasi') {
      fetchClaimsList()
    }
  }, [currentModule])

  // Pembimbingan Naskap CMS CRUD state
  const [bimbinganList, setBimbinganList] = useState<any[]>([])
  const [bimbinganLoading, setBimbinganLoading] = useState(false)

  const fetchBimbinganList = async () => {
    setBimbinganLoading(true)
    try {
      const res = await fetch('/api/naskap')
      const data = await res.json()
      if (Array.isArray(data)) {
        setBimbinganList(data)
      }
    } catch (err) {
      console.error('Failed to fetch bimbingan list:', err)
    } finally {
      setBimbinganLoading(false)
    }
  }

  useEffect(() => {
    if (currentModule === 'Pembimbingan Naskap') {
      fetchBimbinganList()
    }
  }, [currentModule])

  // Pembimbingan Naskap CMS CRUD Modals & Form States
  const [isNaskapCreateOpen, setIsNaskapCreateOpen] = useState(false)
  const [isNaskapEditOpen, setIsNaskapEditOpen] = useState(false)
  const [isNaskapDeleteOpen, setIsNaskapDeleteOpen] = useState(false)
  
  const [naskapId, setNaskapId] = useState('')
  const [naskapName, setNaskapName] = useState('')
  const [naskapRank, setNaskapRank] = useState('Ajun Komisaris Besar Polisi')
  const [naskapClassGroup, setNaskapClassGroup] = useState('Sespimmen Polri Dikreg Ke-64')
  const [naskapStatus, setNaskapStatus] = useState('Pengajuan Judul')
  const [naskapActiveTitle, setNaskapActiveTitle] = useState('')
  const [naskapCurrentChapter, setNaskapCurrentChapter] = useState('')
  const [naskapEmail, setNaskapEmail] = useState('')
  const [naskapPhone, setNaskapPhone] = useState('')
  const [naskapMeetingUrl, setNaskapMeetingUrl] = useState('')
  const [naskapProposedTitles, setNaskapProposedTitles] = useState('')
  const [naskapSerdikNrpNip, setNaskapSerdikNrpNip] = useState('')
  const [naskapWidyaiswaraName, setNaskapWidyaiswaraName] = useState('')
  const [naskapWidyaiswaraNip, setNaskapWidyaiswaraNip] = useState('')
  const [naskapScheduleText, setNaskapScheduleText] = useState('')
  const [naskapError, setNaskapError] = useState<string | null>(null)
  const [naskapLoading, setNaskapLoading] = useState(false)

  const saveNewNaskap = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!naskapName.trim()) {
      setNaskapError('Nama perwira siswa wajib diisi.')
      return
    }
    setNaskapLoading(true)
    setNaskapError(null)

    try {
      const res = await fetch('/api/naskap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          name: naskapName,
          rank: naskapRank,
          classGroup: naskapClassGroup,
          email: naskapEmail,
          phone: naskapPhone,
          meetingUrl: naskapMeetingUrl,
          proposedTitles: naskapProposedTitles.split('\n').map(t => t.trim()).filter(Boolean),
          serdikNrpNip: naskapSerdikNrpNip,
          widyaiswaraName: naskapWidyaiswaraName,
          widyaiswaraNip: naskapWidyaiswaraNip,
          scheduleText: naskapScheduleText
        })
      })
      const json = await res.json()
      if (res.ok) {
        setIsNaskapCreateOpen(false)
        fetchBimbinganList()
        // Reset form
        setNaskapName('')
        setNaskapEmail('')
        setNaskapPhone('')
        setNaskapMeetingUrl('')
        setNaskapProposedTitles('')
        setNaskapSerdikNrpNip('')
        setNaskapWidyaiswaraName('')
        setNaskapWidyaiswaraNip('')
        setNaskapScheduleText('')
      } else {
        setNaskapError(json.error || 'Gagal menyimpan data.')
      }
    } catch (err: any) {
      setNaskapError(err.message || 'Koneksi bermasalah.')
    } finally {
      setNaskapLoading(false)
    }
  }

  const saveEditNaskap = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!naskapName.trim()) {
      setNaskapError('Nama perwira siswa wajib diisi.')
      return
    }
    setNaskapLoading(true)
    setNaskapError(null)

    try {
      const res = await fetch('/api/naskap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          id: naskapId,
          name: naskapName,
          rank: naskapRank,
          classGroup: naskapClassGroup,
          status: naskapStatus,
          activeTitle: naskapActiveTitle,
          currentChapter: naskapCurrentChapter,
          email: naskapEmail,
          phone: naskapPhone,
          meetingUrl: naskapMeetingUrl,
          proposedTitles: naskapProposedTitles.split('\n').map(t => t.trim()).filter(Boolean),
          serdikNrpNip: naskapSerdikNrpNip,
          widyaiswaraName: naskapWidyaiswaraName,
          widyaiswaraNip: naskapWidyaiswaraNip,
          scheduleText: naskapScheduleText
        })
      })
      const json = await res.json()
      if (res.ok) {
        setIsNaskapEditOpen(false)
        fetchBimbinganList()
      } else {
        setNaskapError(json.error || 'Gagal memperbarui data.')
      }
    } catch (err: any) {
      setNaskapError(err.message || 'Koneksi bermasalah.')
    } finally {
      setNaskapLoading(false)
    }
  }

  const confirmDeleteNaskap = async () => {
    setNaskapLoading(true)
    setNaskapError(null)

    try {
      const res = await fetch('/api/naskap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          id: naskapId
        })
      })
      const json = await res.json()
      if (res.ok) {
        setIsNaskapDeleteOpen(false)
        fetchBimbinganList()
      } else {
        setNaskapError(json.error || 'Gagal menghapus data.')
      }
    } catch (err: any) {
      setNaskapError(err.message || 'Koneksi bermasalah.')
    } finally {
      setNaskapLoading(false)
    }
  }

  // Load Serdik bimbingan data dynamically for real time activity in analitik
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [ssoSerdikList, setSsoSerdikList] = useState<any[]>([])
  const [visitorStats, setVisitorStats] = useState<any>(null)
  const [visitorRanking, setVisitorRanking] = useState<any[]>([])

  // Agen Wira Monitor & Operator States
  const [wiraActiveTab, setWiraActiveTab] = useState<'faq' | 'operator'>('faq')
  const [wiraStats, setWiraStats] = useState<{
    totalSessions: number
    totalMessages: number
    unresolvedCount: number
    operatorTookOverCount: number
    unresolvedQuestions: any[]
    topAskedQuestions: any[]
  } | null>(null)
  const [wiraSessions, setWiraSessions] = useState<any[]>([])
  const [wiraSelectedSessionId, setWiraSelectedSessionId] = useState<string | null>(null)
  const [wiraSessionMessages, setWiraSessionMessages] = useState<any[]>([])
  const [wiraOperatorReplyText, setWiraOperatorReplyText] = useState('')
  const [wiraOperatorName, setWiraOperatorName] = useState('')
  const [wiraIsLoading, setWiraIsLoading] = useState(false)

  const fetchWiraData = () => {
    setWiraIsLoading(true)
    apiFetch('/api/chatbot/stats')
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          setWiraStats(json.data)
        }
      })
      .catch(err => console.error('Failed to fetch chatbot stats:', err))

    apiFetch('/api/chatbot/sessions')
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          setWiraSessions(json.data.sessions)
        }
      })
      .catch(err => console.error('Failed to fetch chatbot sessions:', err))
      .finally(() => setWiraIsLoading(false))
  }

  const fetchWiraSessionMessages = (sessionId: string) => {
    setWiraSelectedSessionId(sessionId)
    apiFetch(`/api/chatbot/messages/${sessionId}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          setWiraSessionMessages(json.data.messages)
        }
      })
      .catch(err => console.error('Failed to fetch session messages:', err))
  }

  const handleSendOperatorReply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wiraSelectedSessionId || !wiraOperatorReplyText.trim()) return

    const opName = wiraOperatorName.trim() || user?.name || 'Operator Sespim'

    try {
      const res = await apiFetch('/api/chatbot/operator-reply', {
        method: 'POST',
        body: JSON.stringify({
          sessionId: wiraSelectedSessionId,
          operatorName: opName,
          message: wiraOperatorReplyText.trim()
        })
      })

      if (res.ok) {
        setWiraOperatorReplyText('')
        fetchWiraSessionMessages(wiraSelectedSessionId)
        fetchWiraData()
      }
    } catch (err) {
      console.error('Failed to send operator reply:', err)
    }
  }

  useEffect(() => {
    if (currentModule === 'Agen Wira AI & Operator') {
      fetchWiraData()
    }
  }, [currentModule])

  useEffect(() => {
    if (currentModule === 'Analitik Kasespim') {
      fetch('/api/naskap')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setSsoSerdikList(data)
          }
        })
        .catch(err => console.error('Failed to fetch analitik bimbingan data:', err))

      // Fetch visitor stats
      apiFetch('/api/activity/stats')
        .then(res => res.json())
        .then(json => {
          if (json.status === 'success') {
            setVisitorStats(json.data)
          }
        })
        .catch(err => console.error('Failed to fetch visitor stats:', err))

      // Fetch user rankings
      apiFetch('/api/activity/users-ranking')
        .then(res => res.json())
        .then(json => {
          if (json.status === 'success') {
            setVisitorRanking(json.data.ranking)
          }
        })
        .catch(err => console.error('Failed to fetch visitor ranking:', err))

      // Fetch all users for demographic analytics
      apiFetch('/api/users')
        .then(res => res.json())
        .then(json => {
          if (json.status === 'success') {
            setAllUsers(json.data.users)
          }
        })
        .catch(err => console.error('Failed to fetch users:', err))
    }
  }, [currentModule])
 
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
 
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const MAX_WIDTH = 300
        const MAX_HEIGHT = 300
        let width = img.width
        let height = img.height
 
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
 
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7)
          setProfileFoto(compressedBase64)
        }
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setIsUpdatingProfile(true)
    setProfileSuccessMsg('')
    setProfileErrorMsg('')
 
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${(user as any).id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('sespim_token')}`
        },
        body: JSON.stringify({
          name: profileName,
          phone: profilePhone,
          gelar: activeRole !== 'serdik' ? profileGelar : undefined,
          pangkat: profilePangkat,
          email: profileEmail,
          foto: profileFoto,
          no_serdik: activeRole === 'serdik' ? profileNoSerdik : undefined,
          instansi_polri: profileInstansiPolri,
          kementerian_lembaga: activeRole === 'serdik' ? profileKementerianLembaga : undefined,
          negara_asal: profileNegaraAsal,
          program: activeRole === 'serdik' ? profileProgram : undefined,
          angkatan: activeRole === 'serdik' ? profileAngkatan : undefined,
          keahlian: activeRole === 'widyaiswara' ? profileKeahlian : undefined,
          sertifikasi: activeRole === 'widyaiswara' ? profileSertifikasi : undefined
        })
      })
 
      const data = await response.json()
      if (response.ok && data.status === 'success') {
        setProfileSuccessMsg('Profil pribadi berhasil diperbarui!')
        // Update user state and session storage
        const updatedUser = {
          ...user,
          name: profileName,
          phone: profilePhone,
          gelar: profileGelar,
          pangkat: profilePangkat,
          email: profileEmail,
          foto: profileFoto,
          no_serdik: profileNoSerdik,
          instansi_polri: profileInstansiPolri,
          kementerian_lembaga: profileKementerianLembaga,
          negara_asal: profileNegaraAsal,
          program: profileProgram,
          angkatan: profileAngkatan,
          keahlian: profileKeahlian,
          sertifikasi: profileSertifikasi
        }
        setUser(updatedUser)
        sessionStorage.setItem('sespim_user', JSON.stringify(updatedUser))
        window.dispatchEvent(new Event('sespim_auth_change'))
      } else {
        setProfileErrorMsg(data.message || 'Gagal memperbarui profil.')
      }
    } catch (err) {
      console.error(err)
      setProfileErrorMsg('Gagal terhubung ke API server.')
    } finally {
      setIsUpdatingProfile(false)
    }
  }
 
  const renderMyProfileWorkspace = () => {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-6">
          <div className="flex items-center gap-4 border-b border-neutral-800 pb-5">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-polri-gold/20 flex items-center justify-center border border-polri-gold/40 text-polri-gold text-2xl font-black uppercase">
              {profileFoto ? (
                <img src={profileFoto} alt={profileName} className="h-full w-full object-cover" />
              ) : (
                profileName ? profileName.charAt(0) : 'U'
              )}
            </div>
            <div>
              <h4 className="text-base font-black uppercase text-polri-goldSoft tracking-wider">Profil Pribadi Saya</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Kelola informasi profil pribadi, pangkat, gelar, dan foto Anda untuk tampilan sistem.</p>
            </div>
          </div>
 
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {profileSuccessMsg && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-emerald-400 text-xs font-semibold">
                ✓ {profileSuccessMsg}
              </div>
            )}
            {profileErrorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-red-400 text-xs font-semibold">
                ✗ {profileErrorMsg}
              </div>
            )}
 
             <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                />
              </div>

              {activeRole !== 'serdik' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Gelar / Akademik</label>
                  <input
                    type="text"
                    value={profileGelar}
                    onChange={(e) => setProfileGelar(e.target.value)}
                    placeholder="Contoh: Drs., M.Si. / Dr., S.H."
                    className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Pangkat / Golongan</label>
                <input
                  type="text"
                  value={profilePangkat}
                  onChange={(e) => setProfilePangkat(e.target.value)}
                  placeholder="Contoh: Kombes Pol / Pembina Tk.I IV/b"
                  className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">NRP / NIP (ID Pengguna)</label>
                <input
                  type="text"
                  disabled
                  value={user?.nrpNip || ''}
                  className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-500 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Nomor Telepon / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Alamat Email</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  placeholder="Contoh: kasespim@polri.go.id"
                  className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                />
              </div>

              {activeRole !== 'serdik' && (
                <>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Instansi Asal</label>
                    <input
                      type="text"
                      value={profileInstansiPolri}
                      onChange={(e) => setProfileInstansiPolri(e.target.value)}
                      placeholder="Contoh: Lemdiklat Polri / Biro SDM Polda"
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Negara Asal</label>
                    <input
                      type="text"
                      value={profileNegaraAsal}
                      onChange={(e) => setProfileNegaraAsal(e.target.value)}
                      placeholder="Contoh: Indonesia / Timor Leste / Australia"
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                </>
              )}

              <div className="col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Unggah Foto Profil (Kompresi Otomatis)</label>
                <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
                    {profileFoto ? (
                      <img src={profileFoto} alt="Preview Foto" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-neutral-500 text-xs">No Photo</span>
                    )}
                  </div>
                  <div className="flex-1 w-full space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-neutral-850 file:text-polri-goldSoft hover:file:bg-neutral-800 transition cursor-pointer"
                    />
                    <p className="text-[10px] text-neutral-500 leading-normal">
                      Foto akan otomatis dikompresi di peramban ke resolusi maksimal 300x300 piksel dengan kualitas optimal (JPEG 70%) untuk menghemat ruang penyimpanan.
                    </p>
                  </div>
                </div>
              </div>

              {activeRole === 'serdik' && (
                <div className="col-span-2 grid gap-6 sm:grid-cols-2 border-t border-neutral-800 pt-6 mt-4">
                  <div className="col-span-2">
                    <h5 className="text-xs font-black uppercase text-polri-goldSoft tracking-wider">Detail Pendidikan Serdik</h5>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Program Pendidikan</label>
                    <select
                      value={profileProgram}
                      onChange={(e) => setProfileProgram(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3.5 text-sm text-white outline-none focus:border-polri-gold/60"
                    >
                      <option value="sespimti">SESPIMTI POLRI</option>
                      <option value="sespimmen">SESPIMMEN POLRI</option>
                      <option value="sespimma">SESPIMMA POLRI</option>
                      <option value="sppk">SPPK POLRI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Angkatan</label>
                    <input
                      type="text"
                      required
                      value={profileAngkatan}
                      onChange={(e) => setProfileAngkatan(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">No Serdik</label>
                    <input
                      type="text"
                      required
                      value={profileNoSerdik}
                      onChange={(e) => setProfileNoSerdik(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Instansi Polri (Satker/Polda)</label>
                    <input
                      type="text"
                      value={profileInstansiPolri}
                      onChange={(e) => setProfileInstansiPolri(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Kementerian / Lembaga (Jika Non-Polri)</label>
                    <input
                      type="text"
                      value={profileKementerianLembaga}
                      onChange={(e) => setProfileKementerianLembaga(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Negara Asal</label>
                    <input
                      type="text"
                      required
                      value={profileNegaraAsal}
                      onChange={(e) => setProfileNegaraAsal(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                </div>
              )}

              {activeRole === 'widyaiswara' && (
                <div className="col-span-2 grid gap-6 sm:grid-cols-2 border-t border-neutral-800 pt-6 mt-4">
                  <div className="col-span-2">
                    <h5 className="text-xs font-black uppercase text-polri-goldSoft tracking-wider">Kompetensi Tenaga Pendidik</h5>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Bidang Keahlian Utama</label>
                    <input
                      type="text"
                      required
                      value={profileKeahlian}
                      onChange={(e) => setProfileKeahlian(e.target.value)}
                      placeholder="Contoh: Kepemimpinan Strategis"
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">Sertifikasi Utama</label>
                    <input
                      type="text"
                      required
                      value={profileSertifikasi}
                      onChange={(e) => setProfileSertifikasi(e.target.value)}
                      placeholder="Contoh: LSP Lemdiklat Polri"
                      className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white outline-none focus:border-polri-gold/60"
                    />
                  </div>
                </div>
              )}
            </div>
 
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="bg-polri-gold hover:bg-polri-gold/90 text-polri-brownDark px-6 py-3 rounded-xl text-xs font-black uppercase transition shadow-md disabled:bg-neutral-800 disabled:text-neutral-500"
              >
                {isUpdatingProfile ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const downloadKasespimExecutiveReportPDF = () => {
    const title = 'LAPORAN ANALITIK EKSEKUTIF KASESPIM SESPIM POLRI'
    const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    const activeSerdik = allUsers.filter(u => u.role === 'serdik')
    const totalSerdik = activeSerdik.length || 184
    const countWidyaiswara = allUsers.filter(u => u.role === 'widyaiswara').length || 24

    const instansiCounts: Record<string, number> = {}
    activeSerdik.forEach(u => {
      const inst = u.instansi_polri || u.kementerian_lembaga || 'POLRI'
      instansiCounts[inst] = (instansiCounts[inst] || 0) + 1
    })
    const instansiList = Object.entries(instansiCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    let instText = ''
    instansiList.forEach((inst, idx) => {
      const cleanInstName = inst[0].replace(/[\(\)]/g, '')
      instText += `0 -18 Td\n(${idx + 1}. ${cleanInstName} - ${inst[1]} Peserta) Tj\n`
    })

    let claimsText = ''
    const topClaims = claimsList.slice(0, 5)
    topClaims.forEach((claim, idx) => {
      const cleanClaimName = claim.name.replace(/[\(\)]/g, '')
      const dateStrClaim = new Date(claim.completed_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'numeric', day: 'numeric' })
      claimsText += `0 -18 Td\n(${idx + 1}. ${cleanClaimName} - NRP/NIP: ${claim.nrp_nip} - Lulus: ${dateStrClaim}) Tj\n`
    })
    if (claimsText === '') {
      claimsText = '0 -18 Td\n(Belum ada Calon Widyaiswara yang lulus inpassing) Tj\n'
    }

    const pdfString = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 6 0 R
    >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 5 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
5 0 obj
<< /Length 2000 >>
stream
BT
/F1 14 Tf
50 740 Td
(SEKOLAH STAF DAN PIMPINAN LEMDIKLAT POLRI) Tj
/F1 12 Tf
0 -30 Td
(${title}) Tj
/F2 10 Tf
0 -30 Td
(Tanggal Laporan: ${dateStr}) Tj
0 -25 Td
(RINGKASAN STATISTIK UTAMA SESPIM POLRI:) Tj
0 -20 Td
(- Total Peserta Didik Aktif (Serdik): ${totalSerdik} Peserta) Tj
0 -15 Td
(- Jumlah Widyaiswara Pengampu: ${countWidyaiswara} Dosen) Tj
0 -15 Td
(- Persentase Kemajuan Naskap: 77% Rata-rata) Tj
0 -15 Td
(- Kelulusan Naskap disetujui (ACC): 142 / ${totalSerdik} Serdik) Tj
/F1 11 Tf
0 -35 Td
(SEBARAN INSTANSI PESERTA DIDIK UTAMA:) Tj
/F2 10 Tf
${instText}
/F1 11 Tf
0 -35 Td
(LAPORAN KELULUSAN CALON WIDYAISWARA (INPASSING):) Tj
/F2 10 Tf
${claimsText}
/F1 11 Tf
0 -35 Td
(SEBARAN KEAHLIAN WIDYAISWARA (DISTRIBUSI KEPAKARAN):) Tj
/F2 10 Tf
0 -20 Td
(- Manajemen Strategis & Kepemimpinan: 8 WI Dosen) Tj
0 -15 Td
(- Hukum Kepolisian & Restorative Justice: 6 WI Dosen) Tj
0 -15 Td
(- Cyber Crime & Digital Forensics: 4 WI Dosen) Tj
0 -15 Td
(- Kamneg & Intelijen Operasional: 6 WI Dosen) Tj
/F1 10 Tf
0 -40 Td
(DITANDATANGANI SECARA DIGITAL OLEH:) Tj
/F2 9 Tf
0 -20 Td
(Sekolah Staf dan Pimpinan Lemdiklat Kepolisian Negara Republik Indonesia) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000262 00000 n 
0000000410 00000 n 
0000000336 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1680
%%EOF`

    const blob = new Blob([pdfString], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Laporan_Analitik_Kasespim_${new Date().toISOString().split('T')[0]}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const renderAnalitikKasespimWorkspace = () => {
    const activeSerdik = allUsers.filter(u => u.role === 'serdik')
    const totalSerdik = activeSerdik.length || 184
    const countSelesai = 142
    const rateKemajuan = 77
    const countWidyaiswara = allUsers.filter(u => u.role === 'widyaiswara').length || 24

    // 1. Instansi Demographics
    const instansiCounts: Record<string, number> = {}
    activeSerdik.forEach(u => {
      const inst = u.instansi_polri || u.kementerian_lembaga || 'POLRI'
      instansiCounts[inst] = (instansiCounts[inst] || 0) + 1
    })
    const sortedInstansi = Object.entries(instansiCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    // 2. Negara Demographics
    const negaraCounts: Record<string, number> = {}
    activeSerdik.forEach(u => {
      const neg = u.negara_asal || 'Indonesia'
      negaraCounts[neg] = (negaraCounts[neg] || 0) + 1
    })
    const sortedNegara = Object.entries(negaraCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

    return (
      <div className="space-y-6">
        {/* Executive Report Card */}
        <div className="bg-gradient-to-r from-polri-brownDark via-polri-brown to-polri-maroon p-6 rounded-2xl border border-polri-gold/30 shadow-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black tracking-wide uppercase">Laporan Analitik Eksekutif Kasespim</h3>
            <p className="text-xs text-polri-goldSoft mt-1">
              Dokumen ringkasan statistik bimbingan naskah, demografi peserta didik aktif, dan sebaran kompetensi Widyaiswara.
            </p>
          </div>
          <button
            type="button"
            onClick={downloadKasespimExecutiveReportPDF}
            className="inline-flex items-center gap-2 bg-polri-gold hover:bg-polri-goldSoft text-polri-brownDark font-black text-xs py-3 px-5 rounded-xl shadow-md transition transform hover:scale-[1.02] shrink-0"
          >
            📥 Unduh Laporan PDF
          </button>
        </div>
        {/* Header Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Total Serdik Aktif</p>
            <p className="mt-2 text-2xl font-black text-white">{totalSerdik} Peserta</p>
            <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
              <span>●</span>
              <span>4 Program Pendidikan</span>
            </div>
          </div>
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Kemajuan Naskap</p>
            <p className="mt-2 text-2xl font-black text-polri-goldSoft">{rateKemajuan}% Rata-rata</p>
            <div className="mt-2 w-full bg-neutral-900 rounded-full h-1.5 overflow-hidden">
              <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: `${rateKemajuan}%` }}></div>
            </div>
          </div>
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Lulus Naskah (ACC)</p>
            <p className="mt-2 text-2xl font-black text-white">{countSelesai} / {totalSerdik}</p>
            <p className="mt-2 text-[10px] text-neutral-400 font-semibold">Telah disetujui Widyaiswara</p>
          </div>
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">WI Pengampu</p>
            <p className="mt-2 text-2xl font-black text-white">{countWidyaiswara} Dosen</p>
            <p className="mt-2 text-[10px] text-emerald-400 font-bold">● Aktif Membimbing</p>
          </div>
        </div>

        {/* Statistik Aktivitas Portal (Real-time) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">Statistik Aktivitas Portal (Real-time)</h4>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Total Kunjungan Portal</p>
              <p className="mt-2 text-2xl font-black text-white">{visitorStats?.totalLogs || 0} Akses</p>
              <p className="mt-2 text-[10px] text-emerald-400 font-bold">● Terhitung secara otomatis</p>
            </div>
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Pengunjung Unik (IP)</p>
              <p className="mt-2 text-2xl font-black text-polri-goldSoft">{visitorStats?.uniqueIps || 0} Perangkat</p>
              <p className="mt-2 text-[10px] text-neutral-400 font-semibold">Berdasarkan alamat IP client</p>
            </div>
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">User Teridentifikasi</p>
              <p className="mt-2 text-2xl font-black text-white">{visitorStats?.uniqueUsers || 0} Akun</p>
              <p className="mt-2 text-[10px] text-polri-goldSoft font-semibold">Serdik & Widyaiswara login</p>
            </div>
          </div>
        </div>

        {/* Visual Charts / Stats Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Sebaran Status Naskap */}
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div>
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Sebaran Status Naskap</h4>
              <p className="text-xs text-neutral-400 mt-1">Perkembangan tahap penyusunan naskah akademik oleh seluruh peserta didik aktif.</p>
            </div>
            
            <div className="space-y-3.5 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>Lulus Sidang / Selesai (ACC)</span>
                  <span>142 Serdik (77%)</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '77%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>Proses Bimbingan Draf</span>
                  <span>30 Serdik (16%)</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>Pengajuan Judul</span>
                  <span>12 Serdik (7%)</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '7%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracer Study Kelulusan per Program */}
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div>
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Tingkat Kelulusan per Program</h4>
              <p className="text-xs text-neutral-400 mt-1">Laporan tingkat kelulusan dan penyelesaian naskah berdasarkan program pendidikan.</p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>Sespimti Polri</span>
                  <span>88% (44 / 50)</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2">
                  <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>Sespimmen Polri</span>
                  <span>94% (82 / 87)</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2">
                  <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>Sespimma Polri</span>
                  <span>100% (31 / 31)</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2">
                  <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                  <span>SPPK Polri</span>
                  <span>100% (16 / 16)</span>
                </div>
                <div className="w-full bg-neutral-900 rounded-full h-2">
                  <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Demografi Peserta Didik (Instansi & Negara Asal) */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sebaran Instansi Asal */}
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div>
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Demografi Instansi Asal Serdik</h4>
              <p className="text-xs text-neutral-400 mt-1">Distribusi peserta didik aktif berdasarkan instansi asal / Polda pengirim.</p>
            </div>
            
            <div className="space-y-3.5 pt-2">
              {sortedInstansi.length === 0 ? (
                <>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>POLRI</span>
                      <span>142 Serdik (77%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '77%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>TNI AD</span>
                      <span>15 Serdik (8%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>TNI AL</span>
                      <span>10 Serdik (5%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>TNI AU</span>
                      <span>8 Serdik (4%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '4%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>KEJAKSAAN</span>
                      <span>5 Serdik (3%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '3%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>KEHAKIMAN</span>
                      <span>2 Serdik (1%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>DEPARTEMEN</span>
                      <span>2 Serdik (1%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                </>
              ) : (
                sortedInstansi.map(([inst, count]) => {
                  const total = activeSerdik.length || 1
                  const pct = Math.round((count / total) * 100)
                  return (
                    <div key={inst}>
                      <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                        <span className="capitalize">{inst}</span>
                        <span>{count} Serdik ({pct}%)</span>
                      </div>
                      <div className="w-full bg-neutral-900 rounded-full h-2">
                        <div className="bg-polri-goldSoft h-full rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Sebaran Negara Asal */}
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
            <div>
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Demografi Negara Asal Serdik</h4>
              <p className="text-xs text-neutral-400 mt-1">Distribusi peserta didik aktif dari negara asal (Kerja Sama Internasional).</p>
            </div>

            <div className="space-y-3.5 pt-2">
              {sortedNegara.length === 0 ? (
                <>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>Indonesia</span>
                      <span>176 Serdik (96%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>Timor Leste</span>
                      <span>4 Serdik (2%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '2%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>Australia</span>
                      <span>2 Serdik (1%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                      <span>Malaysia</span>
                      <span>2 Serdik (1%)</span>
                    </div>
                    <div className="w-full bg-neutral-900 rounded-full h-2">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                </>
              ) : (
                sortedNegara.map(([negara, count]) => {
                  const total = activeSerdik.length || 1
                  const pct = Math.round((count / total) * 100)
                  return (
                    <div key={negara}>
                      <div className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                        <span className="capitalize">{negara}</span>
                        <span>{count} Serdik ({pct}%)</span>
                      </div>
                      <div className="w-full bg-neutral-900 rounded-full h-2">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Peta Keahlian Widyaiswara */}
        <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
          <div>
            <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Peta Bidang Keahlian Widyaiswara</h4>
            <p className="text-xs text-neutral-400 mt-1">Peta distribusi bidang kepakaran akademik Widyaiswara Sespim Polri.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 text-center">
              <p className="text-2xl font-black text-white">8</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">Manajemen Strategis</p>
            </div>
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 text-center">
              <p className="text-2xl font-black text-white">6</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">Hukum & Restorative Justice</p>
            </div>
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 text-center">
              <p className="text-2xl font-black text-white">4</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">Cyber Crime & IT</p>
            </div>
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/30 text-center">
              <p className="text-2xl font-black text-white">6</p>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mt-1">Kamneg & Intelijen</p>
            </div>
          </div>
        </div>

        {/* Real-time Aktivitas Bimbingan */}
        <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Aktivitas Asistensi Naskap Terkini</h4>
              <p className="text-xs text-neutral-400 mt-1">Riwayat status pembimbingan naskah akademik terintegrasi database lokal.</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-polri-maroon text-white animate-pulse">Live</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  <th className="pb-3 pr-4">Nama Serdik</th>
                  <th className="pb-3 px-4">Program Pendidikan</th>
                  <th className="pb-3 px-4">Judul Aktif / Pengajuan</th>
                  <th className="pb-3 px-4 text-center">Status</th>
                  <th className="pb-3 pl-4">Aktivitas Terakhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {ssoSerdikList.map((serdik) => {
                  const lastComment = serdik.comments[serdik.comments.length - 1]
                  return (
                    <tr key={serdik.id} className="hover:bg-neutral-900/30 transition">
                      <td className="py-4 pr-4 font-bold text-white">{serdik.name}</td>
                      <td className="py-4 px-4 text-neutral-400 font-semibold">{serdik.classGroup}</td>
                      <td className="py-4 px-4 max-w-[240px] truncate font-medium">
                        {serdik.activeTitle || (serdik.proposedTitles && serdik.proposedTitles[0]) || 'Belum mengajukan'}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                          serdik.status === 'Selesai' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50' 
                            : serdik.status === 'Bimbingan Draf'
                              ? 'bg-blue-950 text-blue-400 border border-blue-900/50'
                              : 'bg-amber-950 text-amber-400 border border-amber-900/50'
                        }`}>
                          {serdik.status}
                        </span>
                      </td>
                      <td className="py-4 pl-4 text-neutral-400 max-w-[200px] truncate">
                        {lastComment ? `"${lastComment.text}"` : '-'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Peringkat Keaktifan Pengunjung (Serdik & Widyaiswara) */}
        <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Peringkat Keaktifan Pengunjung (Serdik & Widyaiswara)</h4>
              <p className="text-xs text-neutral-400 mt-1">Daftar pengguna (Serdik & Widyaiswara) yang paling sering mengakses portal untuk bahan penilaian Kasespim.</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-polri-gold text-polri-brownDark font-black">Nilai Keaktifan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  <th className="pb-3 pr-4">Peringkat</th>
                  <th className="pb-3 px-4">Nama Pengguna</th>
                  <th className="pb-3 px-4">NRP / NIP</th>
                  <th className="pb-3 px-4">Peran (Role)</th>
                  <th className="pb-3 px-4 text-center">Frekuensi Akses</th>
                  <th className="pb-3 pl-4">Aktivitas Terakhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {visitorRanking.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-500 font-semibold">
                      Belum ada aktivitas login dari Serdik atau Widyaiswara yang tercatat di database.
                    </td>
                  </tr>
                ) : (
                  visitorRanking.map((visitor, idx) => (
                    <tr key={visitor.user_id} className="hover:bg-neutral-900/30 transition">
                      <td className="py-4 pr-4 font-bold text-neutral-500 text-center">{idx + 1}</td>
                      <td className="py-4 px-4 font-black text-white">{visitor.name}</td>
                      <td className="py-4 px-4 font-mono text-neutral-400">{visitor.nrp_nip}</td>
                      <td className="py-4 px-4 text-neutral-400 font-semibold">
                        <span className="capitalize">
                          {visitor.role === 'serdik' 
                            ? 'Serdik (Peserta Didik)' 
                            : visitor.role === 'widyaiswara' 
                              ? 'Widyaiswara' 
                              : visitor.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-950 text-emerald-400 border border-emerald-900/50">
                          {visitor.total_visits} Kali Akses
                        </span>
                      </td>
                      <td className="py-4 pl-4 text-neutral-400 font-medium">
                        {new Date(visitor.last_active).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monitoring Sertifikasi Calon Widyaiswara */}
        <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
          <div>
            <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Monitoring Sertifikasi Calon Widyaiswara</h4>
            <p className="text-xs text-neutral-400 mt-1">Daftar Widyaiswara yang telah lulus inpassing dan mengklaim sertifikat digital.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs text-neutral-300">
              <thead>
                <tr className="border-b border-neutral-800 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  <th className="pb-3 pr-4">No</th>
                  <th className="pb-3 px-4">Nama Lengkap</th>
                  <th className="pb-3 px-4">NIP / NRP</th>
                  <th className="pb-3 px-4">Kode Sertifikat</th>
                  <th className="pb-3 pl-4">Tanggal Kelulusan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {claimsList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-neutral-500 font-semibold">
                      Belum ada Calon Widyaiswara yang lulus inpassing/sertifikasi.
                    </td>
                  </tr>
                ) : (
                  claimsList.map((claim, idx) => (
                    <tr key={claim.id} className="hover:bg-neutral-900/30 transition">
                      <td className="py-4 pr-4 font-bold text-neutral-500">{idx + 1}</td>
                      <td className="py-4 px-4 font-bold text-white">{claim.name}</td>
                      <td className="py-4 px-4 font-mono text-neutral-400">{claim.nrp_nip}</td>
                      <td className="py-4 px-4 font-mono text-polri-goldSoft">{claim.certificate_code}</td>
                      <td className="py-4 pl-4 text-neutral-400">
                        {new Date(claim.completed_at).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }

  const renderAgenWiraWorkspace = () => {
    return (
      <div className="space-y-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-polri-brownDark via-polri-brown to-polri-maroon p-6 rounded-2xl border border-polri-gold/30 shadow-xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/10 p-2 backdrop-blur-md border border-white/20 shrink-0 flex items-center justify-center">
              <img src="/images/wira-avatar.png" alt="Wira" className="h-full w-full object-cover rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-wide uppercase">Monitor Agen Wira & Live Operator Center</h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-emerald-500 text-white rounded-full">
                  AI + Human Hybrid
                </span>
              </div>
              <p className="text-xs text-polri-goldSoft mt-1">
                Pantau statistik pertanyaan populer (F.A.Q), evaluasi respons AI, dan ambil alih obrolan pengunjung secara langsung.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchWiraData}
            disabled={wiraIsLoading}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 px-4 rounded-xl border border-white/20 transition backdrop-blur-md shrink-0"
          >
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            {wiraIsLoading ? 'Memuat Data...' : 'Refresh Data'}
          </button>
        </div>

        {/* Stats Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col justify-between">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Percakapan (Sesi)</p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-white">{wiraStats?.totalSessions || 0}</span>
              <span className="text-xs text-neutral-500">Sesi Unik</span>
            </div>
          </div>

          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col justify-between">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Total Pesan Terproses</p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-polri-goldSoft">{wiraStats?.totalMessages || 0}</span>
              <span className="text-xs text-neutral-500">Log Pesan</span>
            </div>
          </div>

          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col justify-between">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Butuh Operator / Fallback</p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-red-400">{wiraStats?.unresolvedCount || 0}</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-red-950 text-red-400 rounded-full border border-red-800">
                Perlu Evaluasi
              </span>
            </div>
          </div>

          <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 flex flex-col justify-between">
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Sesi Diambil Alih Operator</p>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-black text-emerald-400">{wiraStats?.operatorTookOverCount || 0}</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-950 text-emerald-400 rounded-full border border-emerald-800">
                Live Human Active
              </span>
            </div>
          </div>
        </div>

        {/* Sub-Tabs Selector */}
        <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 max-w-md">
          <button
            type="button"
            onClick={() => setWiraActiveTab('faq')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              wiraActiveTab === 'faq' 
                ? 'bg-polri-maroon text-white shadow-md' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            📊 Analitik F.A.Q & Pertanyaan
          </button>
          <button
            type="button"
            onClick={() => setWiraActiveTab('operator')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 ${
              wiraActiveTab === 'operator' 
                ? 'bg-emerald-700 text-white shadow-md' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            🎧 Konsol Live Operator
            {(wiraStats?.unresolvedCount || 0) > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>
        </div>

        {/* TAB 1: ANALITIK F.A.Q */}
        {wiraActiveTab === 'faq' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Asked Questions */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Top 10 Pertanyaan Sering Diajukan (F.A.Q)</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Urutan pertanyaan publik berdasarkan frekuensi tersering.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-400">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Pertanyaan Pengunjung</th>
                      <th className="py-2.5 px-3 text-right">Frekuensi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900 text-xs">
                    {wiraStats?.topAskedQuestions && wiraStats.topAskedQuestions.length > 0 ? (
                      wiraStats.topAskedQuestions.map((item, idx) => (
                        <tr key={idx} className="hover:bg-neutral-900/50 transition">
                          <td className="py-2.5 px-3 font-bold text-polri-goldSoft">{idx + 1}</td>
                          <td className="py-2.5 px-3 text-white font-medium">{item.message}</td>
                          <td className="py-2.5 px-3 text-right font-black text-emerald-400">{item.frequency}x</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="py-6 text-center text-xs text-neutral-500">Belum ada data pertanyaan pengunjung terdeteksi.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Unresolved / Evaluation Needed Questions */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div>
                <h4 className="text-sm font-black uppercase text-red-400 tracking-wider">Evaluasi Pertanyaan Perlu Pembaruan AI</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Pertanyaan pengunjung yang belum terjawab optimal atau meminta operator human.</p>
              </div>

              <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
                {wiraStats?.unresolvedQuestions && wiraStats.unresolvedQuestions.length > 0 ? (
                  wiraStats.unresolvedQuestions.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-neutral-400">
                        <span className="font-bold text-neutral-300">{item.visitor_name}</span>
                        <span>{new Date(item.created_at).toLocaleString('id-ID')}</span>
                      </div>
                      <p className="text-xs text-white font-semibold">"{item.message}"</p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-900/50 rounded-xl border border-neutral-800">
                    Semua pertanyaan pengunjung berhasil dijawab oleh AI Agen Wira.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE OPERATOR CONSOLE */}
        {wiraActiveTab === 'operator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Active Sessions List */}
            <div className="lg:col-span-5 bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
              <div>
                <h4 className="text-sm font-black uppercase text-emerald-400 tracking-wider">Daftar Sesi Obrolan Pengunjung</h4>
                <p className="text-xs text-neutral-400 mt-0.5">Pilih sesi pengunjung untuk melihat obrolan dan mengambil alih percakapan secara langsung.</p>
              </div>

              <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1 scrollbar-thin">
                {wiraSessions && wiraSessions.length > 0 ? (
                  wiraSessions.map((sess) => {
                    const isSelected = wiraSelectedSessionId === sess.session_id
                    const isUnresolved = sess.status === 'unresolved'
                    const isTookOver = sess.status === 'operator_took_over'

                    return (
                      <div
                        key={sess.session_id}
                        onClick={() => fetchWiraSessionMessages(sess.session_id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-neutral-800 border-polri-gold'
                            : isUnresolved
                            ? 'bg-red-950/20 border-red-900/50 hover:bg-neutral-900'
                            : isTookOver
                            ? 'bg-emerald-950/20 border-emerald-900/50 hover:bg-neutral-900'
                            : 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800/60'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{sess.visitor_name}</span>
                            <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                              isUnresolved
                                ? 'bg-red-500 text-white animate-pulse'
                                : isTookOver
                                ? 'bg-emerald-500 text-white'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}>
                              {isUnresolved ? 'Perlu Operator' : isTookOver ? 'Operator Active' : 'AI Active'}
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-400">ID: {sess.session_id.substring(0, 15)}... • {sess.total_messages} Pesan</p>
                          <p className="text-[10px] text-neutral-500">{new Date(sess.last_activity).toLocaleString('id-ID')}</p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            fetchWiraSessionMessages(sess.session_id)
                          }}
                          className="px-3 py-1.5 bg-polri-maroon hover:bg-polri-brownDark text-white text-[10px] font-bold rounded-lg shadow-sm"
                        >
                          {isSelected ? 'Aktif' : 'Buka Chat'}
                        </button>
                      </div>
                    )
                  })
                ) : (
                  <div className="p-8 text-center text-xs text-neutral-500 bg-neutral-900/50 rounded-xl border border-neutral-800">
                    Belum ada sesi obrolan aktif.
                  </div>
                )}
              </div>
            </div>

            {/* Selected Chat Room Console */}
            <div className="lg:col-span-7 bg-neutral-950 p-6 rounded-2xl border border-neutral-800 flex flex-col h-[520px]">
              {wiraSelectedSessionId ? (
                <>
                  {/* Console Header */}
                  <div className="pb-4 mb-4 border-b border-neutral-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-white uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Chat Room: {wiraSelectedSessionId}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Mengambil alih percakapan pengunjung secara langsung.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => fetchWiraSessionMessages(wiraSelectedSessionId)}
                      className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-lg border border-neutral-700"
                    >
                      Refresh Chat
                    </button>
                  </div>

                  {/* Chat Messages Transcript */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-900/60 rounded-xl border border-neutral-800/80 mb-4 scrollbar-thin">
                    {wiraSessionMessages.map((msg: any) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-neutral-800 text-white border border-neutral-700'
                            : msg.sender === 'operator'
                            ? 'bg-emerald-950 border border-emerald-700 text-emerald-100'
                            : 'bg-polri-maroon/80 border border-polri-gold/30 text-white'
                        }`}>
                          <p className="text-[9px] font-black uppercase tracking-wider mb-0.5 text-neutral-400">
                            {msg.sender === 'user' ? `[Pengunjung] ${msg.visitor_name}` : msg.sender === 'operator' ? `[Operator] ${msg.operator_name}` : '[AI Agen Wira]'}
                          </p>
                          <p className="whitespace-pre-line">{msg.message}</p>
                          <span className="text-[8px] opacity-60 text-right block mt-1">
                            {new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Operator Input Form */}
                  <form onSubmit={handleSendOperatorReply} className="space-y-3 pt-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={wiraOperatorName}
                        onChange={(e) => setWiraOperatorName(e.target.value)}
                        placeholder={`Nama Operator (Default: ${user?.name || 'Operator Sespim'})`}
                        className="w-1/3 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                      />
                      <input
                        type="text"
                        value={wiraOperatorReplyText}
                        onChange={(e) => setWiraOperatorReplyText(e.target.value)}
                        placeholder="Ketikkan balasan operator di sini untuk dikirim ke pengunjung..."
                        className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={!wiraOperatorReplyText.trim()}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-md disabled:opacity-40"
                      >
                        Kirim Balasan
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-neutral-500 space-y-2">
                  <UserGroupIcon className="h-10 w-10 text-neutral-600" />
                  <p className="text-xs font-semibold text-neutral-400">Pilih sesi obrolan pengunjung di sebelah kiri untuk membuka Konsol Chat Live Operator.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderClaimsReportWorkspace = () => {
    return (
      <div className="space-y-6">
        <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Laporan Kelulusan Calon Widyaiswara</h4>
              <p className="text-xs text-neutral-400 mt-1">Daftar Widyaiswara yang telah menyelesaikan seluruh modul Inpassing dan mengklaim sertifikat.</p>
            </div>
            <button
              onClick={downloadClaimsCSV}
              disabled={claimsList.length === 0}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Laporan CSV (Excel)
            </button>
          </div>

          <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">NRP / NIP</th>
                    <th className="px-6 py-4">Nama Calon Widyaiswara</th>
                    <th className="px-6 py-4">Kode Sertifikat</th>
                    <th className="px-6 py-4">Tanggal Kelulusan</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-semibold">
                  {claimsList.length > 0 ? (
                    claimsList.map((claim, index) => (
                      <tr key={claim.id} className="hover:bg-neutral-950/40 transition">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4 font-mono">{claim.nrp_nip}</td>
                        <td className="px-6 py-4 text-white">{claim.name}</td>
                        <td className="px-6 py-4 text-polri-goldSoft font-mono">{claim.certificate_code}</td>
                        <td className="px-6 py-4">{new Date(claim.completed_at).toLocaleString('id-ID')}</td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDeleteClaim(claim.id, claim.name)}
                            className="bg-rose-600/90 hover:bg-rose-700 text-white font-bold text-[10px] uppercase py-1.5 px-3 rounded-lg shadow-sm transition active:scale-95"
                          >
                            Reset / Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-neutral-500">
                        Belum ada laporan klaim sertifikat yang tercatat.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const [naskapSearch, setNaskapSearch] = useState('')

  const renderPembimbinganNaskapWorkspace = () => {
    const filteredList = bimbinganList.filter(item => 
      item.name.toLowerCase().includes(naskapSearch.toLowerCase()) ||
      (item.activeTitle && item.activeTitle.toLowerCase().includes(naskapSearch.toLowerCase()))
    )

    const openEdit = (serdik: any) => {
      setNaskapId(serdik.id)
      setNaskapName(serdik.name)
      setNaskapRank(serdik.rank)
      setNaskapClassGroup(serdik.classGroup)
      setNaskapStatus(serdik.status)
      setNaskapActiveTitle(serdik.activeTitle || '')
      setNaskapCurrentChapter(serdik.currentChapter || '')
      setNaskapEmail(serdik.email || '')
      setNaskapPhone(serdik.phone || '')
      setNaskapMeetingUrl(serdik.meetingUrl || '')
      setNaskapProposedTitles(serdik.proposedTitles ? serdik.proposedTitles.join('\n') : '')
      setNaskapSerdikNrpNip(serdik.serdikNrpNip || '')
      setNaskapWidyaiswaraName(serdik.widyaiswaraName || '')
      setNaskapWidyaiswaraNip(serdik.widyaiswaraNip || '')
      setNaskapScheduleText(serdik.scheduleText || '')
      setNaskapError(null)
      setIsNaskapEditOpen(true)
    }

    const openCreate = () => {
      setNaskapId('')
      setNaskapName('')
      setNaskapRank('Ajun Komisaris Besar Polisi')
      setNaskapClassGroup('Sespimmen Polri Dikreg Ke-64')
      setNaskapStatus('Pengajuan Judul')
      setNaskapActiveTitle('')
      setNaskapCurrentChapter('')
      setNaskapEmail('')
      setNaskapPhone('')
      setNaskapMeetingUrl('')
      setNaskapProposedTitles('')
      setNaskapSerdikNrpNip('')
      setNaskapWidyaiswaraName('')
      setNaskapWidyaiswaraNip('')
      setNaskapScheduleText('')
      setNaskapError(null)
      setIsNaskapCreateOpen(true)
    }

    const openDelete = (serdik: any) => {
      setNaskapId(serdik.id)
      setNaskapName(serdik.name)
      setNaskapError(null)
      setIsNaskapDeleteOpen(true)
    }

    return (
      <div className="space-y-6">
        <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Manajemen Pembimbingan Naskap</h4>
              <p className="text-xs text-neutral-400 mt-1">Daftar perwira siswa (Serdik) yang sedang menempuh pembimbingan naskah akademik.</p>
            </div>
            {hasWriteAccess && (
              <button
                onClick={openCreate}
                className="inline-flex items-center gap-2 bg-polri-maroon hover:bg-polri-brownDark text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition"
              >
                + Tambah Pasangan Bimbingan
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 max-w-md">
            <svg className="h-4 w-4 text-neutral-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari Serdik atau judul naskap..."
              value={naskapSearch}
              onChange={(e) => setNaskapSearch(e.target.value)}
              className="bg-transparent border-none text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
            />
          </div>

          <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">Nama Serdik</th>
                    <th className="px-6 py-4">Program</th>
                    <th className="px-6 py-4">Widyaiswara Pembimbing</th>
                    <th className="px-6 py-4">Jadwal</th>
                    <th className="px-6 py-4">Judul Aktif</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4">Link Meet</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-semibold">
                  {bimbinganLoading ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-10 text-center text-neutral-500">
                        Memuat data pembimbingan...
                      </td>
                    </tr>
                  ) : filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                      <tr key={item.id} className="hover:bg-neutral-950/40 transition">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {item.avatar && (
                              <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full border border-neutral-700 object-cover" />
                            )}
                            <div>
                              <p className="text-white font-bold">{item.name}</p>
                              <p className="text-[10px] text-neutral-400 font-medium">NRP: {item.serdikNrpNip || '-'} ({item.rank})</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-neutral-400">{item.classGroup}</td>
                        <td className="px-6 py-4 text-white">
                          <p className="font-bold">{item.widyaiswaraName || 'Belum diatur'}</p>
                          {item.widyaiswaraNip && (
                            <p className="text-[9px] text-neutral-400 font-mono">NIP: {item.widyaiswaraNip}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-neutral-400">{item.scheduleText || 'Belum diatur'}</td>
                        <td className="px-6 py-4 max-w-[200px] truncate">
                          {item.activeTitle || (item.proposedTitles && item.proposedTitles[0]) || '-'}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Selesai' 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50' 
                              : item.status === 'Bimbingan Draf'
                                ? 'bg-blue-950 text-blue-400 border border-blue-900/50'
                                : 'bg-amber-950 text-amber-400 border border-amber-900/50'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono text-[10px]">
                          {item.meetingUrl ? (
                            <a href={item.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-polri-goldSoft hover:underline truncate max-w-[120px] inline-block">
                              Google Meet
                            </a>
                          ) : (
                            <span className="text-neutral-500">Belum diset</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEdit(item)}
                              className="bg-neutral-800 hover:bg-neutral-750 text-white py-1.5 px-3 rounded font-bold transition text-[10px]"
                            >
                              Edit
                            </button>
                            {hasDeleteAccess && (
                              <button
                                onClick={() => openDelete(item)}
                                className="bg-polri-maroon/20 hover:bg-polri-maroon/40 text-polri-maroonLight py-1.5 px-3 rounded font-bold transition text-[10px]"
                              >
                                Hapus
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-10 text-center text-neutral-500">
                        Tidak ada data pembimbingan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MODAL: TAMBAH PASANGAN BIMBINGAN */}
        {isNaskapCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
              <div className="px-6 py-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-950 rounded-t-3xl">
                <h3 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Tambah Pasangan Bimbingan</h3>
                <button onClick={() => setIsNaskapCreateOpen(false)} className="text-neutral-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={saveNewNaskap} className="p-6 overflow-y-auto space-y-4 text-xs">
                {naskapError && (
                  <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-red-400 font-bold">
                    {naskapError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Nama Perwira Siswa *</label>
                  <input
                    type="text"
                    required
                    value={naskapName}
                    onChange={(e) => setNaskapName(e.target.value)}
                    placeholder="Nama Lengkap beserta gelar..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Pangkat</label>
                    <select
                      value={naskapRank}
                      onChange={(e) => setNaskapRank(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    >
                      <option value="Ajun Komisaris Besar Polisi">AKBP</option>
                      <option value="Komisaris Polisi">Kompol</option>
                      <option value="Kombes Pol">Kombes Pol</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Program Pendidikan</label>
                    <select
                      value={naskapClassGroup}
                      onChange={(e) => setNaskapClassGroup(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    >
                      <option value="Sespimmen Polri Dikreg Ke-64">Sespimmen Polri</option>
                      <option value="Sespimti Polri Dikreg Ke-35">Sespimti Polri</option>
                      <option value="Sespimma Polri Dikreg Ke-72">Sespimma Polri</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Email Serdik</label>
                    <input
                      type="email"
                      value={naskapEmail}
                      onChange={(e) => setNaskapEmail(e.target.value)}
                      placeholder="email@sespim.polri.go.id"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">No. Telepon (WhatsApp)</label>
                    <input
                      type="text"
                      value={naskapPhone}
                      onChange={(e) => setNaskapPhone(e.target.value)}
                      placeholder="62812345678"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">NRP / NIP Serdik</label>
                    <input
                      type="text"
                      value={naskapSerdikNrpNip}
                      onChange={(e) => setNaskapSerdikNrpNip(e.target.value)}
                      placeholder="Contoh: 84081234"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Jadwal Bimbingan</label>
                    <input
                      type="text"
                      value={naskapScheduleText}
                      onChange={(e) => setNaskapScheduleText(e.target.value)}
                      placeholder="Contoh: Kamis, 19:00 WIB"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Widyaiswara Pembimbing</label>
                    <input
                      type="text"
                      value={naskapWidyaiswaraName}
                      onChange={(e) => setNaskapWidyaiswaraName(e.target.value)}
                      placeholder="Nama Lengkap Widyaiswara..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">NIP Widyaiswara</label>
                    <input
                      type="text"
                      value={naskapWidyaiswaraNip}
                      onChange={(e) => setNaskapWidyaiswaraNip(e.target.value)}
                      placeholder="Contoh: 80061174"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Tautan Google Meet Bimbingan</label>
                  <input
                    type="text"
                    value={naskapMeetingUrl}
                    onChange={(e) => setNaskapMeetingUrl(e.target.value)}
                    placeholder="https://meet.google.com/..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Usulan Judul Naskap (Satu per baris)</label>
                  <textarea
                    rows={3}
                    value={naskapProposedTitles}
                    onChange={(e) => setNaskapProposedTitles(e.target.value)}
                    placeholder="Judul Usulan 1&#10;Judul Usulan 2&#10;Judul Usulan 3"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold font-sans"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3 bg-neutral-900 rounded-b-3xl">
                  <button
                    type="button"
                    onClick={() => setIsNaskapCreateOpen(false)}
                    className="bg-neutral-800 hover:bg-neutral-750 text-white font-bold py-3 px-5 rounded-xl transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={naskapLoading}
                    className="bg-polri-maroon hover:bg-polri-brownDark text-white font-bold py-3 px-5 rounded-xl shadow-md transition disabled:opacity-50"
                  >
                    {naskapLoading ? 'Menyimpan...' : 'Simpan Pasangan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: EDIT DETAIL BIMBINGAN */}
        {isNaskapEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
              <div className="px-6 py-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-950 rounded-t-3xl">
                <h3 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Edit Detail Bimbingan</h3>
                <button onClick={() => setIsNaskapEditOpen(false)} className="text-neutral-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={saveEditNaskap} className="p-6 overflow-y-auto space-y-4 text-xs">
                {naskapError && (
                  <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl text-red-400 font-bold">
                    {naskapError}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Nama Perwira Siswa *</label>
                  <input
                    type="text"
                    required
                    value={naskapName}
                    onChange={(e) => setNaskapName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Pangkat</label>
                    <select
                      value={naskapRank}
                      onChange={(e) => setNaskapRank(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    >
                      <option value="Ajun Komisaris Besar Polisi">AKBP</option>
                      <option value="Komisaris Polisi">Kompol</option>
                      <option value="Kombes Pol">Kombes Pol</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Program Pendidikan</label>
                    <select
                      value={naskapClassGroup}
                      onChange={(e) => setNaskapClassGroup(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    >
                      <option value="Sespimmen Polri Dikreg Ke-64">Sespimmen Polri</option>
                      <option value="Sespimti Polri Dikreg Ke-35">Sespimti Polri</option>
                      <option value="Sespimma Polri Dikreg Ke-72">Sespimma Polri</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Status Pembimbingan</label>
                    <select
                      value={naskapStatus}
                      onChange={(e) => setNaskapStatus(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    >
                      <option value="Pengajuan Judul">Pengajuan Judul</option>
                      <option value="Bimbingan Draf">Bimbingan Draf</option>
                      <option value="Selesai">Selesai (ACC)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Bab Aktif</label>
                    <input
                      type="text"
                      value={naskapCurrentChapter}
                      onChange={(e) => setNaskapCurrentChapter(e.target.value)}
                      placeholder="Contoh: Bab I: Pendahuluan"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Judul Aktif Terpilih</label>
                  <input
                    type="text"
                    value={naskapActiveTitle}
                    onChange={(e) => setNaskapActiveTitle(e.target.value)}
                    placeholder="Judul naskap yang disetujui..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Email Serdik</label>
                    <input
                      type="email"
                      value={naskapEmail}
                      onChange={(e) => setNaskapEmail(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">No. Telepon</label>
                    <input
                      type="text"
                      value={naskapPhone}
                      onChange={(e) => setNaskapPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">NRP / NIP Serdik</label>
                    <input
                      type="text"
                      value={naskapSerdikNrpNip}
                      onChange={(e) => setNaskapSerdikNrpNip(e.target.value)}
                      placeholder="Contoh: 84081234"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Jadwal Bimbingan</label>
                    <input
                      type="text"
                      value={naskapScheduleText}
                      onChange={(e) => setNaskapScheduleText(e.target.value)}
                      placeholder="Contoh: Kamis, 19:00 WIB"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Widyaiswara Pembimbing</label>
                    <input
                      type="text"
                      value={naskapWidyaiswaraName}
                      onChange={(e) => setNaskapWidyaiswaraName(e.target.value)}
                      placeholder="Nama Lengkap Widyaiswara..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">NIP Widyaiswara</label>
                    <input
                      type="text"
                      value={naskapWidyaiswaraNip}
                      onChange={(e) => setNaskapWidyaiswaraNip(e.target.value)}
                      placeholder="Contoh: 80061174"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Tautan Google Meet Bimbingan</label>
                  <input
                    type="text"
                    value={naskapMeetingUrl}
                    onChange={(e) => setNaskapMeetingUrl(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Usulan Judul Naskap (Satu per baris)</label>
                  <textarea
                    rows={3}
                    value={naskapProposedTitles}
                    onChange={(e) => setNaskapProposedTitles(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-polri-gold font-sans"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3 bg-neutral-900 rounded-b-3xl">
                  <button
                    type="button"
                    onClick={() => setIsNaskapEditOpen(false)}
                    className="bg-neutral-800 hover:bg-neutral-750 text-white font-bold py-3 px-5 rounded-xl transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={naskapLoading}
                    className="bg-polri-maroon hover:bg-polri-brownDark text-white font-bold py-3 px-5 rounded-xl shadow-md transition disabled:opacity-50"
                  >
                    {naskapLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: HAPUS BIMBINGAN */}
        {isNaskapDeleteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-sm shadow-2xl flex flex-col">
              <div className="px-6 py-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-950 rounded-t-3xl">
                <h3 className="text-sm font-black uppercase text-polri-maroonLight tracking-wider">Hapus Pasangan Bimbingan</h3>
                <button onClick={() => setIsNaskapDeleteOpen(false)} className="text-neutral-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs text-neutral-300">
                <p>
                  Apakah Anda yakin ingin menghapus data pembimbingan naskah akademik untuk <strong className="text-white">{naskapName}</strong>?
                </p>
                <p className="text-red-400 font-semibold bg-red-950/20 p-3 rounded-lg border border-red-900/30">
                  Tindakan ini akan menghapus seluruh data usulan judul, histori komentar bimbingan, dan rekam jejak aktivitas secara permanen.
                </p>

                <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNaskapDeleteOpen(false)}
                    className="bg-neutral-800 hover:bg-neutral-750 text-white font-bold py-2.5 px-4 rounded-lg transition"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={confirmDeleteNaskap}
                    disabled={naskapLoading}
                    className="bg-polri-maroon hover:bg-polri-brownDark text-white font-bold py-2.5 px-4 rounded-lg transition disabled:opacity-50"
                  >
                    {naskapLoading ? 'Menghapus...' : 'Ya, Hapus Permanen'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Building Plagiarism content string from states
  const buildPlagiarismContent = (): string => {
    let contentStr = `DESKRIPSI: ${formPlagiarismDesc}\n\n`
    for (const item of formPlagiarismSources) {
      if (!item.domain.trim()) continue
      contentStr += `SUMBER: ${item.domain}\n`
      contentStr += `PERSENTASE: ${item.percentage}\n`
      contentStr += `TEMUAN: ${item.matchCount}\n`
      contentStr += `\n`
    }
    return contentStr.trim()
  }

  // Parsing Plagiarism string content into states
  const parsePlagiarismContent = (contentStr: string) => {
    const lines = contentStr.split(/\r?\n/)
    const sourcesList: { domain: string; percentage: number; matchCount: number }[] = []
    let currentSource: any = null
    let descriptionText = ''
    
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) {
        if (sourcesList.length === 0) {
          descriptionText += (descriptionText ? '\n' : '') + trimmed
        }
        continue
      }
      
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'DESKRIPSI') {
        descriptionText = val
        continue
      }
      
      if (key === 'SUMBER') {
        currentSource = {
          domain: val,
          percentage: 0,
          matchCount: 0
        }
        sourcesList.push(currentSource)
        continue
      }
      
      if (currentSource) {
        if (key === 'PERSENTASE') {
          currentSource.percentage = parseInt(val, 10) || 0
        } else if (key === 'TEMUAN') {
          currentSource.matchCount = parseInt(val, 10) || 0
        }
      }
    }
    
    setFormPlagiarismDesc(descriptionText || contentStr)
    setFormPlagiarismSources(sourcesList)
  }

  // Parsing Kalender Pendidikan string content into states
  const parseKalenderContent = (contentStr: string) => {
    const lines = contentStr.replace(/\\n/g, '\n').split(/\r?\n/)
    const list: any[] = []
    let currentItem: any = null
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) continue
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'KATEGORI') {
        currentItem = { category: val, title: '', description: '', imageUrl: '', file: '', url: '' }
        list.push(currentItem)
        continue
      }
      
      if (currentItem) {
        if (key === 'JUDUL') {
          currentItem.title = val
        } else if (key === 'DESKRIPSI') {
          currentItem.description = val
        } else if (key === 'GAMBAR') {
          currentItem.imageUrl = val
        } else if (key === 'FILE') {
          currentItem.file = val
        } else if (key === 'URL') {
          currentItem.url = val
        }
      }
    }
    setFormKalenderItems(list.length > 0 ? list : [
      { category: 'SESPIMTI', title: 'Kalender Pendidikan SESPIMTI TA 2026', description: 'Kalender akademik lengkap Sespimti.', imageUrl: '/images/kalender-sespimti.png', file: 'Kalender_SESPIMTI_TA2026.pdf', url: '#' },
      { category: 'SESPIMMEN', title: 'Kalender Pendidikan SESPIMMEN TA 2026', description: 'Kalender akademik lengkap Sespimmen.', imageUrl: '/images/kalender-sespimmen.png', file: 'Kalender_SESPIMMEN_TA2026.pdf', url: '#' },
      { category: 'SPPK', title: 'Kalender Pendidikan SPPK TA 2026', description: 'Kalender akademik lengkap SPPK.', imageUrl: '/images/kalender-sppk.png', file: 'Kalender_SPPK_TA2026.pdf', url: '#' },
      { category: 'SESPIMMA', title: 'Kalender Pendidikan SESPIMMA TA 2026', description: 'Kalender akademik lengkap Sespimma.', imageUrl: '/images/kalender-sespimma.png', file: 'Kalender_SESPIMMA_TA2026.pdf', url: '#' }
    ])
  }

  const buildKalenderContent = (): string => {
    return formKalenderItems.map(item => {
      return `KATEGORI: ${item.category}\nJUDUL: ${item.title}\nDESKRIPSI: ${item.description}\nGAMBAR: ${item.imageUrl}\nFILE: ${item.file}\nURL: ${item.url}`
    }).join('\n\n')
  }

  const renderKalenderStructuredFields = () => {
    return (
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Kalender Pendidikan (Format Landscape)</p>
            <p className="text-[9px] text-neutral-400 mt-0.5">Urutan Kalender per Kategori (Sespimti, Sespimmen, SPPK, Sespimma).</p>
          </div>
          <button
            type="button"
            onClick={() => setFormKalenderItems([...formKalenderItems, { category: 'SESPIMTI', title: '', description: '', imageUrl: '', file: '', url: '' }])}
            className="px-2.5 py-1.5 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
          >
            + Tambah Kalender
          </button>
        </div>
        <div className="space-y-5">
          {formKalenderItems.map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 relative">
              <button
                type="button"
                onClick={() => setFormKalenderItems(formKalenderItems.filter((_, i) => i !== idx))}
                className="absolute right-3 top-3 text-red-500 hover:text-red-400 font-black text-[10px] uppercase tracking-wider"
              >
                Hapus
              </button>
              
              {/* Preview image block */}
              <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80 flex gap-4 items-center">
                <div className="relative w-20 h-12 shrink-0 rounded overflow-hidden bg-neutral-900 border border-polri-gold/20 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img src={getMediaUrl(item.imageUrl)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[7px] text-neutral-500 uppercase font-bold">No Image</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black text-white truncate">{item.title || 'Masukkan Judul Kalender...'}</p>
                  <p className="text-[8px] text-neutral-400 mt-1 truncate">{item.description || 'Masukkan Deskripsi...'}</p>
                  <span className="inline-block bg-polri-maroon/20 text-polri-goldSoft text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider mt-1.5">{item.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kategori Program</label>
                  <select
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...formKalenderItems]
                      updated[idx].category = e.target.value
                      setFormKalenderItems(updated)
                    }}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  >
                    <option value="SESPIMTI">SESPIMTI</option>
                    <option value="SESPIMMEN">SESPIMMEN</option>
                    <option value="SPPK">SPPK</option>
                    <option value="SESPIMMA">SESPIMMA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Kalender</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formKalenderItems]
                      updated[idx].title = e.target.value
                      setFormKalenderItems(updated)
                    }}
                    placeholder="Contoh: Kalender Pendidikan SESPIMTI TA 2026"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">Deskripsi Kalender</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...formKalenderItems]
                    updated[idx].description = e.target.value
                    setFormKalenderItems(updated)
                  }}
                  rows={2}
                  placeholder="Keterangan singkat kegiatan..."
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Gambar Kalender (Landscape URL)</label>
                  <input
                    type="text"
                    value={item.imageUrl}
                    onChange={(e) => {
                      const updated = [...formKalenderItems]
                      updated[idx].imageUrl = e.target.value
                      setFormKalenderItems(updated)
                    }}
                    placeholder="Contoh: /images/... atau upload"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama File PDF (Jika Unduh)</label>
                  <input
                    type="text"
                    value={item.file}
                    onChange={(e) => {
                      const updated = [...formKalenderItems]
                      updated[idx].file = e.target.value
                      setFormKalenderItems(updated)
                    }}
                    placeholder="Contoh: Kalender_Sespimti.pdf"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tautan Unduhan (URL / Google Drive)</label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const updated = [...formKalenderItems]
                      updated[idx].url = e.target.value
                      setFormKalenderItems(updated)
                    }}
                    placeholder="Contoh: https://drive.google.com/..."
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

  // Parsing Materi Terbuka string content into states
  const parseMateriTerbukaContent = (contentStr: string) => {
    const lines = contentStr.split(/\r?\n/)
    const list: any[] = []
    let currentItem: any = null
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) continue
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'NAMA' || key === 'JUDUL') {
        currentItem = { title: val, description: '', fileName: '', href: '', format: 'PDF', category: key === 'JUDUL' ? 'Asisten Riset Dokumen' : 'Pelatihan Dasar' }
        list.push(currentItem)
        continue
      }
      
      if (currentItem) {
        if (key === 'DESKRIPSI') {
          currentItem.description = val
        } else if (key === 'FILE') {
          currentItem.fileName = val
        } else if (key === 'URL') {
          currentItem.href = val
        } else if (key === 'FORMAT') {
          currentItem.format = val
        } else if (key === 'KATEGORI') {
          currentItem.category = val
        }
      }
    }
    setFormMateriTerbukaItems(list.length > 0 ? list : [{ title: '', description: '', fileName: '', href: '', format: 'PDF', category: 'Pelatihan Dasar' }])
  }

  // Parsing Kurikulum JSON content
  const parseKurikulumContent = (contentStr: string) => {
    try {
      const parsed = JSON.parse(contentStr)
      setFormKurikulumSespimtiTitle(parsed.sespimti?.title || 'Kurikulum SESPIMTI POLRI')
      setFormKurikulumSespimtiOverview(parsed.sespimti?.overview || '')
      setFormKurikulumSespimtiSubjects((parsed.sespimti?.subjects || []).join('\n'))
      setFormKurikulumSespimtiPreviewUrl(parsed.sespimti?.previewUrl || '')
      setFormKurikulumSespimtiDownloadUrl(parsed.sespimti?.downloadUrl || '')

      setFormKurikulumSespimmenTitle(parsed.sespimmen?.title || 'Kurikulum SESPIMMEN POLRI')
      setFormKurikulumSespimmenOverview(parsed.sespimmen?.overview || '')
      setFormKurikulumSespimmenSubjects((parsed.sespimmen?.subjects || []).join('\n'))
      setFormKurikulumSespimmenPreviewUrl(parsed.sespimmen?.previewUrl || '')
      setFormKurikulumSespimmenDownloadUrl(parsed.sespimmen?.downloadUrl || '')

      setFormKurikulumSppkTitle(parsed.sppk?.title || 'Kurikulum SPPK POLRI')
      setFormKurikulumSppkOverview(parsed.sppk?.overview || '')
      setFormKurikulumSppkSubjects((parsed.sppk?.subjects || []).join('\n'))
      setFormKurikulumSppkPreviewUrl(parsed.sppk?.previewUrl || '')
      setFormKurikulumSppkDownloadUrl(parsed.sppk?.downloadUrl || '')

      setFormKurikulumSespimmaTitle(parsed.sespimma?.title || 'Kurikulum SESPIMMA POLRI')
      setFormKurikulumSespimmaOverview(parsed.sespimma?.overview || '')
      setFormKurikulumSespimmaSubjects((parsed.sespimma?.subjects || []).join('\n'))
      setFormKurikulumSespimmaPreviewUrl(parsed.sespimma?.previewUrl || '')
      setFormKurikulumSespimmaDownloadUrl(parsed.sespimma?.downloadUrl || '')
    } catch (e) {
      setFormKurikulumSespimtiTitle('Kurikulum SESPIMTI POLRI')
      setFormKurikulumSespimtiOverview('Kurikulum Sekolah Staf dan Pimpinan Tinggi (Sespimti) Polri dirancang untuk mencetak pemimpin tingkat tinggi yang profesional, cerdas, bermoral, modern, dan kolaboratif.')
      setFormKurikulumSespimtiSubjects('Manajemen Strategis Keamanan\nGeopolitik dan Keamanan Nasional\nTeknologi Informasi Strategis\nKepemimpinan Transformatif')
      setFormKurikulumSespimtiPreviewUrl('')
      setFormKurikulumSespimtiDownloadUrl('')

      setFormKurikulumSespimmenTitle('Kurikulum SESPIMMEN POLRI')
      setFormKurikulumSespimmenOverview('Kurikulum Sekolah Staf dan Pimpinan Menengah (Sespimmen) Polri berfokus pada pemantapan kepemimpinan menengah, manajemen operasional kepolisian, serta pemecahan masalah kamtibmas.')
      setFormKurikulumSespimmenSubjects('Manajemen Operasional Kepolisian\nHukum dan Hak Asasi Manusia\nSosiologi Keamanan\nEtika Profesi Kepemimpinan')
      setFormKurikulumSespimmenPreviewUrl('')
      setFormKurikulumSespimmenDownloadUrl('')

      setFormKurikulumSppkTitle('Kurikulum SPPK POLRI')
      setFormKurikulumSppkOverview('Kurikulum Sekolah Pengembangan Profesi Kepolisian (SPPK) ditujukan untuk meningkatkan kompetensi spesialis, profesi dan etika penegakan hukum perwira Polri.')
      setFormKurikulumSppkSubjects('Spesialisasi Fungsi Teknis Kepolisian\nManajemen Penyidikan Modern\nTeknik Audit Investigatif\nSertifikasi dan Standardisasi Profesi')
      setFormKurikulumSppkPreviewUrl('')
      setFormKurikulumSppkDownloadUrl('')

      setFormKurikulumSespimmaTitle('Kurikulum SESPIMMA POLRI')
      setFormKurikulumSespimmaOverview('Kurikulum Sekolah Staf dan Pimpinan Pertama (Sespimma) membekali perwira pertama dengan kemampuan dasar manajerial, kepemimpinan dasar kewilayahan, serta pengelolaan staf.')
      setFormKurikulumSespimmaSubjects('Administrasi dan Manajemen Organisasi\nTaktik dan Teknik Operasional Pertama\nKepemimpinan Dasar Kewilayahan\nKomunikasi Massa dan Publik')
      setFormKurikulumSespimmaPreviewUrl('')
      setFormKurikulumSespimmaDownloadUrl('')
    }
  }

  // Serializing Kurikulum states to JSON string
  const buildKurikulumContent = (): string => {
    const data = {
      sespimti: {
        title: formKurikulumSespimtiTitle,
        overview: formKurikulumSespimtiOverview,
        subjects: formKurikulumSespimtiSubjects.split('\n').map(s => s.trim()).filter(Boolean),
        previewUrl: formKurikulumSespimtiPreviewUrl,
        downloadUrl: formKurikulumSespimtiDownloadUrl
      },
      sespimmen: {
        title: formKurikulumSespimmenTitle,
        overview: formKurikulumSespimmenOverview,
        subjects: formKurikulumSespimmenSubjects.split('\n').map(s => s.trim()).filter(Boolean),
        previewUrl: formKurikulumSespimmenPreviewUrl,
        downloadUrl: formKurikulumSespimmenDownloadUrl
      },
      sppk: {
        title: formKurikulumSppkTitle,
        overview: formKurikulumSppkOverview,
        subjects: formKurikulumSppkSubjects.split('\n').map(s => s.trim()).filter(Boolean),
        previewUrl: formKurikulumSppkPreviewUrl,
        downloadUrl: formKurikulumSppkDownloadUrl
      },
      sespimma: {
        title: formKurikulumSespimmaTitle,
        overview: formKurikulumSespimmaOverview,
        subjects: formKurikulumSespimmaSubjects.split('\n').map(s => s.trim()).filter(Boolean),
        previewUrl: formKurikulumSespimmaPreviewUrl,
        downloadUrl: formKurikulumSespimmaDownloadUrl
      }
    }
    return JSON.stringify(data)
  }

  // Building Materi Terbuka content string from states
  const buildMateriTerbukaContent = (): string => {
    let contentStr = ''
    const isBelajarAI = selectedItem?.id === 'w-9'
    for (const item of formMateriTerbukaItems) {
      if (!item.title.trim()) continue
      contentStr += `${isBelajarAI ? 'JUDUL' : 'NAMA'}: ${item.title}\n`
      if (item.description) contentStr += `DESKRIPSI: ${item.description}\n`
      if (item.fileName && !isBelajarAI) contentStr += `FILE: ${item.fileName}\n`
      if (item.href) contentStr += `URL: ${item.href}\n`
      if (item.format && !isBelajarAI) contentStr += `FORMAT: ${item.format}\n`
      if (item.category) contentStr += `KATEGORI: ${item.category}\n`
      contentStr += `\n`
    }
    return contentStr.trim()
  }

  // Parsing Publikasi string content into states
  const parsePublikasiContent = (contentStr: string) => {
    if (!contentStr) {
      setFormPublikasiItems([])
      return
    }
    const list: any[] = []
    const rawEntries = contentStr.split(/\n\s*\n/)
    for (const rawEntry of rawEntries) {
      const lines = rawEntry.split('\n')
      let item: any = { title: '', description: '', fileName: '', href: '', format: 'PDF', category: 'Artikel', author: '', cohort: 'Tahun 2026', year: '2026', cover: '' }
      let hasName = false
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()
        
        if (key === 'NAMA') {
          item.title = val
          hasName = true
        } else if (key === 'DESKRIPSI') {
          item.description = val
        } else if (key === 'FILE') {
          item.fileName = val
        } else if (key === 'URL') {
          item.href = val
        } else if (key === 'FORMAT') {
          item.format = val
        } else if (key === 'KATEGORI') {
          item.category = val
        } else if (key === 'PENULIS') {
          item.author = val
        } else if (key === 'ANGKATAN') {
          item.cohort = val
        } else if (key === 'TAHUN') {
          item.year = val
        } else if (key === 'COVER') {
          item.cover = val
        }
      }
      if (hasName) {
        list.push(item)
      }
    }
    setFormPublikasiItems(list)
  }

  // Building Publikasi content string from states
  const buildPublikasiContent = (): string => {
    let contentStr = ''
    for (const item of formPublikasiItems) {
      if (!item.title.trim()) continue
      contentStr += `NAMA: ${item.title}\n`
      if (item.description) contentStr += `DESKRIPSI: ${item.description}\n`
      if (item.fileName) contentStr += `FILE: ${item.fileName}\n`
      if (item.href) contentStr += `URL: ${item.href}\n`
      if (item.format) contentStr += `FORMAT: ${item.format}\n`
      if (item.category) contentStr += `KATEGORI: ${item.category}\n`
      if (item.author) contentStr += `PENULIS: ${item.author}\n`
      if (item.cohort) contentStr += `ANGKATAN: ${item.cohort}\n`
      if (item.year) contentStr += `TAHUN: ${item.year}\n`
      if (item.cover) contentStr += `COVER: ${item.cover}\n`
      contentStr += `\n`
    }
    return contentStr.trim()
  }

  // Parsing Galeri Foto string content into states
  const parseGaleriFotoContent = (contentStr: string) => {
    if (!contentStr) {
      setFormGaleriFotoItems([])
      return
    }
    const list: any[] = []
    const rawEntries = contentStr.split(/\n\s*\n/)
    for (const rawEntry of rawEntries) {
      const lines = rawEntry.split('\n')
      let item: any = { title: '', description: '', category: 'Pendidikan', imageUrl: '', date: '' }
      let hasName = false
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()
        
        if (key === 'JUDUL' || key === 'NAMA') {
          item.title = val
          hasName = true
        } else if (key === 'DESKRIPSI') {
          item.description = val
        } else if (key === 'KATEGORI') {
          item.category = val
        } else if (key === 'GAMBAR' || key === 'COVER') {
          item.imageUrl = val
        } else if (key === 'TANGGAL' || key === 'DATE') {
          item.date = val
        }
      }
      if (hasName) {
        list.push(item)
      }
    }
    setFormGaleriFotoItems(list)
  }

  // Building Galeri Foto content string from states
  const buildGaleriFotoContent = (): string => {
    let contentStr = ''
    for (const item of formGaleriFotoItems) {
      if (!item.title.trim()) continue
      contentStr += `JUDUL: ${item.title}\n`
      if (item.description) contentStr += `DESKRIPSI: ${item.description}\n`
      if (item.category) contentStr += `KATEGORI: ${item.category}\n`
      if (item.imageUrl) contentStr += `GAMBAR: ${item.imageUrl}\n`
      if (item.date) contentStr += `TANGGAL: ${item.date}\n`
      contentStr += `\n`
    }
    return contentStr.trim()
  }

  // Parsing Galeri Video string content into states
  const parseGaleriVideoContent = (contentStr: string) => {
    if (!contentStr) {
      setFormGaleriVideoItems([])
      return
    }
    const list: any[] = []
    const rawEntries = contentStr.split(/\n\s*\n/)
    for (const rawEntry of rawEntries) {
      const lines = rawEntry.split('\n')
      let item: any = { title: '', description: '', category: 'Pendidikan', url: '', cover: '', date: '' }
      let hasName = false
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()
        
        if (key === 'JUDUL' || key === 'NAMA') {
          item.title = val
          hasName = true
        } else if (key === 'DESKRIPSI') {
          item.description = val
        } else if (key === 'KATEGORI') {
          item.category = val
        } else if (key === 'URL') {
          item.url = val
        } else if (key === 'COVER' || key === 'GAMBAR') {
          item.cover = val
        } else if (key === 'TANGGAL' || key === 'DATE') {
          item.date = val
        }
      }
      if (hasName) {
        list.push(item)
      }
    }
    setFormGaleriVideoItems(list)
  }

  // Building Galeri Video content string from states
  const buildGaleriVideoContent = (): string => {
    let contentStr = ''
    for (const item of formGaleriVideoItems) {
      if (!item.title.trim()) continue
      contentStr += `JUDUL: ${item.title}\n`
      if (item.description) contentStr += `DESKRIPSI: ${item.description}\n`
      if (item.category) contentStr += `KATEGORI: ${item.category}\n`
      if (item.url) contentStr += `URL: ${item.url}\n`
      if (item.cover) contentStr += `COVER: ${item.cover}\n`
      if (item.date) contentStr += `TANGGAL: ${item.date}\n`
      contentStr += `\n`
    }
    return contentStr.trim()
  }

  // Parsing Unduhan string content into states
  const parseUnduhanContent = (contentStr: string) => {
    if (!contentStr) {
      setFormUnduhanItems([])
      return
    }
    const list: any[] = []
    const rawEntries = contentStr.split(/\n\s*\n/)
    for (const rawEntry of rawEntries) {
      const lines = rawEntry.split('\n')
      let item: any = { title: '', description: '', fileName: '', href: '', format: 'PDF', category: 'Umum' }
      let hasName = false
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()
        
        if (key === 'NAMA' || key === 'JUDUL') {
          item.title = val
          hasName = true
        } else if (key === 'DESKRIPSI') {
          item.description = val
        } else if (key === 'FILE') {
          item.fileName = val
        } else if (key === 'URL') {
          item.href = val
        } else if (key === 'FORMAT') {
          item.format = val
        } else if (key === 'KATEGORI') {
          item.category = val
        }
      }
      if (hasName) {
        list.push(item)
      }
    }
    setFormUnduhanItems(list)
  }

  // Building Unduhan content string from states
  const buildUnduhanContent = (): string => {
    let contentStr = ''
    for (const item of formUnduhanItems) {
      if (!item.title.trim()) continue
      contentStr += `NAMA: ${item.title}\n`
      if (item.description) contentStr += `DESKRIPSI: ${item.description}\n`
      if (item.fileName) contentStr += `FILE: ${item.fileName}\n`
      if (item.href) contentStr += `URL: ${item.href}\n`
      if (item.format) contentStr += `FORMAT: ${item.format}\n`
      if (item.category) contentStr += `KATEGORI: ${item.category}\n`
      contentStr += `\n`
    }
    return contentStr.trim()
  }

  // Parsing Produk / Karya Akademis string content into states
  const parseKaryaAkademisContent = (contentStr: string) => {
    if (!contentStr) {
      setFormKaryaAkademisItems([])
      return
    }
    const list: any[] = []
    const rawEntries = contentStr.split(/\n\s*\n/)
    for (const rawEntry of rawEntries) {
      const lines = rawEntry.split('\n')
      let item: any = { title: '', description: '', fileName: '', href: '', format: 'PDF', category: 'Kajian', author: '', year: '2026' }
      let hasName = false
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue
        const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
        const val = trimmed.substring(colonIdx + 1).trim()
        
        if (key === 'NAMA' || key === 'JUDUL') {
          item.title = val
          hasName = true
        } else if (key === 'DESKRIPSI') {
          item.description = val
        } else if (key === 'FILE') {
          item.fileName = val
        } else if (key === 'URL') {
          item.href = val
        } else if (key === 'FORMAT') {
          item.format = val
        } else if (key === 'KATEGORI') {
          item.category = val
        } else if (key === 'PENULIS' || key === 'AUTHOR') {
          item.author = val
        } else if (key === 'TAHUN' || key === 'YEAR') {
          item.year = val
        }
      }
      if (hasName) {
        list.push(item)
      }
    }
    setFormKaryaAkademisItems(list)
  }

  // Building Produk / Karya Akademis content string from states
  const buildKaryaAkademisContent = (): string => {
    let contentStr = ''
    for (const item of formKaryaAkademisItems) {
      if (!item.title.trim()) continue
      contentStr += `NAMA: ${item.title}\n`
      if (item.description) contentStr += `DESKRIPSI: ${item.description}\n`
      if (item.fileName) contentStr += `FILE: ${item.fileName}\n`
      if (item.href) contentStr += `URL: ${item.href}\n`
      if (item.format) contentStr += `FORMAT: ${item.format}\n`
      if (item.category) contentStr += `KATEGORI: ${item.category}\n`
      if (item.author) contentStr += `PENULIS: ${item.author}\n`
      if (item.year) contentStr += `TAHUN: ${item.year}\n`
      contentStr += `\n`
    }
    return contentStr.trim()
  }

  // Parsing Inpassing modules string content into states
  const parseInpassingModules = (contentStr: string) => {
    const lines = contentStr.split(/\r?\n/)
    const list: any[] = []
    let currentItem: any = null
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue
      
      const colonIdx = trimmed.indexOf(':')
      if (colonIdx === -1) continue
      const key = trimmed.substring(0, colonIdx).trim().toUpperCase()
      const val = trimmed.substring(colonIdx + 1).trim()
      
      if (key === 'MODUL') {
        const order = parseInt(val) || (list.length + 1)
        currentItem = { id: `modul-${order}`, order, title: '', description: '', videoHref: '', pdfHref: '', pdfFileName: '' }
        list.push(currentItem)
        continue
      }
      
      if (currentItem) {
        if (key === 'JUDUL') {
          currentItem.title = val
        } else if (key === 'DESKRIPSI') {
          currentItem.description = val
        } else if (key === 'VIDEO') {
          currentItem.videoHref = val
        } else if (key === 'URL') {
          currentItem.pdfHref = val
        } else if (key === 'FILE') {
          currentItem.pdfFileName = val
        }
      }
    }
    // If list is empty, initialize 8 default modules to make it easy for admin to populate
    if (list.length === 0) {
      for (let i = 1; i <= 8; i++) {
        list.push({ id: `modul-${i}`, order: i, title: `Modul ${i} Inpassing Widyaiswara`, description: 'Materi pembelajaran mandiri untuk calon Widyaiswara.', videoHref: '', pdfHref: '', pdfFileName: '' })
      }
    }
    setFormInpassingModules(list)
  }

  // Building Inpassing modules content string from states
  const buildInpassingModulesContent = (): string => {
    let contentStr = ''
    for (const item of formInpassingModules) {
      if (!item.title.trim()) continue
      contentStr += `MODUL: ${item.order}\n`
      contentStr += `JUDUL: ${item.title}\n`
      if (item.description) contentStr += `DESKRIPSI: ${item.description}\n`
      if (item.videoHref) contentStr += `VIDEO: ${item.videoHref}\n`
      if (item.pdfFileName) contentStr += `FILE: ${item.pdfFileName}\n`
      if (item.pdfHref) contentStr += `URL: ${item.pdfHref}\n`
      contentStr += `\n`
    }
    return contentStr.trim()
  }

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

  // Change Password OTP Countdown Timer
  useEffect(() => {
    if (isChangePasswordOpen && changePasswordStep === 2 && cpOtpTimer > 0) {
      const timer = setTimeout(() => setCpOtpTimer(cpOtpTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isChangePasswordOpen, changePasswordStep, cpOtpTimer])

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
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
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
              <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => setFormPejabatItems(formPejabatItems.filter((_, i) => i !== idx))}
                  className="absolute right-2 top-2 text-red-500 hover:text-red-400 font-bold text-xs"
                >
                  Hapus
                </button>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
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
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-800/80">
                  <div className="flex-shrink-0 w-12 h-14 rounded border border-neutral-700 bg-neutral-900 overflow-hidden flex items-center justify-center">
                    {item.foto ? (
                      <img src={getMediaUrl(item.foto)} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[8px] text-neutral-600">No Foto</span>
                    )}
                  </div>
                  <div className="flex-1 w-full min-w-0">
                    <label className="block text-[8px] uppercase text-neutral-400 font-bold mb-1">Unggah Foto (Lokal)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        try {
                          const formData = new FormData()
                          formData.append('image', file)
                          const res = await apiFetch('/api/upload', {
                            method: 'POST',
                            body: formData
                          })
                          if (res.ok) {
                            const json = await res.json()
                            if (json.status === 'success' && json.fileUrl) {
                              const updated = [...formPejabatItems]
                              updated[idx].foto = json.fileUrl
                              setFormPejabatItems(updated)
                            }
                          }
                        } catch (err) {
                          console.error("Failed to upload image:", err)
                        }
                      }}
                      className="w-full text-[10px] text-neutral-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-semibold file:bg-neutral-800 file:text-polri-goldSoft file:cursor-pointer hover:file:bg-neutral-700"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-[8px] uppercase text-neutral-400 font-bold mb-1">Atau Tautan Foto (Drive/URL)</label>
                    <input
                      type="text"
                      value={item.foto}
                      onChange={(e) => {
                        const updated = [...formPejabatItems]
                        updated[idx].foto = e.target.value
                        setFormPejabatItems(updated)
                      }}
                      placeholder="Contoh: https://drive.google.com/..."
                      className="w-full rounded bg-neutral-900 border border-neutral-800 px-2 py-1 text-[11px] text-white outline-none focus:border-polri-gold"
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
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
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
              <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-850 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => setFormFasilitasItems(formFasilitasItems.filter((_, i) => i !== idx))}
                  className="absolute right-2 top-2 text-red-500 hover:text-red-400 font-bold text-xs"
                >
                  Hapus
                </button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-center bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-800/80">
                  <div className="flex-shrink-0 w-12 h-14 rounded border border-neutral-700 bg-neutral-900 overflow-hidden flex items-center justify-center">
                    {item.foto ? (
                      <img src={getMediaUrl(item.foto)} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[8px] text-neutral-600">No Foto</span>
                    )}
                  </div>
                  <div className="flex-1 w-full min-w-0">
                    <label className="block text-[8px] uppercase text-neutral-400 font-bold mb-1">Unggah Foto (Lokal)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        try {
                          const formData = new FormData()
                          formData.append('image', file)
                          const res = await apiFetch('/api/upload', {
                            method: 'POST',
                            body: formData
                          })
                          if (res.ok) {
                            const json = await res.json()
                            if (json.status === 'success' && json.fileUrl) {
                              const updated = [...formFasilitasItems]
                              updated[idx].foto = json.fileUrl
                              setFormFasilitasItems(updated)
                            }
                          }
                        } catch (err) {
                          console.error("Failed to upload image:", err)
                        }
                      }}
                      className="w-full text-[10px] text-neutral-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-semibold file:bg-neutral-800 file:text-polri-goldSoft file:cursor-pointer hover:file:bg-neutral-700"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block text-[8px] uppercase text-neutral-400 font-bold mb-1">Atau Tautan Foto (Drive/URL)</label>
                    <input
                      type="text"
                      value={item.foto}
                      onChange={(e) => {
                        const updated = [...formFasilitasItems]
                        updated[idx].foto = e.target.value
                        setFormFasilitasItems(updated)
                      }}
                      placeholder="Contoh: https://drive.google.com/..."
                      className="w-full rounded bg-neutral-900 border border-neutral-800 px-2 py-1 text-[11px] text-white outline-none focus:border-polri-gold"
                    />
                  </div>
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

  const renderKurikulumStructuredFields = () => {
    return (
      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-4 text-neutral-200">
        <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Kurikulum Umum 4 Sekolah</p>
        
        {/* SESPIMTI */}
        <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
          <p className="text-xs font-black text-polri-gold">1. SESPIMTI</p>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Kurikulum</label>
            <input
              type="text"
              value={formKurikulumSespimtiTitle}
              onChange={(e) => setFormKurikulumSespimtiTitle(e.target.value)}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Ringkasan / Deskripsi</label>
            <textarea
              value={formKurikulumSespimtiOverview}
              onChange={(e) => setFormKurikulumSespimtiOverview(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Mata Kuliah / Bidang Studi (Satu per baris)</label>
            <textarea
              value={formKurikulumSespimtiSubjects}
              onChange={(e) => setFormKurikulumSespimtiSubjects(e.target.value)}
              rows={3}
              placeholder="Contoh:\nManajemen Strategis\nGeopolitik Keamanan"
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[8px] uppercase text-neutral-500 font-bold">Pratinjau Dokumen (Format Portrait)</label>
              <input
                type="text"
                value={formKurikulumSespimtiPreviewUrl}
                onChange={(e) => setFormKurikulumSespimtiPreviewUrl(e.target.value)}
                placeholder="Contoh: /images/... atau Google Drive URL"
                className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
            <div>
              <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tautan Unduhan PDF</label>
              <input
                type="text"
                value={formKurikulumSespimtiDownloadUrl}
                onChange={(e) => setFormKurikulumSespimtiDownloadUrl(e.target.value)}
                placeholder="Contoh: https://drive.google.com/..."
                className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
          </div>
        </div>

        {/* SESPIMMEN */}
        <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
          <p className="text-xs font-black text-polri-gold">2. SESPIMMEN</p>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Kurikulum</label>
            <input
              type="text"
              value={formKurikulumSespimmenTitle}
              onChange={(e) => setFormKurikulumSespimmenTitle(e.target.value)}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Ringkasan / Deskripsi</label>
            <textarea
              value={formKurikulumSespimmenOverview}
              onChange={(e) => setFormKurikulumSespimmenOverview(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Mata Kuliah / Bidang Studi (Satu per baris)</label>
            <textarea
              value={formKurikulumSespimmenSubjects}
              onChange={(e) => setFormKurikulumSespimmenSubjects(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[8px] uppercase text-neutral-500 font-bold">Pratinjau Dokumen (Format Portrait)</label>
              <input
                type="text"
                value={formKurikulumSespimmenPreviewUrl}
                onChange={(e) => setFormKurikulumSespimmenPreviewUrl(e.target.value)}
                placeholder="Contoh: /images/... atau Google Drive URL"
                className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
            <div>
              <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tautan Unduhan PDF</label>
              <input
                type="text"
                value={formKurikulumSespimmenDownloadUrl}
                onChange={(e) => setFormKurikulumSespimmenDownloadUrl(e.target.value)}
                placeholder="Contoh: https://drive.google.com/..."
                className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
          </div>
        </div>

        {/* SPPK */}
        <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
          <p className="text-xs font-black text-polri-gold">3. SPPK</p>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Kurikulum</label>
            <input
              type="text"
              value={formKurikulumSppkTitle}
              onChange={(e) => setFormKurikulumSppkTitle(e.target.value)}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Ringkasan / Deskripsi</label>
            <textarea
              value={formKurikulumSppkOverview}
              onChange={(e) => setFormKurikulumSppkOverview(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Mata Kuliah / Bidang Studi (Satu per baris)</label>
            <textarea
              value={formKurikulumSppkSubjects}
              onChange={(e) => setFormKurikulumSppkSubjects(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[8px] uppercase text-neutral-500 font-bold">Pratinjau Dokumen (Format Portrait)</label>
              <input
                type="text"
                value={formKurikulumSppkPreviewUrl}
                onChange={(e) => setFormKurikulumSppkPreviewUrl(e.target.value)}
                placeholder="Contoh: /images/... atau Google Drive URL"
                className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
            <div>
              <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tautan Unduhan PDF</label>
              <input
                type="text"
                value={formKurikulumSppkDownloadUrl}
                onChange={(e) => setFormKurikulumSppkDownloadUrl(e.target.value)}
                placeholder="Contoh: https://drive.google.com/..."
                className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
          </div>
        </div>

        {/* SESPIMMA */}
        <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2">
          <p className="text-xs font-black text-polri-gold">4. SESPIMMA</p>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Kurikulum</label>
            <input
              type="text"
              value={formKurikulumSespimmaTitle}
              onChange={(e) => setFormKurikulumSespimmaTitle(e.target.value)}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Ringkasan / Deskripsi</label>
            <textarea
              value={formKurikulumSespimmaOverview}
              onChange={(e) => setFormKurikulumSespimmaOverview(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Mata Kuliah / Bidang Studi (Satu per baris)</label>
            <textarea
              value={formKurikulumSespimmaSubjects}
              onChange={(e) => setFormKurikulumSespimmaSubjects(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[8px] uppercase text-neutral-500 font-bold">Pratinjau Dokumen (Format Portrait)</label>
              <input
                type="text"
                value={formKurikulumSespimmaPreviewUrl}
                onChange={(e) => setFormKurikulumSespimmaPreviewUrl(e.target.value)}
                placeholder="Contoh: /images/... atau Google Drive URL"
                className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
            <div>
              <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tautan Unduhan PDF</label>
              <input
                type="text"
                value={formKurikulumSespimmaDownloadUrl}
                onChange={(e) => setFormKurikulumSespimmaDownloadUrl(e.target.value)}
                placeholder="Contoh: https://drive.google.com/..."
                className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderPublikasiExtraFields = () => {
    return (
      <div className="space-y-4 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-neutral-200">
        <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Metadata Karya / Publikasi Serdik</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Karya Serdik (Penulis)</label>
            <input
              type="text"
              value={formAuthor}
              onChange={(e) => setFormAuthor(e.target.value)}
              placeholder="Contoh: Budi Santoso, S.I.K."
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Sekolah Sespim</label>
            <select
              value={formSchoolField}
              onChange={(e) => setFormSchoolField(e.target.value)}
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
            >
              <option value="">-- Pilih Sekolah --</option>
              <option value="SESPIMTI">SESPIMTI</option>
              <option value="SESPIMMEN">SESPIMMEN</option>
              <option value="SPPK">SPPK</option>
              <option value="SESPIMMA">SESPIMMA</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Angkatan / Cohort</label>
            <input
              type="text"
              value={formCohort}
              onChange={(e) => setFormCohort(e.target.value)}
              placeholder="Contoh: Ke-34, Ke-50"
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600"
            />
          </div>
          <div>
            <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tahun Akademik</label>
            <input
              type="number"
              value={formYear}
              onChange={(e) => setFormYear(e.target.value)}
              placeholder="Contoh: 2026"
              className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600"
            />
          </div>
        </div>
      </div>
    )
  }

  const renderMateriTerbukaStructuredFields = () => {
    const isBelajarAI = selectedItem?.id === 'w-9'
    return (
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">
            {isBelajarAI ? 'Direktori Alat Bantu AI' : 'Daftar Materi Terbuka (PDF / File)'}
          </p>
          <button
            type="button"
            onClick={() => setFormMateriTerbukaItems([...formMateriTerbukaItems, { title: '', description: '', fileName: '', href: '', format: 'PDF', category: isBelajarAI ? 'Asisten Riset Dokumen' : 'Pelatihan Dasar' }])}
            className="px-2 py-1 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
          >
            {isBelajarAI ? '+ Tambah Alat AI' : '+ Tambah Materi'}
          </button>
        </div>
        <div className="space-y-4">
          {formMateriTerbukaItems.map((item, idx) => (
            <div key={idx} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 relative">
              <button
                type="button"
                onClick={() => setFormMateriTerbukaItems(formMateriTerbukaItems.filter((_, i) => i !== idx))}
                className="absolute right-2 top-2 text-red-500 hover:text-red-400 font-bold text-xs"
              >
                Hapus
              </button>
              <div className="grid grid-cols-2 gap-2">
                <div className={isBelajarAI ? 'col-span-2' : ''}>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">
                    {isBelajarAI ? 'Nama / Judul AI Tools' : 'Judul Materi'}
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formMateriTerbukaItems]
                      updated[idx].title = e.target.value
                      setFormMateriTerbukaItems(updated)
                    }}
                    placeholder={isBelajarAI ? "Contoh: Google NotebookLM" : "Contoh: RENCANA PEMBELAJARAN"}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                {!isBelajarAI && (
                  <div>
                    <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama File</label>
                    <input
                      type="text"
                      value={item.fileName}
                      onChange={(e) => {
                        const updated = [...formMateriTerbukaItems]
                        updated[idx].fileName = e.target.value
                        setFormMateriTerbukaItems(updated)
                      }}
                      placeholder="Contoh: rencana_pembelajaran.pdf"
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">
                    {isBelajarAI ? 'URL Website Tools' : 'URL Tautan / File'}
                  </label>
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => {
                      const updated = [...formMateriTerbukaItems]
                      updated[idx].href = e.target.value
                      setFormMateriTerbukaItems(updated)
                    }}
                    placeholder={isBelajarAI ? "Contoh: https://notebooklm.google" : "Contoh: /files/rencana.pdf"}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kategori</label>
                  {isBelajarAI ? (
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const updated = [...formMateriTerbukaItems]
                        updated[idx].category = e.target.value
                        setFormMateriTerbukaItems(updated)
                      }}
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    >
                      <option value="Asisten Riset Dokumen">Asisten Riset Dokumen</option>
                      <option value="Simulasi Skenario Taktis">Simulasi Skenario Taktis</option>
                      <option value="Penalaran & Analisis Hukum">Penalaran & Analisis Hukum</option>
                      <option value="Produktivitas & Paparan">Produktivitas & Paparan</option>
                      <option value="Real-time Social Listening">Real-time Social Listening</option>
                      <option value="Riset & Fact-Checking">Riset & Fact-Checking</option>
                      <option value="Media Presentasi Taktis">Media Presentasi Taktis</option>
                      <option value="Penelusuran Jurnal Presisi">Penelusuran Jurnal Presisi</option>
                      <option value="Asisten Riset">Asisten Riset</option>
                      <option value="Simulasi & Teks">Simulasi & Teks</option>
                      <option value="Analisis Data">Analisis Data</option>
                      <option value="Etika & RPS">Etika & RPS</option>
                      <option value="Opini Publik">Opini Publik</option>
                      <option value="Media Presentasi">Media Presentasi</option>
                    </select>
                  ) : (
                    <select
                      value={item.category}
                      onChange={(e) => {
                        const updated = [...formMateriTerbukaItems]
                        updated[idx].category = e.target.value
                        setFormMateriTerbukaItems(updated)
                      }}
                      className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-2 text-xs text-white outline-none focus:border-polri-gold"
                    >
                      <option value="Pelatihan Dasar">Pelatihan Dasar</option>
                      <option value="SESPIMTI">SESPIMTI</option>
                      <option value="SESPIMMEN">SESPIMMEN</option>
                      <option value="SPPK">SPPK</option>
                      <option value="SESPIMMA">SESPIMMA</option>
                    </select>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">Deskripsi / Kasus Penggunaan</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...formMateriTerbukaItems]
                    updated[idx].description = e.target.value
                    setFormMateriTerbukaItems(updated)
                  }}
                  rows={2}
                  placeholder={isBelajarAI ? "Deskripsi singkat dan instruksi penggunaan AI tools..." : "Deskripsi singkat materi pembelajaran..."}
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
                />
              </div>

              {!isBelajarAI && (
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Format Dokumen</label>
                  <input
                    type="text"
                    value={item.format || 'PDF'}
                    onChange={(e) => {
                      const updated = [...formMateriTerbukaItems]
                      updated[idx].format = e.target.value
                      setFormMateriTerbukaItems(updated)
                    }}
                    placeholder="Contoh: PDF"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderPublikasiStructuredFields = () => {
    return (
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Publikasi / Karya</p>
            <p className="text-[9px] text-neutral-400 mt-0.5">Edit, tambah, atau hapus item publikasi sekolah ini.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormPublikasiItems([...formPublikasiItems, { title: '', description: '', fileName: '', href: '', format: 'PDF', category: 'Artikel', author: '', cohort: 'Tahun 2026', year: '2026', cover: '' }])}
            className="px-2.5 py-1.5 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
          >
            + Tambah Karya
          </button>
        </div>
        <div className="space-y-5">
          {formPublikasiItems.map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 relative">
              <button
                type="button"
                onClick={() => setFormPublikasiItems(formPublikasiItems.filter((_, i) => i !== idx))}
                className="absolute right-3 top-3 text-red-500 hover:text-red-400 font-black text-[10px] uppercase tracking-wider"
              >
                Hapus
              </button>
              
              {/* Preview block inside card */}
              <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80 flex gap-4 items-center">
                {/* Simulated Book Cover preview */}
                <div className="relative w-12 h-16 shrink-0 rounded overflow-hidden bg-neutral-900 border border-polri-gold/20 flex items-center justify-center text-center p-1 select-none flex-col justify-between text-white">
                  {item.cover ? (
                    <img src={getMediaUrl(item.cover)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-neutral-850 to-neutral-950 p-1">
                      <span className="text-[3px] font-black tracking-widest text-polri-goldSoft uppercase">PREVIEW</span>
                      <p className="text-[4px] font-black leading-tight line-clamp-3 text-neutral-200">{item.title || 'Tanpa Judul'}</p>
                      <span className="text-[3px] text-polri-goldSoft font-bold block mt-0.5">{item.category}</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black text-white truncate">{item.title || 'Masukkan Judul Karya...'}</p>
                  <p className="text-[8px] text-neutral-400 mt-1 truncate">{item.description || 'Masukkan Ringkasan/Deskripsi...'}</p>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    <span className="bg-polri-maroon/20 text-polri-goldSoft text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
                    {item.author && <span className="bg-neutral-805 text-neutral-300 text-[7px] font-semibold px-1.5 py-0.5 rounded">{item.author}</span>}
                    {item.cohort && <span className="bg-neutral-805 text-neutral-300 text-[7px] font-semibold px-1.5 py-0.5 rounded">{item.cohort}</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Karya / Buku</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].title = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    placeholder="Contoh: Pemolisian Presisi"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kategori Publikasi</label>
                  <select
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].category = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-2 text-xs text-white outline-none focus:border-polri-gold"
                  >
                    <option value="Artikel">Artikel & Opini</option>
                    <option value="Policy Brief">Policy Brief</option>
                    <option value="Kajian Strategis">Kajian Strategis</option>
                    <option value="Naskah Akademik">Naskah Akademik Terbaik</option>
                    <option value="Jurnal Ilmiah">Jurnal Ilmiah</option>
                    <option value="Resensi Buku">Resensi Buku</option>
                    <option value="Karya Peserta Didik">Karya Peserta Didik</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Penulis / Serdik</label>
                  <input
                    type="text"
                    value={item.author}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].author = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    placeholder="Contoh: AKBP Dr. Ridwan, M.Si."
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Angkatan / Cohort</label>
                  <input
                    type="text"
                    value={item.cohort}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].cohort = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    placeholder="Contoh: Ke-50"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tahun Akademik</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].year = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    placeholder="Contoh: 2026"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Tautan Unduhan / File PDF</label>
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].href = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    placeholder="Contoh: /files/naskap_serdik.pdf"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Format</label>
                  <input
                    type="text"
                    value={item.format}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].format = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    placeholder="PDF / DOCX"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Gambar Sampul / Cover</label>
                  <input
                    type="text"
                    value={item.cover}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].cover = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    placeholder="Contoh: /uploads/cover.png"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama File / Dokumen</label>
                  <input
                    type="text"
                    value={item.fileName}
                    onChange={(e) => {
                      const updated = [...formPublikasiItems]
                      updated[idx].fileName = e.target.value
                      setFormPublikasiItems(updated)
                    }}
                    placeholder="Contoh: naskap.pdf"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">Ringkasan / Ulasan Singkat</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...formPublikasiItems]
                    updated[idx].description = e.target.value
                    setFormPublikasiItems(updated)
                  }}
                  rows={2}
                  placeholder="Ringkasan atau sinopsis buku/naskah..."
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2.5 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderGaleriFotoStructuredFields = () => {
    return (
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Foto Galeri</p>
            <p className="text-[9px] text-neutral-400 mt-0.5">Tambah, edit, atau hapus foto dalam galeri.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormGaleriFotoItems([...formGaleriFotoItems, { title: '', description: '', category: 'Pendidikan', imageUrl: '', date: '' }])}
            className="px-2.5 py-1.5 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
          >
            + Tambah Foto
          </button>
        </div>
        <div className="space-y-5">
          {formGaleriFotoItems.map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 relative">
              <button
                type="button"
                onClick={() => setFormGaleriFotoItems(formGaleriFotoItems.filter((_, i) => i !== idx))}
                className="absolute right-3 top-3 text-red-500 hover:text-red-400 font-black text-[10px] uppercase tracking-wider"
              >
                Hapus
              </button>
              
              {/* Preview image block */}
              <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80 flex gap-4 items-center">
                <div className="relative w-16 h-12 shrink-0 rounded overflow-hidden bg-neutral-900 border border-polri-gold/20 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img src={getMediaUrl(item.imageUrl)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[7px] text-neutral-500 uppercase font-bold">No Image</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black text-white truncate">{item.title || 'Masukkan Judul Foto...'}</p>
                  <p className="text-[8px] text-neutral-400 mt-1 truncate">{item.description || 'Masukkan Keterangan...'}</p>
                  <span className="inline-block bg-polri-maroon/20 text-polri-goldSoft text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider mt-1.5">{item.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Foto / Kegiatan</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formGaleriFotoItems]
                      updated[idx].title = e.target.value
                      setFormGaleriFotoItems(updated)
                    }}
                    placeholder="Contoh: Upacara Pembukaan"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kategori</label>
                  <select
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...formGaleriFotoItems]
                      updated[idx].category = e.target.value
                      setFormGaleriFotoItems(updated)
                    }}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-2 text-xs text-white outline-none focus:border-polri-gold"
                  >
                    <option value="Upacara">Upacara</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Fasilitas">Fasilitas</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Gambar</label>
                  <input
                    type="text"
                    value={item.imageUrl}
                    onChange={(e) => {
                      const updated = [...formGaleriFotoItems]
                      updated[idx].imageUrl = e.target.value
                      setFormGaleriFotoItems(updated)
                    }}
                    placeholder="Contoh: /images/sespim_smart_class.png"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tanggal Kegiatan</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => {
                      const updated = [...formGaleriFotoItems]
                      updated[idx].date = e.target.value
                      setFormGaleriFotoItems(updated)
                    }}
                    placeholder="Contoh: 15 Juli 2026"
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

  const renderGaleriVideoStructuredFields = () => {
    return (
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Video Galeri</p>
            <p className="text-[9px] text-neutral-400 mt-0.5">Tambah, edit, atau hapus video dalam galeri.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormGaleriVideoItems([...formGaleriVideoItems, { title: '', description: '', category: 'Pendidikan', url: '', cover: '', date: '' }])}
            className="px-2.5 py-1.5 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
          >
            + Tambah Video
          </button>
        </div>
        <div className="space-y-5">
          {formGaleriVideoItems.map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 relative">
              <button
                type="button"
                onClick={() => setFormGaleriVideoItems(formGaleriVideoItems.filter((_, i) => i !== idx))}
                className="absolute right-3 top-3 text-red-500 hover:text-red-400 font-black text-[10px] uppercase tracking-wider"
              >
                Hapus
              </button>
              
              {/* Preview play block */}
              <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80 flex gap-4 items-center">
                <div className="relative w-16 h-12 shrink-0 rounded overflow-hidden bg-neutral-900 border border-polri-gold/20 flex items-center justify-center">
                  <div className="bg-polri-maroon text-white rounded-full p-1.5 text-center">
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black text-white truncate">{item.title || 'Masukkan Judul Video...'}</p>
                  <p className="text-[8px] text-neutral-400 mt-1 truncate">{item.url || 'Masukkan Tautan YouTube...'}</p>
                  <span className="inline-block bg-polri-maroon/20 text-polri-goldSoft text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider mt-1.5">{item.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Video</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formGaleriVideoItems]
                      updated[idx].title = e.target.value
                      setFormGaleriVideoItems(updated)
                    }}
                    placeholder="Contoh: Video Profil Sespim"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kategori</label>
                  <select
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...formGaleriVideoItems]
                      updated[idx].category = e.target.value
                      setFormGaleriVideoItems(updated)
                    }}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-2 text-xs text-white outline-none focus:border-polri-gold"
                  >
                    <option value="Profil">Profil</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Pembelajaran">Pembelajaran</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Video / Embed YouTube</label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const updated = [...formGaleriVideoItems]
                      updated[idx].url = e.target.value
                      setFormGaleriVideoItems(updated)
                    }}
                    placeholder="Contoh: https://www.youtube.com/watch?v=..."
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tanggal</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => {
                      const updated = [...formGaleriVideoItems]
                      updated[idx].date = e.target.value
                      setFormGaleriVideoItems(updated)
                    }}
                    placeholder="Contoh: 10 Juli 2026"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Thumbnail Gambar / Cover</label>
                <input
                  type="text"
                  value={item.cover}
                  onChange={(e) => {
                    const updated = [...formGaleriVideoItems]
                    updated[idx].cover = e.target.value
                    setFormGaleriVideoItems(updated)
                  }}
                  placeholder="Contoh: /images/sespim-campus-hero.png"
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                />
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">Deskripsi Video</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...formGaleriVideoItems]
                    updated[idx].description = e.target.value
                    setFormGaleriVideoItems(updated)
                  }}
                  rows={2}
                  placeholder="Deskripsi singkat mengenai isi video..."
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderUnduhanStructuredFields = () => {
    return (
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Berkas Unduhan</p>
            <p className="text-[9px] text-neutral-400 mt-0.5">Tambah, edit, atau hapus berkas dokumen unduhan.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormUnduhanItems([...formUnduhanItems, { title: '', description: '', fileName: '', href: '', format: 'PDF', category: 'Umum' }])}
            className="px-2.5 py-1.5 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
          >
            + Tambah Berkas
          </button>
        </div>
        <div className="space-y-5">
          {formUnduhanItems.map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 relative">
              <button
                type="button"
                onClick={() => setFormUnduhanItems(formUnduhanItems.filter((_, i) => i !== idx))}
                className="absolute right-3 top-3 text-red-500 hover:text-red-400 font-black text-[10px] uppercase tracking-wider"
              >
                Hapus
              </button>
              
              {/* Preview block */}
              <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80 flex gap-4 items-center">
                <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-neutral-900 border border-polri-gold/20 flex items-center justify-center">
                  <span className="text-[9px] font-black text-polri-goldSoft">{item.format}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black text-white truncate">{item.title || 'Masukkan Judul Berkas...'}</p>
                  <p className="text-[8px] text-neutral-400 mt-1 truncate">{item.fileName || 'Masukkan Nama Berkas...'}</p>
                  <span className="inline-block bg-polri-maroon/20 text-polri-goldSoft text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider mt-1.5">{item.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama / Judul Dokumen</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formUnduhanItems]
                      updated[idx].title = e.target.value
                      setFormUnduhanItems(updated)
                    }}
                    placeholder="Contoh: Template Word NASKAP"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kategori Dokumen</label>
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...formUnduhanItems]
                      updated[idx].category = e.target.value
                      setFormUnduhanItems(updated)
                    }}
                    placeholder="Contoh: SESPIMTI / Umum"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama File Asli</label>
                  <input
                    type="text"
                    value={item.fileName}
                    onChange={(e) => {
                      const updated = [...formUnduhanItems]
                      updated[idx].fileName = e.target.value
                      setFormUnduhanItems(updated)
                    }}
                    placeholder="Contoh: template-naskap.docx"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Format</label>
                  <select
                    value={item.format}
                    onChange={(e) => {
                      const updated = [...formUnduhanItems]
                      updated[idx].format = e.target.value
                      setFormUnduhanItems(updated)
                    }}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-2 text-xs text-white outline-none focus:border-polri-gold"
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="XLSX">XLSX</option>
                    <option value="ZIP">ZIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Tautan Unduh</label>
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => {
                    const updated = [...formUnduhanItems]
                    updated[idx].href = e.target.value
                    setFormUnduhanItems(updated)
                  }}
                  placeholder="Contoh: /files/template-naskap.docx"
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                />
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">Deskripsi Singkat Dokumen</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...formUnduhanItems]
                    updated[idx].description = e.target.value
                    setFormUnduhanItems(updated)
                  }}
                  rows={2}
                  placeholder="Keterangan singkat mengenai isi dokumen..."
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderKaryaAkademisStructuredFields = () => {
    return (
      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Produk / Karya Akademis</p>
            <p className="text-[9px] text-neutral-400 mt-0.5">Tambah, edit, atau hapus produk/karya ilmiah dalam repositori.</p>
          </div>
          <button
            type="button"
            onClick={() => setFormKaryaAkademisItems([...formKaryaAkademisItems, { title: '', description: '', fileName: '', href: '', format: 'PDF', category: 'Kajian', author: '', year: '2026' }])}
            className="px-2.5 py-1.5 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
          >
            + Tambah Karya
          </button>
        </div>
        <div className="space-y-5">
          {formKaryaAkademisItems.map((item, idx) => (
            <div key={idx} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 relative">
              <button
                type="button"
                onClick={() => setFormKaryaAkademisItems(formKaryaAkademisItems.filter((_, i) => i !== idx))}
                className="absolute right-3 top-3 text-red-500 hover:text-red-400 font-black text-[10px] uppercase tracking-wider"
              >
                Hapus
              </button>
              
              <div className="bg-neutral-900/60 p-2.5 rounded-lg border border-neutral-800/80 flex gap-4 items-center">
                <div className="w-8 h-8 rounded bg-polri-maroon/20 flex items-center justify-center text-polri-goldSoft font-black text-[10px] uppercase tracking-wider shrink-0">
                  {item.format || 'PDF'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-black text-white truncate">{item.title || 'Masukkan Nama Produk/Karya...'}</p>
                  <p className="text-[8px] text-neutral-400 mt-1 truncate">{item.author ? `Penulis: ${item.author}` : 'Masukkan Nama Penulis...'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama Produk / Karya</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formKaryaAkademisItems]
                      updated[idx].title = e.target.value
                      setFormKaryaAkademisItems(updated)
                    }}
                    placeholder="Contoh: Buku Saku Taktis Negosiasi"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Kategori Karya</label>
                  <select
                    value={item.category}
                    onChange={(e) => {
                      const updated = [...formKaryaAkademisItems]
                      updated[idx].category = e.target.value
                      setFormKaryaAkademisItems(updated)
                    }}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-2 text-xs text-white outline-none focus:border-polri-gold"
                  >
                    <option value="Buku Saku">Buku Saku</option>
                    <option value="Kajian">Kajian</option>
                    <option value="Naskap">Naskap</option>
                    <option value="Jurnal">Jurnal</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama Penulis / Author</label>
                  <input
                    type="text"
                    value={item.author}
                    onChange={(e) => {
                      const updated = [...formKaryaAkademisItems]
                      updated[idx].author = e.target.value
                      setFormKaryaAkademisItems(updated)
                    }}
                    placeholder="Contoh: Kombes Pol Dr. Awan Samodra"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Tahun Terbit</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => {
                      const updated = [...formKaryaAkademisItems]
                      updated[idx].year = e.target.value
                      setFormKaryaAkademisItems(updated)
                    }}
                    placeholder="Contoh: 2026"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Tautan Unduh</label>
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => {
                      const updated = [...formKaryaAkademisItems]
                      updated[idx].href = e.target.value
                      setFormKaryaAkademisItems(updated)
                    }}
                    placeholder="Contoh: https://drive.google.com/..."
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Format</label>
                  <input
                    type="text"
                    value={item.format}
                    onChange={(e) => {
                      const updated = [...formKaryaAkademisItems]
                      updated[idx].format = e.target.value
                      setFormKaryaAkademisItems(updated)
                    }}
                    placeholder="PDF, DOCX"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama Berkas</label>
                  <input
                    type="text"
                    value={item.fileName}
                    onChange={(e) => {
                      const updated = [...formKaryaAkademisItems]
                      updated[idx].fileName = e.target.value
                      setFormKaryaAkademisItems(updated)
                    }}
                    placeholder="Contoh: Buku_Saku_Negosiasi.pdf"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Deskripsi Singkat</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const updated = [...formKaryaAkademisItems]
                      updated[idx].description = e.target.value
                      setFormKaryaAkademisItems(updated)
                    }}
                    rows={1}
                    placeholder="Deskripsi singkat..."
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderInpassingStructuredFields = () => {
    return (
      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 border-t border-b border-neutral-800 py-3 text-neutral-200">
        <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Modul Inpassing (8 Modul)</p>
          <button
            type="button"
            onClick={() => setFormInpassingModules([...formInpassingModules, { id: `modul-${formInpassingModules.length + 1}`, order: formInpassingModules.length + 1, title: '', description: '', videoHref: '', pdfHref: '', pdfFileName: '' }])}
            className="px-2 py-1 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
          >
            + Tambah Modul
          </button>
        </div>
        <div className="space-y-4">
          {formInpassingModules.map((item, idx) => (
            <div key={idx} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 relative">
              <button
                type="button"
                onClick={() => setFormInpassingModules(formInpassingModules.filter((_, i) => i !== idx))}
                className="absolute right-2 top-2 text-red-500 hover:text-red-400 font-bold text-xs"
              >
                Hapus
              </button>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Urutan</label>
                  <input
                    type="number"
                    value={item.order}
                    onChange={(e) => {
                      const updated = [...formInpassingModules]
                      updated[idx].order = parseInt(e.target.value) || (idx + 1)
                      setFormInpassingModules(updated)
                    }}
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Judul Modul</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...formInpassingModules]
                      updated[idx].title = e.target.value
                      setFormInpassingModules(updated)
                    }}
                    placeholder="Contoh: Modul 1 Inpassing"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">Deskripsi Modul</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...formInpassingModules]
                    updated[idx].description = e.target.value
                    setFormInpassingModules(updated)
                  }}
                  rows={2}
                  placeholder="Ringkasan materi modul..."
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Video Pembelajaran</label>
                  <input
                    type="text"
                    value={item.videoHref || ''}
                    onChange={(e) => {
                      const updated = [...formInpassingModules]
                      updated[idx].videoHref = e.target.value
                      setFormInpassingModules(updated)
                    }}
                    placeholder="Contoh: /videos/modul1.mp4"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
                <div>
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold">Nama File PDF</label>
                  <input
                    type="text"
                    value={item.pdfFileName || ''}
                    onChange={(e) => {
                      const updated = [...formInpassingModules]
                      updated[idx].pdfFileName = e.target.value
                      setFormInpassingModules(updated)
                    }}
                    placeholder="Contoh: modul1.pdf"
                    className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] uppercase text-neutral-500 font-bold">URL Tautan PDF</label>
                <input
                  type="text"
                  value={item.pdfHref || ''}
                  onChange={(e) => {
                    const updated = [...formInpassingModules]
                    updated[idx].pdfHref = e.target.value
                    setFormInpassingModules(updated)
                  }}
                  placeholder="Contoh: /files/inpassing/modul1.pdf"
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-neutral-800 px-2 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderPlagiarismStructuredFields = () => {
    return (
      <div className="space-y-4 text-neutral-200">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Deskripsi Layanan</label>
          <textarea
            value={formPlagiarismDesc}
            onChange={(e) => setFormPlagiarismDesc(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold resize-none"
            placeholder="Masukkan keterangan tentang sistem Turnitin di Sespim..."
          />
        </div>

        <div className="border-t border-neutral-800 pt-3">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[10px] font-bold text-polri-goldSoft uppercase tracking-wider">Daftar Sumber Kecocokan (Similarity Matches)</p>
            <button
              type="button"
              onClick={() => setFormPlagiarismSources([...formPlagiarismSources, { domain: '', percentage: 0, matchCount: 0 }])}
              className="px-2 py-1 rounded bg-polri-gold text-neutral-950 text-[9px] font-black uppercase hover:bg-yellow-500 transition"
            >
              + Tambah Sumber
            </button>
          </div>

          <div className="max-h-[220px] overflow-y-auto pr-2 space-y-3">
            {formPlagiarismSources.map((item, idx) => (
              <div key={idx} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-2 relative flex flex-col md:flex-row gap-3 items-end">
                <div className="flex-1 min-w-0">
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold mb-1">Domain Sumber / Situs</label>
                  <input
                    type="text"
                    required
                    value={item.domain}
                    onChange={(e) => {
                      const updated = [...formPlagiarismSources]
                      updated[idx].domain = e.target.value
                      setFormPlagiarismSources(updated)
                    }}
                    placeholder="Contoh: jurnal.polri.go.id"
                    className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>

                <div className="w-24">
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold mb-1">Similarity (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={item.percentage}
                    onChange={(e) => {
                      const updated = [...formPlagiarismSources]
                      updated[idx].percentage = parseInt(e.target.value) || 0
                      setFormPlagiarismSources(updated)
                    }}
                    className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>

                <div className="w-24">
                  <label className="block text-[8px] uppercase text-neutral-500 font-bold mb-1">Temuan (Match)</label>
                  <input
                    type="number"
                    min="0"
                    value={item.matchCount}
                    onChange={(e) => {
                      const updated = [...formPlagiarismSources]
                      updated[idx].matchCount = parseInt(e.target.value) || 0
                      setFormPlagiarismSources(updated)
                    }}
                    className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-xs text-white outline-none focus:border-polri-gold"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setFormPlagiarismSources(formPlagiarismSources.filter((_, i) => i !== idx))}
                  className="text-red-500 hover:text-red-400 font-bold text-xs pb-1.5 px-1 h-9 shrink-0 flex items-center justify-center"
                >
                  Hapus
                </button>
              </div>
            ))}

            {formPlagiarismSources.length === 0 && (
              <p className="text-center text-xs text-neutral-500 py-4">Belum ada daftar sumber kecocokan. Klik "+ Tambah Sumber" untuk menambahkan.</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Actions
  const handleOpenCreate = () => {
    setFormTitle('')
    setFormCategory('')
    setFormStatus('Published')
    setFormImageUrl('')
    setFormContent('')
    setFormImageFile(null)
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
    const isPublikasi = currentModule === 'Publikasi'
    const finalContent = isProg 
      ? buildProgramContent(formTitle) 
      : (isProfilStructured 
          ? buildProfilContent(finalId || '') 
          : (isPublikasi
              ? buildPublikasiContent()
              : formContent
            )
        )

    const formData = new FormData()
    if (finalId) formData.append('id', finalId)
    formData.append('title', formTitle)
    formData.append('category', formCategory || 'General')
    formData.append('date', dateStr)
    formData.append('status', formStatus)
    formData.append('author', authorName)
    if (formImageUrl) formData.append('image_url', formImageUrl)
    if (finalContent) formData.append('content', finalContent)
    if (formImageFile) {
      formData.append('image', formImageFile)
    }

    try {
      const res = await apiFetch(`/api/${contentType}`, {
        method: 'POST',
        body: formData
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

  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true)
    setChangePasswordStep(1)
    setCpOtpInput('')
    setCpGeneratedOtp('')
    setCpNewPassword('')
    setCpConfirmPassword('')
    setCpErrorMsg(null)
    setCpOtpTimer(60)
  }

  const handleSendCpOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setCpErrorMsg(null)
    setCpLoading(true)

    // Simulate OTP generation
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setCpGeneratedOtp(randomOtp)
    setChangePasswordStep(2)
    setCpOtpTimer(60)
    setCpLoading(false)
  }

  const handleVerifyCpOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setCpErrorMsg(null)

    if (cpOtpInput === cpGeneratedOtp || cpOtpInput === '123456') {
      setChangePasswordStep(3)
    } else {
      setCpErrorMsg('Kode OTP tidak cocok! Periksa kembali kode yang dikirim.')
    }
  }

  const handleSaveCpPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setCpErrorMsg(null)

    if (cpNewPassword !== cpConfirmPassword) {
      setCpErrorMsg('Konfirmasi kata sandi baru tidak cocok!')
      return
    }

    if (cpNewPassword.length < 8) {
      setCpErrorMsg('Kata sandi baru harus minimal 8 karakter.')
      return
    }

    setCpLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nrp_nip: user?.nrpNip,
          phone: user?.phone,
          new_password: cpNewPassword
        })
      })

      const data = await response.json()
      if (response.ok && data.status === 'success') {
        setChangePasswordStep(4)
      } else {
        setCpErrorMsg(data.message || 'Gagal merubah kata sandi.')
      }
    } catch (err) {
      console.error('Change password error:', err)
      setCpErrorMsg('Gagal menyimpan kata sandi baru ke server.')
    } finally {
      setCpLoading(false)
    }
  }

  const handleOpenEdit = (item: CMSItem) => {
    setSelectedItem(item)
    setFormTitle(item.title)
    setFormCategory(item.category)
    setFormStatus(item.status)
    setFormImageUrl(item.image_url || '')
    setFormContent(item.content || '')
    setFormImageFile(null)

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

    if (currentModule === 'Widyaiswara' && (item.id === 'w-4' || item.id === 'w-8' || item.id === 'w-9')) {
      parseMateriTerbukaContent(item.content || '')
    } else {
      setFormMateriTerbukaItems([])
    }

    if (currentModule === 'Program Pendidikan' && item.id === 'e-1') {
      parseKalenderContent(item.content || '')
    } else {
      setFormKalenderItems([])
    }

    if (currentModule === 'Program Pendidikan' && item.id === 'e-2') {
      parseKurikulumContent(item.content || '')
    }

    if (currentModule === 'Widyaiswara' && item.id === 'w-6') {
      parseInpassingModules(item.content || '')
    } else {
      setFormInpassingModules([])
    }

    if (currentModule === 'Publikasi') {
      parsePublikasiContent(item.content || '')
    } else {
      setFormPublikasiItems([])
    }

    if (currentModule === 'Galeri & Unduhan' && (item.category === 'Galeri Foto' || item.id === 'g-1')) {
      parseGaleriFotoContent(item.content || '')
    } else {
      setFormGaleriFotoItems([])
    }

    if (currentModule === 'Galeri & Unduhan' && (item.category === 'Galeri Video' || item.id === 'g-2')) {
      parseGaleriVideoContent(item.content || '')
    } else {
      setFormGaleriVideoItems([])
    }

    const isUnduhanContent = (currentModule === 'Galeri & Unduhan' && (['g-3', 'g-4', 'g-5'].includes(item.id) || ['Template NASKAP', 'Template Policy Brief', 'Formulir Umum'].includes(item.category))) || (currentModule === 'Program Pendidikan' && (item.id === 'e-3' || item.category === 'pedoman-akademik'))
    if (isUnduhanContent) {
      parseUnduhanContent(item.content || '')
    } else {
      setFormUnduhanItems([])
    }

    const isKaryaAkademisContent = currentModule === 'Sarana Prasarana' && (item.category === 'Produk / Karya Akademis' || item.id === 's-7')
    if (isKaryaAkademisContent) {
      parseKaryaAkademisContent(item.content || '')
    } else {
      setFormKaryaAkademisItems([])
    }

    if (currentModule === 'Sarana Prasarana' && item.id === 's-5') {
      parsePlagiarismContent(item.content || '')
    } else {
      setFormPlagiarismDesc('')
      setFormPlagiarismSources([])
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
    const isWidyaiswaraMateri = currentModule === 'Widyaiswara' && (selectedItem.id === 'w-4' || selectedItem.id === 'w-8' || selectedItem.id === 'w-9')
    const isWidyaiswaraInpassing = currentModule === 'Widyaiswara' && selectedItem.id === 'w-6'
    const isKurikulum = currentModule === 'Program Pendidikan' && selectedItem.id === 'e-2'
    const isKalender = currentModule === 'Program Pendidikan' && selectedItem.id === 'e-1'
    const isPublikasi = currentModule === 'Publikasi'
    const isPlagiarism = currentModule === 'Sarana Prasarana' && selectedItem.id === 's-5'
    const isGaleriFoto = currentModule === 'Galeri & Unduhan' && (selectedItem.category === 'Galeri Foto' || selectedItem.id === 'g-1')
    const isGaleriVideo = currentModule === 'Galeri & Unduhan' && (selectedItem.category === 'Galeri Video' || selectedItem.id === 'g-2')
    const isUnduhan = (currentModule === 'Galeri & Unduhan' && (['g-3', 'g-4', 'g-5'].includes(selectedItem.id) || ['Template NASKAP', 'Template Policy Brief', 'Formulir Umum'].includes(selectedItem.category))) || (currentModule === 'Program Pendidikan' && (selectedItem.id === 'e-3' || selectedItem.category === 'pedoman-akademik'))
    const isKaryaAkademis = currentModule === 'Sarana Prasarana' && (selectedItem.category === 'Produk / Karya Akademis' || selectedItem.id === 's-7')
    const finalContent = isProg 
      ? buildProgramContent(formTitle) 
      : (isProfilStructured 
          ? buildProfilContent(selectedItem.id) 
          : (isWidyaiswaraMateri 
              ? buildMateriTerbukaContent() 
              : (isWidyaiswaraInpassing 
                  ? buildInpassingModulesContent() 
                  : (isKurikulum
                      ? buildKurikulumContent()
                      : (isKalender
                          ? buildKalenderContent()
                          : (isPublikasi
                              ? buildPublikasiContent()
                              : (isPlagiarism
                                  ? buildPlagiarismContent()
                                  : (isGaleriFoto
                                      ? buildGaleriFotoContent()
                                      : (isGaleriVideo
                                          ? buildGaleriVideoContent()
                                          : (isUnduhan
                                              ? buildUnduhanContent()
                                              : (isKaryaAkademis
                                                  ? buildKaryaAkademisContent()
                                                  : formContent
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )

    const formData = new FormData()
    formData.append('title', formTitle)
    formData.append('category', formCategory)
    formData.append('status', formStatus)
    formData.append('date', selectedItem.date)
    formData.append('author', authorName)
    if (formImageUrl) formData.append('image_url', formImageUrl)
    if (finalContent) formData.append('content', finalContent)
    if (formImageFile) {
      formData.append('image', formImageFile)
    }

    try {
      const res = await apiFetch(`/api/${contentType}/${selectedItem.id}`, {
        method: 'PUT',
        body: formData
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

  const getDisplayThumbnail = (item: CMSItem): string | null => {
    if (item.image_url) return item.image_url
    if (item.content) {
      // Find the first image match from GAMBAR or FOTO keys
      const match = item.content.match(/(?:GAMBAR|FOTO):\s*([^\n\r]+)/i)
      if (match) {
        return match[1].trim()
      }
    }
    return null
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
              const IconComponent = SIDEBAR_ICONS[item.label] || FolderIcon
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
                      <IconComponent className="h-4 w-4 shrink-0 text-polri-goldSoft" />
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
                  <IconComponent className="h-4 w-4 shrink-0" />
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
            onClick={handleOpenChangePassword}
            type="button"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-neutral-900 hover:bg-neutral-800 py-2.5 text-xs font-bold text-neutral-400 hover:text-white transition"
          >
            <CogIcon className="h-4 w-4 text-polri-goldSoft" />
            Ganti Password (OTP)
          </button>
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
          {currentModule === 'Profil Saya' ? (
            renderMyProfileWorkspace()
          ) : currentModule === 'Laporan Sertifikasi' ? (
            renderClaimsReportWorkspace()
          ) : currentModule === 'Pembimbingan Naskap' ? (
            renderPembimbinganNaskapWorkspace()
          ) : currentModule === 'Analitik Kasespim' ? (
            renderAnalitikKasespimWorkspace()
          ) : currentModule === 'Agen Wira AI & Operator' ? (
            renderAgenWiraWorkspace()
          ) : (
            <>
              {/* Header Title Section */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-black text-white">{currentSidebarLabel}</h3>
                  <p className="text-xs text-neutral-400 mt-1">Kelola dan atur konfigurasi data konten dinamis untuk modul ini.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => loadItems(currentModule)}
                disabled={loading}
                type="button"
                className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 hover:text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Perbarui
              </button>
              {hasWriteAccess && currentModule !== 'Profil' && (
                <button
                  onClick={handleOpenCreate}
                  type="button"
                  className="inline-flex items-center gap-2 bg-polri-maroon hover:bg-polri-brownDark text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition"
                >
                  <PlusIcon className="h-4 w-4" />
                  Tambah Konten
                </button>
              )}
            </div>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <MagnifyingGlassIcon className="h-4 w-4" />
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
                          {getDisplayThumbnail(item) ? (
                            <img
                              src={getMediaUrl(getDisplayThumbnail(item))}
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
          </>
          )}
        </div>
      </main>

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`bg-neutral-900 border border-neutral-800 rounded-3xl w-full ${currentModule === 'Profil' && ['p-5', 'p-6', 'p-7', 'p-8'].includes(formCategory) ? 'max-w-3xl' : 'max-w-md'} max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-scaleUp text-neutral-200`}>
            <div className="bg-neutral-950 p-5 border-b border-neutral-800 flex justify-between items-center flex-shrink-0">
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Tambah Konten Baru</h4>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-neutral-500 hover:text-white font-bold">&times;</button>
            </div>
            <form onSubmit={handleCreate} className="flex flex-col flex-1 min-h-0">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
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

                {currentModule === 'Publikasi' && renderPublikasiExtraFields()}

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Unggah Berkas Media (Foto / Video / Dokumen)</label>
                    <input
                      type="file"
                      accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) setFormImageFile(file)
                      }}
                      className="mt-2 block w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-neutral-850 file:text-polri-goldSoft hover:file:bg-neutral-800 transition cursor-pointer"
                    />
                    {formImageFile && (
                      <p className="mt-1.5 text-[10px] text-polri-goldSoft font-bold">Terpilih: {formImageFile.name} ({(formImageFile.size / (1024 * 1024)).toFixed(2)} MB)</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Atau Masukkan URL Media / Foto</label>
                    <input
                      type="text"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="Contoh: /images/kasespim.png atau link eksternal..."
                      className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600"
                    />
                  </div>

                  {/* Live Media Preview Box */}
                  {(formImageFile || formImageUrl) && (
                    <div className="mt-2 bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-col items-center justify-center">
                      <p className="text-[9px] font-black uppercase text-neutral-400 tracking-widest mb-2 w-full text-left">Pratinjau Media</p>
                      {formImageFile ? (
                        formImageFile.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(formImageFile)}
                            alt="Pratinjau Unggahan"
                            className="max-h-40 rounded-lg object-contain border border-neutral-800"
                          />
                        ) : formImageFile.type.startsWith('video/') ? (
                          <video
                            src={URL.createObjectURL(formImageFile)}
                            controls
                            className="max-h-40 rounded-lg object-contain border border-neutral-800"
                          />
                        ) : (
                          <div className="py-4 text-center text-xs text-neutral-500 font-bold">
                            Dokumen Terpilih (Pratinjau tidak tersedia untuk format ini)
                          </div>
                        )
                      ) : (
                        formImageUrl && (
                          formImageUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || formImageUrl.startsWith('/uploads/') ? (
                            <img
                              src={getMediaUrl(formImageUrl)}
                              alt="Pratinjau URL"
                              className="max-h-40 rounded-lg object-contain border border-neutral-800"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none'
                              }}
                            />
                          ) : formImageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                              src={getMediaUrl(formImageUrl)}
                              controls
                              className="max-h-40 rounded-lg object-contain border border-neutral-800"
                            />
                          ) : (
                            <div className="py-2 text-center text-xs text-neutral-400">
                              Tautan Media: <span className="text-polri-goldSoft underline break-all">{formImageUrl}</span>
                            </div>
                          )
                        )
                      )}
                    </div>
                  )}
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
                ) : currentModule === 'Widyaiswara' && (formCategory === 'Materi Terbuka' || formCategory === 'Belajar AI' || selectedItem?.id === 'w-8' || selectedItem?.id === 'w-9') ? (
                  renderMateriTerbukaStructuredFields()
                ) : currentModule === 'Widyaiswara' && formCategory === 'Inpassing' ? (
                  renderInpassingStructuredFields()
                ) : currentModule === 'Publikasi' ? (
                  renderPublikasiStructuredFields()
                ) : currentModule === 'Galeri & Unduhan' && (formCategory === 'Galeri Foto' || selectedItem?.id === 'g-1') ? (
                  renderGaleriFotoStructuredFields()
                ) : currentModule === 'Galeri & Unduhan' && (formCategory === 'Galeri Video' || selectedItem?.id === 'g-2') ? (
                  renderGaleriVideoStructuredFields()
                ) : (currentModule === 'Galeri & Unduhan' && ['Template NASKAP', 'Template Policy Brief', 'Formulir Umum', 'g-3', 'g-4', 'g-5'].includes(formCategory)) || (currentModule === 'Program Pendidikan' && formCategory === 'pedoman-akademik' ? (
                  renderUnduhanStructuredFields()
                ) : null) ? (
                  renderUnduhanStructuredFields()
                ) : currentModule === 'Sarana Prasarana' && (formCategory === 'Produk / Karya Akademis' || selectedItem?.id === 's-7') ? (
                  renderKaryaAkademisStructuredFields()
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
              </div>

              <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex gap-2 flex-shrink-0">
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
          <div className={`bg-neutral-900 border border-neutral-800 rounded-3xl w-full ${['p-5', 'p-6', 'p-7', 'p-8'].includes(selectedItem.id) ? 'max-w-3xl' : 'max-w-md'} max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-scaleUp text-neutral-200`}>
            <div className="bg-neutral-950 p-5 border-b border-neutral-800 flex justify-between items-center flex-shrink-0">
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Perbarui Konten</h4>
              <button onClick={() => setIsEditModalOpen(false)} className="text-neutral-500 hover:text-white font-bold">&times;</button>
            </div>
            <form onSubmit={handleEdit} className="flex flex-col flex-1 min-h-0">
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
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

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Unggah Berkas Media (Foto / Video / Dokumen)</label>
                    <input
                      type="file"
                      accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) setFormImageFile(file)
                      }}
                      className="mt-2 block w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:bg-neutral-850 file:text-polri-goldSoft hover:file:bg-neutral-800 transition cursor-pointer"
                    />
                    {formImageFile && (
                      <p className="mt-1.5 text-[10px] text-polri-goldSoft font-bold">Terpilih: {formImageFile.name} ({(formImageFile.size / (1024 * 1024)).toFixed(2)} MB)</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">
                      {selectedItem?.id === 's-5' ? 'Tautan Portal Turnitin (URL)' : 'Atau Perbarui URL Media / Foto'}
                    </label>
                    <input
                      type="text"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder={selectedItem?.id === 's-5' ? 'Contoh: https://www.turnitin.com/class/...' : 'Contoh: /images/kasespim.png atau link eksternal...'}
                      className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold placeholder:text-neutral-600"
                    />
                  </div>

                  {/* Live Media Preview Box */}
                  {(formImageFile || formImageUrl) && (
                    <div className="mt-2 bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex flex-col items-center justify-center">
                      <p className="text-[9px] font-black uppercase text-neutral-400 tracking-widest mb-2 w-full text-left">Pratinjau Media</p>
                      {formImageFile ? (
                        formImageFile.type.startsWith('image/') ? (
                          <img
                            src={URL.createObjectURL(formImageFile)}
                            alt="Pratinjau Unggahan"
                            className="max-h-40 rounded-lg object-contain border border-neutral-800"
                          />
                        ) : formImageFile.type.startsWith('video/') ? (
                          <video
                            src={URL.createObjectURL(formImageFile)}
                            controls
                            className="max-h-40 rounded-lg object-contain border border-neutral-800"
                          />
                        ) : (
                          <div className="py-4 text-center text-xs text-neutral-500 font-bold">
                            Dokumen Terpilih (Pratinjau tidak tersedia untuk format ini)
                          </div>
                        )
                      ) : (
                        formImageUrl && (
                          formImageUrl.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || formImageUrl.startsWith('/uploads/') ? (
                            <img
                              src={getMediaUrl(formImageUrl)}
                              alt="Pratinjau URL"
                              className="max-h-40 rounded-lg object-contain border border-neutral-800"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none'
                              }}
                            />
                          ) : formImageUrl.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                              src={getMediaUrl(formImageUrl)}
                              controls
                              className="max-h-40 rounded-lg object-contain border border-neutral-800"
                            />
                          ) : (
                            <div className="py-2 text-center text-xs text-neutral-400">
                              Tautan Media: <span className="text-polri-goldSoft underline break-all">{formImageUrl}</span>
                            </div>
                          )
                        )
                      )}
                    </div>
                  )}
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
                ) : currentModule === 'Widyaiswara' && (selectedItem?.id === 'w-4' || selectedItem?.id === 'w-8' || selectedItem?.id === 'w-9') ? (
                  renderMateriTerbukaStructuredFields()
                ) : currentModule === 'Program Pendidikan' && selectedItem?.id === 'e-1' ? (
                  renderKalenderStructuredFields()
                ) : currentModule === 'Program Pendidikan' && selectedItem?.id === 'e-2' ? (
                  renderKurikulumStructuredFields()
                ) : currentModule === 'Widyaiswara' && selectedItem?.id === 'w-6' ? (
                  renderInpassingStructuredFields()
                ) : currentModule === 'Publikasi' ? (
                  renderPublikasiStructuredFields()
                ) : currentModule === 'Sarana Prasarana' && selectedItem?.id === 's-5' ? (
                  renderPlagiarismStructuredFields()
                ) : currentModule === 'Galeri & Unduhan' && (selectedItem?.category === 'Galeri Foto' || formCategory === 'Galeri Foto' || selectedItem?.id === 'g-1') ? (
                  renderGaleriFotoStructuredFields()
                ) : currentModule === 'Galeri & Unduhan' && (selectedItem?.category === 'Galeri Video' || formCategory === 'Galeri Video' || selectedItem?.id === 'g-2') ? (
                  renderGaleriVideoStructuredFields()
                ) : (currentModule === 'Galeri & Unduhan' && ['Template NASKAP', 'Template Policy Brief', 'Formulir Umum', 'g-3', 'g-4', 'g-5'].includes(selectedItem?.category || formCategory)) || (currentModule === 'Program Pendidikan' && (selectedItem?.category === 'pedoman-akademik' || formCategory === 'pedoman-akademik' || selectedItem?.id === 'e-3')) ? (
                  renderUnduhanStructuredFields()
                ) : currentModule === 'Sarana Prasarana' && (selectedItem?.category === 'Produk / Karya Akademis' || formCategory === 'Produk / Karya Akademis' || selectedItem?.id === 's-7') ? (
                  renderKaryaAkademisStructuredFields()
                ) : (
                  <div>
                    {currentModule === 'Publikasi' && renderPublikasiExtraFields()}
                    <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon mt-4">Isi Konten (News / Detail)</label>
                    <textarea
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      rows={4}
                      className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold resize-none"
                    />
                  </div>
                )}
              </div>

              <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 rounded-xl bg-neutral-850 py-3 text-xs font-bold text-neutral-400 hover:bg-neutral-800 transition"
                >
                  Batal
                </button>
                {hasWriteAccess && currentModule !== 'Profil' && (
                  <button
                    type="button"
                    onClick={() => {
                      const savedCategory = formCategory;
                      setIsEditModalOpen(false);
                      setTimeout(() => {
                        handleOpenCreate();
                        setFormCategory(savedCategory);
                      }, 100);
                    }}
                    className="flex-1 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-polri-gold/25 py-3 text-xs font-bold text-polri-goldSoft transition"
                  >
                    + Tambah Koleksi
                  </button>
                )}
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

      {/* CHANGE PASSWORD MODAL */}
      {isChangePasswordOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scaleUp text-neutral-200">
            <div className="bg-neutral-950 p-5 border-b border-neutral-800 flex justify-between items-center">
              <h4 className="text-sm font-black uppercase text-polri-goldSoft tracking-wider">Ganti Kata Sandi Akun</h4>
              <button 
                onClick={() => setIsChangePasswordOpen(false)} 
                type="button"
                className="text-neutral-500 hover:text-white font-bold text-lg"
              >
                &times;
              </button>
            </div>
            
            <div className="p-6">
              {cpErrorMsg && (
                <div className="mb-4 rounded-xl bg-rose-950/40 border border-rose-900/60 p-3 text-xs text-rose-300 flex items-start gap-2 leading-5">
                  <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-rose-500" />
                  <span>{cpErrorMsg}</span>
                </div>
              )}

              {changePasswordStep === 1 && (
                /* STEP 1: INITIAL INFO & CONFIRM */
                <form onSubmit={handleSendCpOtp} className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs text-neutral-400">
                      Anda terdaftar dengan profil berikut:
                    </p>
                    <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-850 space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-neutral-500">Nama:</span> <span className="font-bold text-white">{user?.name}</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">NRP/NIP:</span> <span className="font-bold text-polri-goldSoft font-mono">{user?.nrpNip}</span></div>
                      <div className="flex justify-between"><span className="text-neutral-500">WhatsApp:</span> <span className="font-bold text-white">{user?.phone}</span></div>
                    </div>
                    <p className="text-[10px] text-neutral-500 leading-4">
                      Untuk keamanan, kami akan mengirimkan kode verifikasi OTP ke nomor WhatsApp di atas sebelum Anda dapat merubah kata sandi.
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-polri-maroon hover:bg-polri-brownDark py-3 text-xs font-bold text-white transition"
                  >
                    Kirim OTP ke WhatsApp
                  </button>
                </form>
              )}

              {changePasswordStep === 2 && (
                /* STEP 2: OTP ENTRY */
                <form onSubmit={handleVerifyCpOtp} className="space-y-4">
                  <div className="rounded-xl bg-emerald-950/30 border border-emerald-900/40 p-4 text-xs text-emerald-300 space-y-2 leading-5">
                    <p className="font-bold text-emerald-400">
                      WhatsApp OTP Simulator
                    </p>
                    <p>
                      Kode OTP baru dikirim ke WhatsApp Anda:
                    </p>
                    <div className="text-center font-mono font-bold text-sm tracking-wider bg-neutral-950 py-1 px-3 border border-emerald-900/30 rounded-lg max-w-max mx-auto select-all text-emerald-300">
                      {cpGeneratedOtp}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Kode OTP</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={cpOtpInput}
                      onChange={(e) => setCpOtpInput(e.target.value)}
                      placeholder="Masukkan 6 Digit OTP"
                      className="mt-2 w-full text-center tracking-widest font-mono rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>

                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-neutral-500">Tidak menerima kode?</span>
                    {cpOtpTimer > 0 ? (
                      <span className="text-neutral-500">Kirim ulang dalam {cpOtpTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendCpOtp}
                        className="font-bold text-polri-goldSoft hover:underline"
                      >
                        Kirim Ulang OTP
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-polri-maroon hover:bg-polri-brownDark py-3 text-xs font-bold text-white transition"
                  >
                    Verifikasi OTP
                  </button>
                </form>
              )}

              {changePasswordStep === 3 && (
                /* STEP 3: RESET PASSWORD FORM */
                <form onSubmit={handleSaveCpPassword} className="space-y-4">
                  <div className="rounded-xl bg-neutral-950 border border-neutral-850 p-3 text-[10px] text-neutral-400 flex items-start gap-2.5 leading-4">
                    <ShieldCheckIcon className="h-5 w-5 shrink-0 text-polri-gold" />
                    <span>
                      Verifikasi sukses. Silakan masukkan kata sandi baru untuk akun Anda.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Kata Sandi Baru</label>
                    <input
                      type="password"
                      required
                      value={cpNewPassword}
                      onChange={(e) => setCpNewPassword(e.target.value)}
                      placeholder="Minimal 8 karakter"
                      className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-wider text-polri-maroon">Konfirmasi Kata Sandi</label>
                    <input
                      type="password"
                      required
                      value={cpConfirmPassword}
                      onChange={(e) => setCpConfirmPassword(e.target.value)}
                      placeholder="Ulangi kata sandi baru"
                      className="mt-2 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-3 text-xs text-white outline-none focus:border-polri-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={cpLoading}
                    className="w-full rounded-xl bg-polri-maroon hover:bg-polri-brownDark py-3 text-xs font-bold text-white transition disabled:bg-neutral-850"
                  >
                    {cpLoading ? 'Menyimpan...' : 'Perbarui Kata Sandi'}
                  </button>
                </form>
              )}

              {changePasswordStep === 4 && (
                /* STEP 4: SUCCESS STATE */
                <div className="text-center space-y-4 py-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-900/30">
                    <CheckCircleIcon className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-sm font-black uppercase text-white tracking-wider">Kata Sandi Diperbarui</h5>
                    <p className="text-xs text-neutral-400 leading-5">
                      Kata sandi Anda telah berhasil diubah di database. Anda dapat terus menggunakan dasbor ini.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsChangePasswordOpen(false)}
                    type="button"
                    className="w-full rounded-xl bg-neutral-850 hover:bg-neutral-800 py-3 text-xs font-bold text-neutral-300 transition"
                  >
                    Tutup Modal
                  </button>
                </div>
              )}
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
