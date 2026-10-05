'use client'

import React, { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { MailModal } from '@/components/mail-modal'
import { useActiveSection } from '@/lib/use-active-section'

const ENLACES = [
  { href: 'inicio', label: 'Inicio' },
  { href: 'sobre-mi', label: 'Sobre mí' },
  { href: 'servicios', label: 'Servicios' },
  { href: 'proyectos', label: 'Proyectos' },
] as const

// Secciones que se vigilan (incluye contacto aunque su botón no sea un enlace de texto)
const SECCIONES_VIGILADAS = [...ENLACES.map(e => e.href), 'contacto']

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMailModal, setShowMailModal] = useState(false)
  const activa = useActiveSection(SECCIONES_VIGILADAS)

  const openMail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    setShowMailModal(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 text-ink-foreground backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-end px-4 sm:px-6">

          <nav aria-label="Navegación principal" className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-6 text-sm text-ink-foreground/75">
              {ENLACES.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={`#${href}`}
                    aria-current={activa === href ? 'location' : undefined}
                    className={cn(
                      'border-b-2 border-transparent py-1 transition-colors hover:text-ink-foreground',
                      activa === href && 'border-primary text-ink-foreground',
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#correo"
                  onClick={openMail}
                  className="border-b-2 border-transparent py-1 transition-colors hover:text-ink-foreground cursor-pointer"
                >
                  Enviar correo
                </a>
              </li>
            </ul>

            <a
              href="#contacto"
              className={cn(buttonVariants({ size: 'default' }), 'px-4 hover:bg-primary/90')}
            >
              Solicitar colaboración gratuita
            </a>
          </nav>

          {/* Móvil: el botón de contacto siempre visible, sin abrir el menú */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="#contacto"
              className={cn(buttonVariants({ size: 'sm' }), 'px-3 hover:bg-primary/90')}
            >
              Solicitar colaboración
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-ink-foreground/80 hover:bg-white/10 hover:text-ink-foreground focus:outline-none"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-b border-white/10 bg-ink px-4 pt-2 pb-6 md:hidden">
            <ul className="flex flex-col gap-4 text-base text-ink-foreground/90">
              {ENLACES.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={`#${href}`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={activa === href ? 'location' : undefined}
                    className={cn(
                      'block py-2 transition-colors hover:text-primary',
                      activa === href && 'font-semibold text-primary',
                    )}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#correo"
                  onClick={openMail}
                  className="block py-2 transition-colors hover:text-primary cursor-pointer"
                >
                  Enviar correo
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      <MailModal open={showMailModal} onClose={() => setShowMailModal(false)} origen="Header" />
    </>
  )
}
