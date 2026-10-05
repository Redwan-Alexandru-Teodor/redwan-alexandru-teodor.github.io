'use client'

import React, { useEffect } from 'react'
import { correoConfigurado, generarMailtoUrl } from '@/lib/mail'
import { useScrollLock } from '@/lib/use-scroll-lock'

interface MailModalProps {
  open: boolean
  onClose: () => void
  /** Texto que aparece en el asunto: "GitHub Pages", "Hero", etc. */
  origen?: string
}

export function MailModal({ open, onClose, origen = 'GitHub Pages' }: MailModalProps) {
  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleConfirmar = () => {
    if (!correoConfigurado) { onClose(); return }
    try {
      const mailtoUrl = generarMailtoUrl(origen)
      onClose()
      const link = document.createElement('a')
      link.href = mailtoUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error al procesar la dirección de correo:', error)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="mail-modal-title" onClick={e => e.stopPropagation()} className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl dark:border-primary/60 sm:p-7 text-card-foreground">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h3 id="mail-modal-title" className="text-lg font-semibold leading-none">Confirmar envío</h3>
            <p className="text-xs text-muted-foreground mt-1">Acción requerida</p>
          </div>
        </div>

        {correoConfigurado ? (
          <p className="text-sm text-muted-foreground mb-6">
            ¿Deseas abrir tu aplicación de correo electrónico para enviar el mensaje? Se incluirá un
            código de identificación único en el asunto.
          </p>
        ) : (
          <p role="alert" className="text-sm text-destructive mb-6">
            El correo de contacto no está configurado en esta versión de la web. Usa el formulario
            de contacto o vuelve a intentarlo más tarde.
          </p>
        )}

        <div className="flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={!correoConfigurado}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 cursor-pointer disabled:pointer-events-none disabled:opacity-50"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  )
}
