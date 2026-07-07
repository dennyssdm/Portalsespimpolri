import Image from 'next/image'
import { Container } from '@/components/ui/Container'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  imageSrc?: string
  imageAlt?: string
  imagePosition?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc = '/images/sespim-campus-hero.png',
  imageAlt = 'Kampus Sespim Lemdiklat Polri',
  imagePosition = 'center'
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-polri-brownDark py-16 text-white sm:py-20">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-polri-brownDark via-polri-brownDark/84 to-polri-maroon/56" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-polri-gold to-transparent" />
      <Container className="relative z-10">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-polri-goldSoft">{eyebrow}</p>
          <h1 className="mt-4 break-words text-3xl font-black leading-tight tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/82 sm:text-lg">{description}</p>
        </div>
      </Container>
    </section>
  )
}
