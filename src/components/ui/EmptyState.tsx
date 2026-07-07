import React from 'react'
import Link from 'next/link'
import { InboxIcon } from '@heroicons/react/24/outline'

type EmptyStateProps = {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({
  title = 'Tidak Ada Konten',
  description = 'Maaf, data atau konten yang Anda cari saat ini belum tersedia.',
  icon,
  action
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-polri-gold/20 bg-polri-cream/40 px-6 py-12 text-center shadow-soft md:py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-polri-cream text-polri-gold shadow-inner border border-polri-gold/10">
        {icon ?? <InboxIcon className="h-8 w-8 text-polri-gold" aria-hidden="true" />}
      </div>
      <h3 className="mt-5 text-xl font-black text-polri-brownDark md:text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-neutral-600 md:text-base">
        {description}
      </p>
      {action ? (
        <div className="mt-6">
          <Link
            href={action.href}
            className="inline-flex rounded-xl bg-polri-maroon px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-polri-brownDark hover:shadow-soft"
          >
            {action.label}
          </Link>
        </div>
      ) : null}
    </div>
  )
}
