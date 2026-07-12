export type DummyAccount = {
  name: string
  nrpNip: string // NRP or NIP
  phone: string // Nomor HP / WhatsApp
  password: string // Kata Sandi
  role: 'super_admin' | 'stakeholder' | 'admin' | 'serdik' | 'widyaiswara'
  roleLabel: string
  details?: Record<string, string>
}

export const dummyAccounts: DummyAccount[] = [
  {
    name: 'Denny',
    nrpNip: '197411152009121001',
    phone: '081973001974',
    password: 'polri123',
    role: 'super_admin',
    roleLabel: 'Super Admin (All Action)',
    details: {
      'Jabatan': 'Penguji Khusus',
      'Pangkat': 'Administrator Utama'
    }
  },
  {
    name: 'Irjen Pol. Midi Siswoko, S.I.K.',
    nrpNip: '70012124',
    phone: '081122334455',
    password: 'polri123',
    role: 'stakeholder',
    roleLabel: 'Super Admin Read Only / Stakeholder',
    details: {
      'Jabatan': 'Kasespim Lemdiklat Polri',
      'Pangkat': 'Inspektur Jenderal Polisi'
    }
  },
  {
    name: 'Brigjen Pol. Dr. H. Nurholis',
    nrpNip: '197505121998031002',
    phone: '081199887766',
    password: 'polri123',
    role: 'stakeholder',
    roleLabel: 'Super Admin Read Only / Stakeholder',
    details: {
      'Jabatan': 'Dewan Pengawas Akademik',
      'Pangkat': 'Brigadir Jenderal Polisi'
    }
  },
  {
    name: 'Bripda Bagus Prasetyo',
    nrpNip: '200108242022031001',
    phone: '081234567890',
    password: 'polri123',
    role: 'admin',
    roleLabel: 'Admin (Staf)',
    details: {
      'Staf ID': 'ADM-2026-08',
      'Divisi': 'Staf IT & Pengelola Konten'
    }
  },
  {
    name: 'AKBP Deny Haryanto, S.I.K., M.Si.',
    nrpNip: '84081234',
    phone: '081388889999',
    password: 'polri123',
    role: 'serdik',
    roleLabel: 'User Serdik (Peserta Didik)',
    details: {
      'NRP': '84081234',
      'Program': 'SESPIMTI POLRI',
      'Angkatan': 'Dikreg-35',
      'Pangkat': 'AKBP'
    }
  },
  {
    name: 'Irjen Pol. Chuzaini Patoppoi, S.St.Mk., S.H.',
    nrpNip: '68120455',
    phone: '081277776666',
    password: 'polri123',
    role: 'widyaiswara',
    roleLabel: 'User Widyaiswara (Tenaga Pendidik)',
    details: {
      'NIP': '68120455',
      'Keahlian': 'Manajemen Keamanan',
      'Sertifikasi': 'LSP Lemdiklat Polri'
    }
  }
]
