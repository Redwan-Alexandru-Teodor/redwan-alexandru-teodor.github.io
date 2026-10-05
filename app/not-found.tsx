import { asset } from '@/lib/site-config'

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 text-center text-ink-foreground overflow-hidden relative">

      {/* Fondo decorativo tipo grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(oklch(0.97 0.005 250) 1px, transparent 1px), linear-gradient(90deg, oklch(0.97 0.005 250) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Pantalla azul SVG */}
      <div aria-hidden="true" className="relative mb-8 w-72 sm:w-80 select-none">
        <svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" className="w-full drop-shadow-2xl rounded-xl">
          <rect x="0" y="0" width="320" height="200" rx="12" fill="#0000AA" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 10 + 5} x2="320" y2={i * 10 + 5} stroke="white" strokeOpacity="0.03" strokeWidth="1" />
          ))}
          <text x="16" y="32" fill="white" fontFamily="monospace" fontSize="13" fontWeight="bold">:(</text>
          <text x="16" y="60" fill="white" fontFamily="monospace" fontSize="11">Tu PC encontró un problema.</text>
          <text x="16" y="78" fill="white" fontFamily="monospace" fontSize="11">Código de error: 0x00000404</text>
          <text x="16" y="96" fill="white" fontFamily="monospace" fontSize="11">PAGE_NOT_FOUND_EXCEPTION</text>
          <text x="16" y="124" fill="white" fontFamily="monospace" fontSize="9" fillOpacity="0.8">Si quieres saber más, busca este error en</text>
          <text x="16" y="138" fill="white" fontFamily="monospace" fontSize="9" fillOpacity="0.8">internet: &quot;página que desapareció sin avisar&quot;</text>
          <text x="16" y="166" fill="white" fontFamily="monospace" fontSize="9" fillOpacity="0.7">Recopilando información del error... 100%</text>
          <text x="16" y="184" fill="white" fontFamily="monospace" fontSize="9" fillOpacity="0.7">Reiniciando en 0 segundos.  ( ͡° ͜ʖ ͡°)</text>
        </svg>

        {/* Cable desconectado */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
          <div className="h-5 w-2 bg-ink-foreground/30 rounded-b" />
          <div className="h-3 w-4 bg-ink-foreground/20 rounded-sm" />
          <div className="relative">
            <div className="h-4 w-2 bg-ink-foreground/30 rounded-t translate-y-1 ml-3" />
            <div className="absolute -top-1 left-0 text-[10px] text-sky-400 font-mono">✂</div>
          </div>
        </div>
      </div>

      {/* Texto */}
      <p className="text-xs font-mono uppercase tracking-widest text-sky-400 mt-6">
        Error 404 — Señal perdida
      </p>
      <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-ink-foreground/60">
        Parece que este cable no lleva a ningún sitio.
        La dirección que buscas no existe o ha cambiado de sitio.
      </p>

      {/* Terminal hint */}
      <div className="mt-5 rounded-lg border border-ink-foreground/10 bg-black/30 px-4 py-2 font-mono text-xs text-sky-400">
        <span className="text-ink-foreground/40">$ </span>
        ping página_perdida — <span className="text-red-400">Request timeout</span>
      </div>

      {/* CTA — <a> normal (no <Link>): recarga completa en /<repo>/ */}
      <a
        href={asset('/')}
        className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-medium text-primary-foreground transition hover:bg-primary/90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Volver al inicio
      </a>
    </main>
  )
}
