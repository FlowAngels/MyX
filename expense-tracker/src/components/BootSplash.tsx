"use client"

import { useEffect, useState } from 'react'
import Splash from '@/components/Splash'

type Props = {
  minMs?: number
}

export default function BootSplash({ minMs = 2000 }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), Math.max(0, minMs))
    return () => clearTimeout(timer)
  }, [minMs])

  if (!visible) return null
  return <Splash />
}

