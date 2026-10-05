'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { goatCounterCode } from '@/lib/site-config'

/**
 * Contador de visitas discreto (datos de GoatCounter, sin cookies).
 * Requiere activar en GoatCounter: Settings → "Allow adding visitor counts on your website".
 * Si no hay código configurado o la consulta falla, no se muestra nada.
 */
export function VisitCounter({ className = '' }: { className?: string }) {
  const [total, setTotal] = useState<string | null>(null)

  useEffect(() => {
    if (!/^[a-z0-9-]+$/i.test(goatCounterCode)) return
    const ctl = new AbortController()
    fetch(`https://${goatCounterCode}.goatcounter.com/counter/TOTAL.json`, { signal: ctl.signal })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: { count?: string }) => { if (d.count) setTotal(String(d.count).replace(/\s/g, '.')) })
      .catch(() => { /* sin contador: no se muestra nada */ })
    return () => ctl.abort()
  }, [])

  if (!total) return null

  return (
    <p className={`inline-flex items-center gap-1.5 whitespace-nowrap text-xs opacity-70 ${className}`} title="Visitas totales" aria-label={`${total} visitas totales`}>
      <Eye className="size-3.5" aria-hidden="true" />
      <span><span className="font-semibold tabular-nums">{total}</span><span className="hidden sm:inline"> visitas</span></span>
    </p>
  )
}
