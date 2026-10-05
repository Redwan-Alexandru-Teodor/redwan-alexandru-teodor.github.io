'use client'

import { useEffect, useState } from 'react'
import { asset } from '@/lib/site-config'
import { useScrollLock } from '@/lib/use-scroll-lock'

// Archivo en public/docs/Documentacion.pdf
const DOCS_PDF_PATH = asset('/docs/Documentacion.pdf')

type ModalType = 'legal' | 'docs' | null

export function SiteFooter() {
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  // null = aún no se sabe (evita desajustes de hidratación). Los móviles no
  // pueden mostrar un PDF dentro de un <iframe>, así que ahí se ofrece abrirlo.
  const [pdfIncrustable, setPdfIncrustable] = useState<boolean | null>(null)

  useEffect(() => {
    const ua = navigator.userAgent
    const esMovil =
      /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
      (navigator.maxTouchPoints > 1 && /Mac/i.test(navigator.platform)) // iPadOS
    setPdfIncrustable(!esMovil && navigator.pdfViewerEnabled !== false)
  }, [])

  // Cerrar con Escape y bloquear el scroll de fondo mientras hay un modal abierto
  useScrollLock(activeModal !== null)

  useEffect(() => {
    if (!activeModal) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeModal])

  const close = () => setActiveModal(null)

  return (
    <>
      <footer className="bg-ink text-ink-foreground/70 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-sm">

            {/* Columna 1 */}
            <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
              <p className="font-medium text-ink-foreground">Redwan Alexandru Teodor</p>
              <p className="text-xs opacity-80">Técnico en Sistemas y Redes · Sevilla</p>
              <p className="text-xs opacity-60 mt-1">© {new Date().getFullYear()} Todos los derechos reservados</p>
            </div>

            {/* Columna 2 */}
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Información legal</span>
              <button
                type="button"
                onClick={() => setActiveModal('legal')}
                className="text-xs hover:underline transition-colors opacity-90 hover:opacity-100 cursor-pointer font-medium"
              >
                Aviso Legal, Privacidad y RGPD
              </button>
              <button
                type="button"
                onClick={() => setActiveModal('docs')}
                className="text-xs hover:underline transition-colors opacity-90 hover:opacity-100 cursor-pointer font-medium"
              >
                Documentación del proyecto (PDF)
              </button>
            </div>

            {/* Columna 3 */}
            <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
              <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Perfil profesional</span>
              <a
                href="https://www.linkedin.com/in/redwan-alexandru-teodor/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:underline transition-colors text-xs font-medium"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <span className="text-[11px] opacity-60">Sevilla</span>
            </div>

          </div>
        </div>
      </footer>

      {/* MODAL LEGAL (texto) */}
      {activeModal === 'legal' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-legal-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-2xl sm:p-7 text-card-foreground flex flex-col max-h-[85vh]"
          >
            {/* Cabecera */}
            <div className="flex items-center justify-between border-b pb-3 mb-4 shrink-0">
              <div>
                <h3 id="modal-legal-title" className="text-lg font-semibold leading-tight">
                  Aviso Legal, Política de Privacidad y Condiciones
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Cumplimiento del RGPD (UE) 2016/679 y la LSSI-CE 34/2002
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-muted-foreground hover:text-foreground text-sm font-medium p-1.5 rounded-lg hover:bg-accent cursor-pointer"
                aria-label="Cerrar ventana"
              >
                ✕
              </button>
            </div>

            {/* Contenido legal con scroll */}
            <div className="min-h-0 flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm text-muted-foreground pr-3 my-1 border rounded-lg p-4 bg-background/50 leading-relaxed">
              <div className="space-y-1">
                <p className="font-semibold text-foreground text-base">1. Datos Identificativos y Titularidad (LSSI-CE)</p>
                <p>
                  En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE), se informa que este sitio web es operado por <strong>Redwan Alexandru Teodor</strong>, profesional especializado en sistemas y redes, con residencia y ámbito de actuación principal en <strong>Sevilla</strong>. Puedes establecer comunicación directa mediante el formulario de contacto habilitado en la web.
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-foreground text-base">2. Protección de Datos y Privacidad (RGPD)</p>
                <p>
                  De conformidad con el Reglamento General de Protección de Datos (RGPD) UE 2016/679, te informamos que los datos personales que proporciones de forma voluntaria a través de nuestros formularios o enlaces de correo:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li><strong>No se almacenarán</strong> en ninguna base de datos automatizada de carácter comercial ni se cederán a terceros.</li>
                  <li>Serán tratados exclusivamente por el titular con la finalidad estricta de gestionar tu solicitud de asistencia o consulta técnica.</li>
                  <li>Una vez resuelta la consulta o finalizada la colaboración, los mensajes y datos asociados se eliminarán de los buzones de correo correspondientes.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-foreground text-base">3. Términos de Prestación de Servicios y Gratuidad</p>
                <p>
                  Los servicios de soporte, consultoría o mantenimiento técnico ofertados a través de esta plataforma se realizan bajo un marco de colaboración y pruebas de carácter <strong>100% gratuito</strong>. Por consiguiente:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>No implican ninguna relación laboral, mercantil permanente ni contraprestación económica por parte del beneficiario.</li>
                  <li>El usuario o entidad solicitante autoriza expresamente el uso del caso técnico o la mención de su nombre/marca como parte del portafolio profesional del titular.</li>
                  <li>Se exonera al titular de responsabilidades por imprevistos técnicos derivados de configuraciones de terceros o entornos informáticos inestables.</li>
                </ul>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-foreground text-base">4. Política de Cookies y Enlaces Externos</p>
                <p>
                  Este sitio web no utiliza cookies analíticas intrusivas, de rastreo publicitario ni perfiles de usuario. Únicamente puede emplear recursos técnicos esenciales para garantizar el correcto renderizado visual. Asimismo, la web incluye un enlace externo verificado al perfil profesional de LinkedIn del titular.
                </p>
              </div>

              <div className="pt-6 pb-2 text-center text-xs font-semibold text-primary border-t">
                --- Fin del Documento Legal e Informativo ---
              </div>
            </div>

            {/* Pie */}
            <div className="mt-4 pt-3 border-t flex justify-end shrink-0">
              <button
                type="button"
                onClick={close}
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DOCUMENTACIÓN (PDF) */}
      {activeModal === 'docs' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-docs-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-2xl border bg-card p-4 sm:p-6 shadow-2xl text-card-foreground flex flex-col h-[85dvh] sm:h-[90dvh]"
          >
            {/* Cabecera */}
            <div className="flex items-center justify-between border-b pb-3 mb-4 shrink-0">
              <div>
                <h3 id="modal-docs-title" className="text-lg font-semibold leading-tight">
                  Documentación del proyecto
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Documento PDF
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="text-muted-foreground hover:text-foreground text-sm font-medium p-1.5 rounded-lg hover:bg-accent cursor-pointer"
                aria-label="Cerrar ventana"
              >
                ✕
              </button>
            </div>

            {/* Visor PDF */}
            <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-lg border bg-background">
              {pdfIncrustable === true && (
                <iframe
                  src={DOCS_PDF_PATH}
                  title="Documentación del proyecto"
                  className="absolute inset-0 h-full w-full border-0"
                />
              )}
              {pdfIncrustable === false && (
                <div className="flex h-full flex-col items-center justify-center gap-4 overflow-y-auto p-6 text-center">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 3v5h5M9 13h6M9 17h6" />
                  </svg>
                  <p className="max-w-xs text-sm text-muted-foreground">
                    Tu dispositivo no puede mostrar el PDF dentro de esta ventana. Ábrelo en el visor de tu móvil o descárgalo.
                  </p>
                  <div className="flex w-full max-w-xs flex-col gap-2.5">
                    <a
                      href={DOCS_PDF_PATH}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                    >
                      Abrir documentación (PDF)
                    </a>
                    <a
                      href={DOCS_PDF_PATH}
                      download="Documentacion.pdf"
                      className="inline-flex h-11 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent"
                    >
                      Descargar
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Pie */}
            <div className="mt-4 pt-3 border-t flex items-center justify-between shrink-0">
              <a
                href={DOCS_PDF_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                ↗ Abrir o descargar PDF completo
              </a>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
