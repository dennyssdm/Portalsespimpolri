import Image from 'next/image'

export default function Loading() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-polri-cream px-4 py-20 text-center">
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Shimmer / pulsing outer circle */}
        <div className="absolute inset-0 animate-ping rounded-full bg-polri-gold/20"></div>
        {/* Rotating outer spinner ring */}
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-polri-gold/30 border-t-polri-maroon"></div>
        {/* Center Logo */}
        <div className="relative h-16 w-16 animate-pulse">
          <Image
            src="/images/logo-sespim.png"
            alt="Logo Sespim"
            width={306}
            height={323}
            priority
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <h2 className="mt-8 text-lg font-black tracking-widest text-polri-brownDark uppercase sm:text-xl">
        Memuat Halaman...
      </h2>
      <p className="mt-2 text-sm font-semibold text-neutral-600">
        Menghubungkan ke Portal Resmi Sespim Lemdiklat Polri
      </p>
    </div>
  )
}
