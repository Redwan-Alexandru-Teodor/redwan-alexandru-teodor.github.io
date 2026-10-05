import { Euro, HardDrive, Headset, Lightbulb, MapPin, Wrench, type LucideIcon } from 'lucide-react'

const highlights: { icon: LucideIcon; label: string }[] = [
  { icon: Headset, label: 'Soporte informático' },
  { icon: Wrench, label: 'Mantenimiento de equipos' },
  { icon: Lightbulb, label: 'Consultoría TI' },
  { icon: HardDrive, label: 'Copias de seguridad y recuperación' },
]

const facts: { icon: LucideIcon; title: string; value: string }[] = [
  { icon: MapPin, title: 'Ubicación', value: 'Sevilla y alrededores' },
  { icon: Euro, title: 'Coste', value: 'Sin coste para ti' },
]

export function About() {
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Sobre mí</p>
          <h2
            id="about-title"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Tecnología que funciona, sin complicaciones
          </h2>
          <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            <p>
              Cuento con amplia experiencia en soporte informático, mantenimiento de equipos y
              consultoría TI, ayudando a particulares, autónomos y pequeñas empresas a mantener sus
              sistemas seguros, rápidos y disponibles.
            </p>
            <p>
              Me especializo en la implantación de soluciones de copias de seguridad y en la
              recuperación de datos, para que tu información esté siempre protegida. Trabajo con un
              enfoque riguroso y resolutivo: diagnóstico preciso, soluciones claras y seguimiento
              hasta que todo funciona correctamente.
            </p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm font-medium">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-4 lg:col-span-2" aria-label="Información práctica">
          {facts.map(({ icon: Icon, title, value }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-xl border bg-card p-6 shadow-sm"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-lg font-semibold">{value}</p>
              </div>
            </div>
          ))}
          <div className="rounded-xl bg-ink p-6 text-ink-foreground">
            <p className="text-sm text-ink-foreground/70">Compromiso</p>
            <p className="mt-1 text-pretty font-medium leading-relaxed">
              Respuesta ágil, propuesta transparente y atención presencial o remota.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
