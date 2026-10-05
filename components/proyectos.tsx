'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react'
import { asset } from '@/lib/site-config'
import { useScrollLock } from '@/lib/use-scroll-lock'
import { cn } from '@/lib/utils'
import proyectos from '@/data/proyectos'
import type { ProyectoData } from '@/data/proyectos/types'

// ─────────────────────────────────────────────────────────────────────────────
//  Icono GitHub
// ─────────────────────────────────────────────────────────────────────────────
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Renderizador de Markdown mínimo (sin dependencias externas)
// ─────────────────────────────────────────────────────────────────────────────
function dividirSecciones(md: string): { titulo: string; contenido: string }[] {
  const out: { titulo: string; contenido: string }[] = []
  for (const bloque of md.split(/^## /m)) {
    if (!bloque.trim()) continue
    const [titulo, ...resto] = bloque.split('\n')
    out.push({ titulo: titulo.trim(), contenido: resto.join('\n') })
  }
  return out.length ? out : [{ titulo: 'Detalles', contenido: md }]
}

function renderMarkdown(md: string): React.ReactNode[] {
  const lines = md.split('\n')
  const nodes: React.ReactNode[] = []
  let i = 0

  const parseInline = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
    return parts.map((p, idx) => {
      if (p.startsWith('**') && p.endsWith('**'))
        return <strong key={idx}>{p.slice(2, -2)}</strong>
      if (p.startsWith('`') && p.endsWith('`'))
        return <code key={idx} className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{p.slice(1, -1)}</code>
      return p
    })
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) { code.push(lines[i]); i++ }
      i++
      nodes.push(
        <pre key={`code-${i}`} className="my-4 overflow-x-auto border border-border bg-muted p-4 font-mono text-[13px] leading-6 text-foreground">
          <code>{code.join('\n')}</code>
        </pre>
      )
      continue
    }

    if (line.startsWith('## ')) {
      nodes.push(<h2 key={i} className="mb-4 mt-9 border-b border-border pb-2 text-xl font-semibold text-foreground">{line.slice(3)}</h2>)
      i++; continue
    }
    if (line.startsWith('### ')) {
      nodes.push(<h3 key={i} className="mb-2 mt-6 text-lg font-semibold text-foreground">{line.slice(4)}</h3>)
      i++; continue
    }

    if (line.startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].startsWith('|')) { tableLines.push(lines[i]); i++ }
      const rows = tableLines.filter(l => !l.match(/^\|[-| ]+\|$/))
      const celdas = (row: string) => row.split('|').slice(1, -1).map(c => c.trim())
      nodes.push(
        <div key={`table-${i}`} className="my-5 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {celdas(rows[0]).map((cell, ci) => (
                  <th key={ci} className="border border-border bg-muted px-4 py-2 text-left font-semibold text-foreground">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className={ri % 2 === 1 ? 'bg-muted/50' : ''}>
                  {celdas(row).map((cell, ci) => (
                    <td key={ci} className="border border-border px-4 py-2 text-foreground/85">{parseInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) { items.push(lines[i].slice(2)); i++ }
      nodes.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2 pl-2">
          {items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-3 text-foreground/85">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\. /, '')); i++ }
      nodes.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2 pl-6 list-decimal marker:text-primary">
          {items.map((item, ii) => (
            <li key={ii} className="pl-1 text-foreground/85">{parseInline(item)}</li>
          ))}
        </ol>
      )
      continue
    }

    if (line.trim() === '') { i++; continue }

    nodes.push(<p key={i} className="my-3 leading-7 text-foreground/85">{parseInline(line)}</p>)
    i++
  }

  return nodes
}

// ─────────────────────────────────────────────────────────────────────────────
//  Elementos compartidos
// ─────────────────────────────────────────────────────────────────────────────
function BotonCerrar({ onClick, label = 'Cerrar' }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label}
      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border border-border bg-card text-foreground/85 transition hover:bg-muted hover:text-foreground">
      <X className="h-4 w-4" />
    </button>
  )
}

const BOTON_FLECHA =
  'absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border border-border bg-card/95 text-foreground shadow-sm transition hover:bg-card'

// ─────────────────────────────────────────────────────────────────────────────
//  Visor de fotos
// ─────────────────────────────────────────────────────────────────────────────
const ZOOM_MIN = 1
const ZOOM_MAX = 6
const ZOOM_PASO = 0.25

