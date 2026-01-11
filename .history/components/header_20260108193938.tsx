"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-center px-4">
        <div className="cursor-pointer" onClick={() => router.push("/dashboard")}>
          <Image src="/logo0237.png" alt="S-Doorbell" width={250} height={77} className="h-12 w-auto" priority />
        </div>
      </div>
    </header>
  )
}
