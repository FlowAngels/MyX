import Image from 'next/image'

export default function Splash() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black">
      <div className="relative" aria-hidden>
        {/* Ring container (bigger to match larger logo) */}
        <div className="w-[192px] h-[192px]" />
        {/* Track */}
        <div className="absolute inset-0 rounded-full border-2 border-neutral-800" />
        {/* Spinner */}
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-white animate-spin motion-reduce:animate-none"
          style={{ animationDuration: '1.5s' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/MyX-logo.png"
            alt="MyX"
            width={160}
            height={112}
            priority
            className="opacity-95 invert"
          />
        </div>
      </div>
    </div>
  )
}
