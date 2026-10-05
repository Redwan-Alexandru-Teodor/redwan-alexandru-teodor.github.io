'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  Server,
  Cpu,
  DatabaseBackup,
  HardDriveDownload,
  Network,
  Wrench,
  Headset,
  Clock,
  type LucideIcon,
} from 'lucide-react'
import servicios, { tecnologias } from '@/data/servicios'

const ICONOS: Record<string, LucideIcon> = {
  mantenimiento: Wrench,
  seguridad: ShieldCheck,
  virtualizacion: Server,
  copias: DatabaseBackup,
  recuperacion: HardDriveDownload,
  redes: Network,
  hardware: Cpu,
  soporte: Headset,
}

export function Services() {
  // Estado para controlar qué tarjeta está abierta en móviles al hacer clic/toque
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="servicios"
      aria-labelledby="services-title"
      className="border-y bg-secondary/60 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Servicios
          </p>
          <h2
            id="services-title"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Servicios prestados
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Soluciones integrales en sistemas microinformáticos, redes locales y
            mantenimiento técnico adaptadas a particulares y pymes.
          </p>
        </div>

        <ul className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map(({ id, label, description, tiempo }, index) => {
            const Icon = ICONOS[id] ?? Wrench
            const isOpen = openIndex === index

            return (
              <li
                key={id}
                className="group flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center gap-3 text-left"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-snug">
                    {label}
                  </span>
                </button>

                {/* Descripción animada: abre por click en móvil (isOpen) o hover en PC (group-hover) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  } lg:group-hover:grid-rows-[1fr]`}
                >
                  <div className="overflow-hidden">
                    <p className="mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
                      <Clock className="size-3.5 text-primary" aria-hidden="true" />
                      Tiempo orientativo: {tiempo}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Índice de tecnologías */}
        <div className="mt-16" aria-labelledby="stack-title">
          <h3 id="stack-title" className="text-center text-lg font-semibold tracking-tight">
            Tecnologías con las que trabajo
          </h3>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tecnologias.map(({ area, items }) => (
              <div key={area} className="rounded-xl border bg-card p-5 shadow-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-primary">{area}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {items.map(item => (
                    <span key={item} className="rounded-md border bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
