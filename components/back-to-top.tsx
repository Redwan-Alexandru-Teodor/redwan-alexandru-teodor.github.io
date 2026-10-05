'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const subir = () => {
    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: sinMovimiento ? 'auto' : 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={subir}
      aria-label="Volver arriba"
      title="Volver arriba"
      className="fixed bottom-5 right-5 z-40 flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-ink text-ink-foreground shadow-lg transition hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary animate-in fade-in duration-200"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  )
}
