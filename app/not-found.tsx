import { asset } from '@/lib/site-config'

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 text-center text-ink-foreground">
      <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">Error 404</p>
      <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-ink-foreground/70">
        La dirección que buscas no existe o ha cambiado de sitio.
      </p>
      {/* <a> normal (no <Link>): recarga completa en /<repo>/ y arranca arriba del todo */}
      <a
        href={asset('/')}
        className="mt-8 inline-flex h-12 items-center justify-center bg-primary px-6 text-base font-medium text-primary-foreground transition hover:bg-primary/90"
      >
        Volver al inicio
      </a>
    </main>
  )
}
