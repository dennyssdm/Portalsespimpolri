'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
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
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

// Types for CMS items
type CMSItem = {
  id: string
  title: string
  category: string
  date: string
  status: 'Published' | 'Draft'
  author?: string
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
    }
  }, [activeRole, sidebarItems, currentModule])

  useEffect(() => {
    const data = initialMockData[currentModule] || []
    setItems(data)
  }, [currentModule])

  // Actions
  const handleOpenCreate = () => {
    setFormTitle('')
    setFormCategory('')
    setFormStatus('Published')
    setIsCreateModalOpen(true)
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    const newItem: CMSItem = {
      id: `mock-${Date.now()}`,
      title: formTitle,
      category: formCategory || 'General',
      date: new Date().toISOString().split('T')[0],
      status: formStatus
    }
    setItems([newItem, ...items])
    setIsCreateModalOpen(false)
  }

  const handleOpenEdit = (item: CMSItem) => {
    setSelectedItem(item)
    setFormTitle(item.title)
    setFormCategory(item.category)
    setFormStatus(item.status)
    setIsEditModalOpen(true)
  }

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedItem) return
    const updated = items.map((item) => 
      item.id === selectedItem.id 
        ? { ...item, title: formTitle, category: formCategory, status: formStatus }
        : item
    )
    setItems(updated)
    setIsEditModalOpen(false)
    setSelectedItem(null)
  }

  const handleOpenDelete = (item: CMSItem) => {
    setSelectedItem(item)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = () => {
    if (!selectedItem) return
    setItems(items.filter((item) => item.id !== selectedItem.id))
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
            {hasWriteAccess && (
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
                    <th className="px-6 py-4">Judul / Konten</th>
                    <th className="px-6 py-4">Kategori Sub-menu</th>
                    <th className="px-6 py-4">Tanggal Modifikasi</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-semibold">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-900/30 transition">
                        <td className="px-6 py-4 font-bold text-white max-w-sm truncate">{item.title}</td>
                        <td className="px-6 py-4">
                          <span className="bg-neutral-900 text-polri-goldSoft px-2.5 py-1 rounded-lg border border-neutral-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-neutral-400">{item.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            item.status === 'Published' 
                              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/30' 
                              : 'bg-amber-950/60 text-amber-400 border border-amber-900/30'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'Published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Read / View button */}
                            <button
                              onClick={() => handleOpenView(item)}
                              type="button"
                              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition"
                              title="Lihat Detail Konten"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>

                            {/* CRU Edit Button */}
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

                            {/* CRUD Delete Button */}
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
                      <td colSpan={5} className="px-6 py-10 text-center text-neutral-500 font-bold">
                        Belum ada data konten untuk pencarian/filter ini.
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

              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-polri-maroon">Deskripsi / Metadata Awal</p>
                <p className="text-xs text-neutral-400 leading-6 bg-neutral-950 p-3 rounded-xl border border-neutral-800">
                  Data ini disiapkan sebagai mock Content Management System (CMS) terintegrasi. Perubahan yang Anda lakukan akan mengubah daftar tabel di dasbor secara dinamis untuk simulasi.
                </p>
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
