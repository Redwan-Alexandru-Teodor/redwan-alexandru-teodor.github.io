'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Clock, Mail, Send, ShieldCheck, Wallet, Wrench } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { asset, disponible } from '@/lib/site-config'
import { cn } from '@/lib/utils'

import { MailModal } from '@/components/mail-modal'

export function Hero() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      {/* PRESENTACIÓN HERO */}
      <section id="inicio" className="relative overflow-hidden bg-ink text-ink-foreground">
        {/* Grid decorativo de fondo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 md:py-28">
          {/* Avatar */}
          <div className="rounded-full bg-gradient-to-b from-primary to-primary/30 p-1">
            <Image
              src={asset('/images/perfil.jpg')}
              alt="Retrato de Redwan Alexandru Teodor"
              width={160}
              height={160}
              priority
              className="h-32 w-32 rounded-full border-4 border-ink object-cover md:h-40 md:w-40"
            />
          </div>

          {/* Badge */}
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-ink-foreground/80">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Servicio técnico IT profesional
          </p>

          {disponible && (
            <p className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Disponible para nuevos proyectos
            </p>
          )}

          {/* Nombre */}
          <h1
            id="hero-title"
            className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            Redwan Alexandru Teodor
          </h1>

          {/* Subtítulo */}
          <p className="mt-4 text-lg font-medium text-sky-400 sm:text-xl">
            Técnico en Sistemas y Redes
          </p>

          {/* Descripción */}
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-ink-foreground/70">
            Soporte informático, redes y protección de datos para particulares y
            empresas, con un enfoque riguroso y resolutivo.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#contacto"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 px-6 text-base hover:bg-primary/90',
              )}
            >
              <Send className="mr-2 h-5 w-5" aria-hidden="true" />
              Solicitar colaboración gratuita
            </a>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'h-12 border-white/20 bg-transparent px-6 text-base text-ink-foreground hover:bg-white/10 cursor-pointer',
              )}
            >
              <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
              Enviar correo
            </button>
          </div>

          {/* Ventajas, centradas y sin cifras */}
          <ul className="mt-12 flex w-full max-w-2xl flex-col items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-6 text-sm text-ink-foreground/80 sm:flex-row">
            <li className="flex items-center gap-2">
              <Wallet className="size-4 text-primary" aria-hidden="true" />
              Sin coste para ti
            </li>
            <li className="flex items-center gap-2">
              <Clock className="size-4 text-primary" aria-hidden="true" />
              Respuesta en menos de 24 horas
            </li>
            <li className="flex items-center gap-2">
              <Wrench className="size-4 text-primary" aria-hidden="true" />
              Presencial o remoto
            </li>
          </ul>
        </div>
      </section>

      <MailModal open={showModal} onClose={() => setShowModal(false)} origen="Hero" />
    </>
  )
}
