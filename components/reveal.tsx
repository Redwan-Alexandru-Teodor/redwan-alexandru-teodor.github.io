'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Animación de entrada al hacer scroll.
 * - Sin JavaScript (o antes de hidratar) el contenido se ve normal: nunca queda oculto.
 * - Si el bloque ya está a la vista al cargar, no se anima.
 * - Respeta "reducir movimiento" del sistema.
 * Los estilos están en globals.css ([data-reveal]).
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [estado, setEstado] = useState<'inicial' | 'oculto' | 'visible'>('inicial')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (sinMovimiento || typeof IntersectionObserver === 'undefined') {
      setEstado('visible')
      return
    }
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setEstado('visible')
      return
    }

    setEstado('oculto')
    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setEstado('visible')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-reveal={estado} className={className}>
      {children}
    </div>
  )
}
