'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * Tema claro/oscuro con una única fuente de verdad: la clase `dark` de <html>.
 * Todos los botones (escritorio y móvil) leen de ahí, así nunca se desincronizan.
 * Si el visitante no ha elegido tema, se sigue el del sistema en tiempo real.
 */
const CLAVE = 'theme'

function guardado(): string | null {
  try { return localStorage.getItem(CLAVE) } catch { return null }
}

function aplicar(oscuro: boolean) {
  const root = document.documentElement
  root.classList.toggle('dark', oscuro)
  root.style.colorScheme = oscuro ? 'dark' : 'light'
  // Barra del navegador en móvil
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach(m => m.setAttribute('content', oscuro ? '#0f141e' : '#131b26'))
}

const oyentes = new Set<() => void>()
const avisar = () => oyentes.forEach(l => l())

function suscribir(cb: () => void) {
  oyentes.add(cb)

  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  const onSistema = () => {
    if (guardado() === null) { aplicar(mq.matches); avisar() }
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key === CLAVE || e.key === null) {
      aplicar(e.newValue === 'dark' || (e.newValue === null && mq.matches))
      avisar()
    }
  }
  mq.addEventListener('change', onSistema)
  window.addEventListener('storage', onStorage)

  // Asegura que la clase coincide con la preferencia en cuanto hay JS
  const g = guardado()
  const oscuro = g === 'dark' || (g === null && mq.matches)
  if (document.documentElement.classList.contains('dark') !== oscuro) { aplicar(oscuro); avisar() }

  return () => {
    oyentes.delete(cb)
    mq.removeEventListener('change', onSistema)
    window.removeEventListener('storage', onStorage)
  }
}

const leer = () => document.documentElement.classList.contains('dark')

export function useTheme() {
  const oscuro = useSyncExternalStore(suscribir, leer, () => false)

  const alternar = useCallback(() => {
    const siguiente = !leer()
    aplicar(siguiente)
    try { localStorage.setItem(CLAVE, siguiente ? 'dark' : 'light') } catch { /* modo privado */ }
    avisar()
  }, [])

  return { oscuro, alternar }
}