type Punto = { x: number; y: number }

function Visor({
  fotos, titulo, indice, onCambiar, onCerrar,
}: { fotos: string[]; titulo: string; indice: number; onCambiar: (i: number) => void; onCerrar: () => void }) {
  const total = fotos.length
  const [zoom, setZoom] = useState(1)
  const [pos, setPos] = useState<Punto>({ x: 0, y: 0 })
  const [arrastrando, setArrastrando] = useState(false)
  const areaRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef(1)
  const punteros = useRef(new Map<number, Punto>())
  const gesto = useRef<{ pos: Punto; inicio: Punto; distancia: number; zoom: number } | null>(null)

  // Mantiene la imagen dentro del área visible al moverla
  const limitar = useCallback((p: Punto, z: number): Punto => {
    const el = areaRef.current
    if (!el || z <= 1) return { x: 0, y: 0 }
    const mx = (el.clientWidth * (z - 1)) / 2
    const my = (el.clientHeight * (z - 1)) / 2
    return { x: Math.max(-mx, Math.min(mx, p.x)), y: Math.max(-my, Math.min(my, p.y)) }
  }, [])

  const aplicarZoom = useCallback((valor: number) => {
    const z = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(valor * 100) / 100))
    zoomRef.current = z
    setZoom(z)
    setPos(prev => limitar(prev, z))
  }, [limitar])

  const reiniciar = useCallback(() => { aplicarZoom(1); setPos({ x: 0, y: 0 }) }, [aplicarZoom])

  const ir = useCallback((d: number) => {
    reiniciar()
    onCambiar((indice + d + total) % total)
  }, [indice, total, onCambiar, reiniciar])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); onCerrar() }
      else if (e.target instanceof HTMLInputElement) return // no interferir con la barra de zoom
      else if (e.key === 'ArrowLeft' && total > 1) ir(-1)
      else if (e.key === 'ArrowRight' && total > 1) ir(1)
      else if (e.key === '+' || e.key === '=') aplicarZoom(zoomRef.current + ZOOM_PASO)
      else if (e.key === '-') aplicarZoom(zoomRef.current - ZOOM_PASO)
      else if (e.key === '0') reiniciar()
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [ir, onCerrar, total, aplicarZoom, reiniciar])

  // Rueda del ratón (listener nativo no pasivo para poder evitar el scroll de la página)
  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      aplicarZoom(zoomRef.current * (e.deltaY < 0 ? 1.12 : 1 / 1.12))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [aplicarZoom])

  // Arrastrar con 1 puntero (ratón/dedo) y pellizcar con 2 dedos
  const empezarGesto = () => {
    const pts = [...punteros.current.values()]
    gesto.current = {
      pos, zoom: zoomRef.current,
      inicio: pts[0],
      distancia: pts.length > 1 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0,
    }
  }
  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    punteros.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    empezarGesto()
    if (zoomRef.current > 1) setArrastrando(true)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!punteros.current.has(e.pointerId) || !gesto.current) return
    punteros.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const pts = [...punteros.current.values()]
    const g = gesto.current
    if (pts.length >= 2 && g.distancia > 0) {
      aplicarZoom(g.zoom * (Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) / g.distancia))
    } else if (zoomRef.current > 1) {
      setPos(limitar({ x: g.pos.x + pts[0].x - g.inicio.x, y: g.pos.y + pts[0].y - g.inicio.y }, zoomRef.current))
    }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    punteros.current.delete(e.pointerId)
    if (punteros.current.size === 0) { gesto.current = null; setArrastrando(false) }
    else empezarGesto()
  }

  const BTN = 'flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border border-border bg-card text-foreground/85 transition hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-10"
      onClick={e => { e.stopPropagation(); onCerrar() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${titulo} — imagen ${indice + 1} de ${total}`}
        className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden border border-border bg-card text-card-foreground shadow-2xl dark:border-primary/60 animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card py-2.5 pl-4 pr-3 sm:pl-5">
          <span className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {titulo}{total > 1 && ` · ${indice + 1} / ${total}`}
          </span>
          <BotonCerrar onClick={onCerrar} label="Cerrar imagen" />
        </div>

        <div
          ref={areaRef}
          className={cn('relative flex min-h-0 flex-1 touch-none select-none items-center justify-center overflow-hidden bg-slate-900',
            zoom > 1 ? (arrastrando ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default')}
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
        >
          <div style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`, transition: arrastrando ? 'none' : 'transform 120ms ease-out' }}>
            <Image key={indice} src={asset(fotos[indice])} alt={`${titulo} — imagen ${indice + 1}`}
              width={0} height={0} sizes="100vw" draggable={false}
              className="block h-auto max-h-[calc(100dvh-10.5rem)] w-auto max-w-full object-contain sm:max-h-[calc(100dvh-13rem)]" />
          </div>
          {total > 1 && (
            <>
              <button type="button" onClick={() => ir(-1)} aria-label="Foto anterior" className={cn(BOTON_FLECHA, 'left-2 sm:left-3')}
                onPointerDown={e => e.stopPropagation()}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => ir(1)} aria-label="Foto siguiente" className={cn(BOTON_FLECHA, 'right-2 sm:right-3')}
                onPointerDown={e => e.stopPropagation()}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Barra de zoom */}
        <div className="flex shrink-0 items-center gap-2 border-t border-border bg-card px-3 py-2.5 sm:gap-3 sm:px-5">
          <button type="button" className={BTN} onClick={() => aplicarZoom(zoom - ZOOM_PASO)} disabled={zoom <= ZOOM_MIN} aria-label="Alejar" title="Alejar (-)">
            <ZoomOut className="h-4 w-4" />
          </button>
          <input
            type="range" min={ZOOM_MIN * 100} max={ZOOM_MAX * 100} step={5}
            value={Math.round(zoom * 100)}
            onChange={e => aplicarZoom(Number(e.target.value) / 100)}
            aria-label="Nivel de zoom"
            className="h-2 min-w-0 flex-1 cursor-pointer accent-primary"
          />
          <button type="button" className={BTN} onClick={() => aplicarZoom(zoom + ZOOM_PASO)} disabled={zoom >= ZOOM_MAX} aria-label="Acercar" title="Acercar (+)">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button type="button" onClick={reiniciar} aria-label="Restablecer zoom" title="Restablecer (0)"
            className="h-9 min-w-[3.25rem] shrink-0 cursor-pointer border border-border bg-card px-2 text-xs font-semibold tabular-nums text-foreground/85 transition hover:bg-muted">
            {Math.round(zoom * 100)}%
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Galería (fijamos la altura del contenedor para que las flechas no se muevan)
// ─────────────────────────────────────────────────────────────────────────────
function Galeria({ portada, galeria, titulo }: { portada: string; galeria: string[]; titulo: string }) {
  const fotos = [portada, ...galeria]
  const [actual, setActual] = useState(0)
  const [completa, setCompleta] = useState(false)
  const cerrarVisor = useCallback(() => setCompleta(false), [])

  const anterior = useCallback(() => setActual(p => (p - 1 + fotos.length) % fotos.length), [fotos.length])
  const siguiente = useCallback(() => setActual(p => (p + 1) % fotos.length), [fotos.length])

  useEffect(() => {
    if (completa || fotos.length < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') anterior()
      else if (e.key === 'ArrowRight') siguiente()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [completa, fotos.length, anterior, siguiente])

  const inicioX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { inicioX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (inicioX.current === null || fotos.length < 2) return
    const dx = e.changedTouches[0].clientX - inicioX.current
    inicioX.current = null
    if (Math.abs(dx) > 40) (dx < 0 ? siguiente : anterior)()
  }

  return (
    <div className="relative w-full">
      {/* Contenedor con altura fija para evitar saltos verticales en los botones */}
      <div className="relative h-[50dvh] min-h-[320px] max-h-[520px] w-full overflow-hidden bg-slate-900" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="relative block h-full w-full">
          <Image key={actual} src={asset(fotos[actual])} alt={`${titulo} — imagen ${actual + 1}`}
            fill sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain" priority={actual === 0} />
        </div>
        <button type="button" onClick={() => setCompleta(true)} aria-label="Ampliar imagen" title="Ampliar imagen"
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center border border-border bg-card/95 text-foreground shadow-sm transition hover:bg-card">
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </button>
        {fotos.length > 1 && (
          <>
            <span className="pointer-events-none absolute bottom-3 left-3 z-10 border border-border bg-card/95 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm" aria-live="polite">
              {actual + 1} / {fotos.length}
            </span>
            <button type="button" onClick={anterior} aria-label="Foto anterior" className={cn(BOTON_FLECHA, 'left-3')}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={siguiente} aria-label="Foto siguiente" className={cn(BOTON_FLECHA, 'right-3')}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {fotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-border bg-muted px-4 py-3">
          {fotos.map((foto, idx) => (
            <button key={idx} type="button" onClick={() => setActual(idx)} aria-label={`Miniatura ${idx + 1}`}
              className={cn('relative h-12 w-20 shrink-0 cursor-pointer overflow-hidden border-2 transition sm:h-14 sm:w-24',
                idx === actual ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100')}>
              <Image src={asset(foto)} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      {completa && <Visor fotos={fotos} titulo={titulo} indice={actual} onCambiar={setActual} onCerrar={cerrarVisor} />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Pop-up del proyecto
// ─────────────────────────────────────────────────────────────────────────────
function ProyectoModal({ proyecto, onClose }: { proyecto: ProyectoData; onClose: () => void }) {
  const secciones = dividirSecciones(proyecto.readme)
  const [tab, setTab] = useState(0)

  useScrollLock(true)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-0 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        className="relative flex h-full max-h-[100dvh] w-full max-w-3xl flex-col overflow-hidden border border-border bg-card text-card-foreground shadow-2xl dark:border-primary/60 animate-in fade-in zoom-in-95 duration-200 sm:h-auto sm:max-h-[92dvh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-card py-2.5 pl-5 pr-3 sm:pl-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Proyecto</span>
          <BotonCerrar onClick={onClose} />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <Galeria portada={proyecto.portada} galeria={proyecto.galeria} titulo={proyecto.titulo} />

          <div className="px-5 pt-6 sm:px-8">
            <h1 id="modal-titulo" className="text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
              {proyecto.titulo}
            </h1>
            <p className="mt-2 leading-7 text-muted-foreground">{proyecto.subtitulo}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologías">
              {proyecto.tecnologias.map(tech => (
                <li key={tech} className="border border-border bg-muted px-2.5 py-1 text-xs font-semibold text-foreground">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div role="tablist" aria-label="Secciones del proyecto"
            className="sticky top-0 z-10 mt-6 flex overflow-x-auto border-b border-border bg-card px-5 sm:px-8">
            {secciones.map((sec, idx) => (
              <button key={sec.titulo} type="button" role="tab" aria-selected={idx === tab} onClick={() => setTab(idx)}
                className={cn('-mb-px shrink-0 cursor-pointer border-b-2 px-4 py-3 text-sm font-semibold transition',
                  idx === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                {sec.titulo}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="px-5 pb-10 pt-4 text-[15px] sm:px-8">
            {renderMarkdown(secciones[tab].contenido)}
          </div>
        </div>

        {proyecto.github && (
          <div className="shrink-0 border-t border-border bg-card px-5 py-4 sm:px-8">
            <a href={proyecto.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-border bg-card py-3 text-sm font-semibold text-foreground transition hover:bg-muted">
              <GithubIcon aria-hidden="true" />
              Ver en GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Sección principal
// ─────────────────────────────────────────────────────────────────────────────
export function Proyectos() {
  const [seleccionado, setSeleccionado] = useState<ProyectoData | null>(null)
  const cerrar = useCallback(() => setSeleccionado(null), [])

  return (
    <>
      <section id="proyectos" aria-labelledby="proyectos-title" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Proyectos</p>
            <h2 id="proyectos-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Proyectos destacados
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              Mi primer proyecto documentado es esta misma web. Pulsa en un proyecto para ver sus detalles.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {proyectos.map(proyecto => (
              <li key={proyecto.id}>
                <button
                  type="button"
                  onClick={() => setSeleccionado(proyecto)}
                  aria-haspopup="dialog"
                  className="group w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card text-left text-card-foreground shadow-sm dark:border-primary/40 dark:hover:border-primary/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-muted">
                    <Image
                      src={asset(proyecto.portada)}
                      alt={proyecto.titulo}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between px-6 py-5">
                    <span className="text-lg font-semibold leading-snug text-foreground">{proyecto.titulo}</span>
                    <span className="ml-3 shrink-0 text-xs font-medium text-primary sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                      Ver más →
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {seleccionado && <ProyectoModal proyecto={seleccionado} onClose={cerrar} />}
    </>
  )
}
