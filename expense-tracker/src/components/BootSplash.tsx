"use client"

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Splash from '@/components/Splash'

type Props = {
  minMs?: number
  children: React.ReactNode
}

export default function BootSplash({ minMs = 2000, children }: Props) {
  const [isClient, setIsClient] = useState(false)
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Show splash for at least minMs on first load
    const timer = setTimeout(() => setShowSplash(false), Math.max(0, minMs))
    setShowSplash(true)
    return () => clearTimeout(timer)
  }, [minMs])

  // Always render children so SSR and client trees align
  const content = <>{children}</>
  if (!isClient || !showSplash) return content

  const root = document.getElementById('bootsplash-root')
  if (!root) return content

  return (
    <>
      {content}
      {createPortal(<Splash />, root)}
    </>
  )
}
