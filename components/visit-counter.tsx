'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { goatCounterCode } from '@/lib/site-config'

/**
 * Contador de visitas discreto (datos de GoatCounter, sin cookies).
 * Requiere activar en GoatCounter: Settings → "Allow adding visitor counts on your website".
 * Si no hay código configurado no se pinta nada; si hay código pero la consulta falla,
 * se muestra un guion («—») y el motivo queda en la consola del navegador.
 */
export function VisitCounter({ className = '' }: { className?: string }) {
  const activo = /^[a-z0-9-]+$/i.test(goatCounterCode)
  const [total, setTotal] = useState<string | null>(null)

  useEffect(() => {
    if (!activo) return
    const ctl = new AbortController()
    fetch(`https://${goatCounterCode}.goatcounter.com/counter/${encodeURIComponent('/')}.json`, { signal: ctl.signal })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(`GoatCounter respondió ${r.status}`))))
      .then((d: { count?: string }) => {
        if (d.count) setTotal(String(d.count).replace(/\s/g, '.'))
      })
      .catch((err: unknown) => {
        if ((err as { name?: string }).name === 'AbortError') return
        console.warn(
          '[contador] No se pudo leer el total de visitas. Activa "Allow adding visitor counts on your website" en GoatCounter → Settings.',
          err,
        )
      })
    return () => ctl.abort()
  }, [activo])

  if (!activo) return null

  return (
    <p
      className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs opacity-70 ${className}`}
      title="Visitas totales"
      aria-label={total ? `${total} visitas totales` : 'Contador de visitas no disponible'}
    >
      <Eye className="size-3.5" aria-hidden="true" />
      <span>
        <span className="font-semibold tabular-nums">{total ?? '—'}</span>
        <span className="hidden sm:inline"> visitas</span>
      </span>
    </p>
  )
}
