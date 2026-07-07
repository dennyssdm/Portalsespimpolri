type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
  center?: boolean
}

export function SectionTitle({ eyebrow, title, description, center = false }: SectionTitleProps) {
  return (
    <div className={center ? 'mx-auto min-w-0 max-w-3xl text-center' : 'min-w-0 max-w-3xl'}>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.24em] text-polri-gold">{eyebrow}</p> : null}
      <h2 className="mt-3 text-2xl font-black tracking-tight text-polri-brownDark sm:text-3xl lg:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-neutral-700">{description}</p> : null}
    </div>
  )
}
