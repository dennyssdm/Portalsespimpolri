import { cn } from '@/lib/cn'

type StatusBadgeProps = {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const tone =
    status === 'Done'
      ? 'bg-green-100 text-green-800 border-green-200'
      : status === 'Need Review'
        ? 'bg-polri-yellow/25 text-polri-brownDark border-polri-yellow/50'
        : status === 'Draft'
          ? 'bg-polri-gold/15 text-polri-brownDark border-polri-gold/40'
          : 'bg-neutral-100 text-neutral-700 border-neutral-200'

  return <span className={cn('inline-flex rounded-full border px-3 py-1 text-xs font-bold', tone)}>{status}</span>
}
