import { useEffect, useState } from 'react'

/**
 * Devuelve el id de la sección que ocupa la franja central de la pantalla.
 * Se usa en el menú para resaltar el enlace de la sección visible.
 */
export function useActiveSection(ids: string[]): string | null {
  const [activa, setActiva] = useState<string | null>(null)
  const clave = ids.join('|')

  useEffect(() => {
    const secciones = clave
      .split('|')
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (secciones.length === 0 || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      entradas => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) setActiva(entrada.target.id)
        }
      },
      // Franja fina en el centro-alto de la pantalla: solo una sección a la vez
      { rootMargin: '-40% 0px -55% 0px' },
    )
    secciones.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [clave])

  return activa
}
