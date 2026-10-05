import { useEffect } from 'react'

// Contador compartido: si hay varios modales abiertos a la vez, el scroll solo
// se libera cuando se cierra el último.
let bloqueos = 0
let overflowPrevio = ''

/** Bloquea el scroll del fondo mientras `activo` sea true. */
export function useScrollLock(activo: boolean) {
  useEffect(() => {
    if (!activo) return
    if (bloqueos === 0) {
      overflowPrevio = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    bloqueos++
    return () => {
      bloqueos--
      if (bloqueos === 0) document.body.style.overflow = overflowPrevio
    }
  }, [activo])
}
