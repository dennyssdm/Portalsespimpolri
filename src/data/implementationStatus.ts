import type { ImplementationStatus } from '@/types'

export const implementationStatus: ImplementationStatus[] = [
  {
    phase: 'Phase 1',
    deliverable: 'Foundation Setup',
    status: 'Done',
    note: 'Next.js, Tailwind, design token, struktur folder, layout global, data navigation awal.',
    approval: 'Disetujui'
  },
  {
    phase: 'Phase 2',
    deliverable: 'Navigation System',
    status: 'Done',
    note: 'Header desktop, mobile drawer, active state, search sederhana, footer.',
    approval: 'Disetujui'
  },
  {
    phase: 'Phase 3',
    deliverable: 'Homepage UI',
    status: 'Done',
    note: 'Hero, sambutan, program pendidikan, berita, agenda, publikasi, quick links, status preview.',
    approval: 'Disetujui'
  },
  {
    phase: 'Phase 4',
    deliverable: 'Main Pages UI',
    status: 'Done',
    note: 'Breadcrumb, sorotan per area, panel fitur spesifik, quick navigation, sidebar, CTA, dan form kontak baseline.',
    approval: 'Disetujui'
  },
  {
    phase: 'Phase 5',
    deliverable: 'Content Listing & Detail Pages',
    status: 'Done',
    note: 'Listing dan detail berita, publikasi, profil widyaiswara, unduhan, serta detail program pendidikan utama.',
    approval: 'Disetujui'
  },
  {
    phase: 'Phase 6',
    deliverable: 'Responsive & Accessibility QA',
    status: 'Done',
    note: 'Skip link, focus state, reduced motion, mobile drawer scroll, wrapping teks, kontras warna, checklist viewport, dan akses Login Internal baseline.',
    approval: 'Disetujui'
  },
  {
    phase: 'Phase 7',
    deliverable: 'Final UI Polish',
    status: 'Done',
    note: 'Komponen EmptyState baru, global page loader, global error boundary, pemolesan halaman 404, transisi dropdown navigasi halus, serta kerangka pemuatan (skeleton loaders).',
    approval: 'Disetujui'
  }
]
