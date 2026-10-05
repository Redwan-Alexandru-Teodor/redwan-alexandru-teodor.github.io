'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'

import { PAISES, PAIS_DEFAULT, type Pais } from '@/lib/paises'
import { contactEmail } from '@/lib/site-config'
import { correoConfigurado, generarIdUnico, zonaHoraria } from '@/lib/mail'
import { useScrollLock } from '@/lib/use-scroll-lock'

const serviceOptions = [
  'Mantenimiento Informático',
  'Seguridad y Protección',
  'Virtualización y Servidores',
  'Copias de Seguridad',
  'Recuperación de Datos',
  'Infraestructura de Redes',
  'Optimización de Hardware',
  'Soporte Técnico y Remoto',
  'Otro',
]

// ---------------------------------------------------------------------------
// Helpers de validación
// ---------------------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validarNombre(v: string) {
  if (!v.trim()) return 'El nombre es obligatorio.'
  if (v.trim().length < 2) return 'Mínimo 2 caracteres.'
  if (v.trim().length > 100) return 'Máximo 100 caracteres.'
  return ''
}
function validarEmail(v: string) {
  if (!v.trim()) return 'El correo es obligatorio.'
  if (!EMAIL_RE.test(v.trim())) return 'Introduce un correo válido.'
  return ''
}
function validarTelefono(numero: string, pais: Pais) {
  if (!numero.trim()) return ''
  const limpio = numero.replace(/[\s\-().]/g, '')
  if (!pais.regex.test(limpio)) return `Número no válido para ${pais.nombre}${pais.placeholder ? ` (ej: ${pais.placeholder})` : ''}.`
  return ''
}
function validarServicio(v: string) {
  if (!v) return 'Selecciona un servicio.'
  return ''
}
function validarAsunto(v: string) {
  if (!v.trim()) return 'El asunto es obligatorio.'
  if (v.trim().length < 3) return 'Mínimo 3 caracteres.'
  if (v.trim().length > 150) return 'Máximo 150 caracteres.'
  return ''
}
function validarMensaje(v: string) {
  if (!v.trim()) return 'El mensaje es obligatorio.'
  if (v.trim().length < 10) return 'Mínimo 10 caracteres.'
  if (v.trim().length > 2000) return 'Máximo 2000 caracteres.'
  return ''
}

// ---------------------------------------------------------------------------
// Estilos base
// ---------------------------------------------------------------------------
const fieldBase = 'w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:ring-3 focus-visible:ring-ring/20'
const fieldOk   = `${fieldBase} border-input focus-visible:border-ring`
const fieldErr  = `${fieldBase} border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20`
const fieldValid = `${fieldBase} border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20`

function inputClass(touched: boolean, error: string, value: string) {
  if (!touched) return fieldOk
  if (error) return fieldErr
  if (value) return fieldValid
  return fieldOk
}

// ---------------------------------------------------------------------------
// Iconos SVG reutilizables
// ---------------------------------------------------------------------------
function IconCopy({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
    </svg>
  )
}
function IconCheck({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}
function IconMail({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
function IconSearch({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
function IconChevronDown({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Componente de Selector de País con Búsqueda
// ---------------------------------------------------------------------------
function CountrySelect({
  selectedPais,
  onSelect,
}: {
  selectedPais: Pais
  onSelect: (p: Pais) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredPaises = PAISES.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.prefijo.includes(search) ||
    p.codigo.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); setIsOpen(false) }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  return (
    <div className="relative w-36 shrink-0 sm:w-44" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2.5 text-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 cursor-pointer"
      >
        <span className="truncate font-medium text-foreground">
          {selectedPais.prefijo} <span className="text-xs text-muted-foreground">({selectedPais.codigo})</span>
        </span>
        <IconChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-lg border border-border bg-popover p-2 shadow-md animate-in fade-in zoom-in-95 duration-100">
          <div className="relative mb-2">
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar país o prefijo..."
              className="w-full rounded-md border border-input bg-background pl-8 pr-3 py-1.5 text-xs outline-none focus-visible:border-ring"
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {filteredPaises.length > 0 ? (
              filteredPaises.map(p => (
                <button
                  key={p.codigo}
                  type="button"
                  onClick={() => {
                    onSelect(p)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                    p.codigo === selectedPais.codigo ? 'bg-accent/60 font-medium text-accent-foreground' : 'text-popover-foreground'
                  }`}
                >
                  <span className="truncate">{p.nombre}</span>
                  <span className="ml-2 font-mono text-muted-foreground shrink-0">{p.prefijo}</span>
                </button>
              ))
            ) : (
              <p className="px-2 py-3 text-center text-xs text-muted-foreground">No se encontraron resultados</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------
export function ContactForm() {
  const [nombre,   setNombre]   = useState('')
  const [email,    setEmail]    = useState('')
  const [telNum,   setTelNum]   = useState('')
  const [pais,     setPais]     = useState(PAIS_DEFAULT)
  const [servicio, setServicio] = useState('')
  const [asunto,   setAsunto]   = useState('')
  const [mensaje,  setMensaje]  = useState('')

  const [touched, setTouched] = useState({
    nombre: false, email: false, telefono: false,
    servicio: false, asunto: false, mensaje: false,
  })

  const [showTerminosModal, setShowTerminosModal] = useState(false)
  const [haLeidoHastaElFinal, setHaLeidoHastaElFinal] = useState(false)
  const [aceptoTerminos, setAceptoTerminos] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [copiadoDestinatario, setCopiadoDestinatario] = useState(false)
  const [copiadoAsunto,       setCopiadoAsunto]       = useState(false)
  const [copiadoCuerpo,       setCopiadoCuerpo]       = useState(false)
  const [toastMsg,            setToastMsg]            = useState('')
  const [mostrarToast,        setMostrarToast]        = useState(false)
  const [vistaModal,          setVistaModal]          = useState<'opciones' | 'copiar' | 'enviado'>('opciones')

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const toastTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  useScrollLock(showTerminosModal || showModal)

  // Si ya leyó las condiciones hasta el final en esta sesión, no se le obliga a repetirlo
  useEffect(() => {
    try {
      if (sessionStorage.getItem('terminosLeidos') === '1') setHaLeidoHastaElFinal(true)
    } catch { /* almacenamiento no disponible: se ignora */ }
  }, [])

  const marcarTerminosLeidos = () => {
    setHaLeidoHastaElFinal(true)
    try { sessionStorage.setItem('terminosLeidos', '1') } catch { /* ignorar */ }
  }

  // Escape cierra el modal que esté abierto
  useEffect(() => {
    if (!showTerminosModal && !showModal) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (showModal) setShowModal(false)
      else setShowTerminosModal(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showTerminosModal, showModal])

  useEffect(() => () => toastTimers.current.forEach(clearTimeout), [])
  const [contenidoCorreo, setContenidoCorreo] = useState<{
    destinatario: string; asunto: string; cuerpo: string
  } | null>(null)

  const errores = {
    nombre:   validarNombre(nombre),
    email:    validarEmail(email),
    telefono: validarTelefono(telNum, pais),
    servicio: validarServicio(servicio),
    asunto:   validarAsunto(asunto),
    mensaje:  validarMensaje(mensaje),
  }
  const formularioValido =
    !errores.nombre && !errores.email && !errores.telefono &&
    !errores.servicio && !errores.asunto && !errores.mensaje

  const generarContenido = useCallback(() => {
    const ahora = new Date()
    const fechaAceptacion = ahora.toLocaleString('es-ES', {
      timeZone: 'Europe/Madrid', dateStyle: 'long', timeStyle: 'medium',
    })
    const tz = zonaHoraria(ahora)
    const idUnico = generarIdUnico(ahora)

    const telefonoCompleto = telNum.trim()
      ? `${pais.prefijo} ${telNum.trim()}`
      : 'No proporcionado'

    const cuerpo = [
      `Ref: ${idUnico}`,
      `Fecha: ${fechaAceptacion} (${tz})`,
      ``,
      ``,
      `Hola buenas soy ${nombre},`,
      `Te escribo desde tu web de servicios para solicitar información sobre "${servicio}".`,
      ``,
      ``,
      `MENSAJE:`,
      `${mensaje}`,
      ``,
      ``,
      `DATOS DE CONTACTO`,
      `Nombre:    ${nombre}`,
      `Correo:    ${email}`,
      `Teléfono:  ${telefonoCompleto}`,
      `Servicio:  ${servicio}`,
      ``,
      ``,
      `------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`,
      ``,
      `${nombre} declara haber leído y aceptado a día ${fechaAceptacion} (${tz}), expresamente las siguientes condiciones:`,
      ``,
      `1. Gratuidad total: El servicio se presta a título 100% gratuito, sin contraprestación económica.`,
      `2. Autorización de mención: El solicitante autoriza la mención de su nombre o marca en el portafolio de proyectos del prestador (web y perfiles profesionales), como referencia del trabajo realizado.`,
      `3. Limitación de responsabilidad: El prestador queda eximido de responsabilidades por imprevistos técnicos derivados de configuraciones de terceros o entornos inestables.`,
      `4. Protección de datos (RGPD): Los datos facilitados se tratan confidencialmente para gestionar esta consulta y se eliminan una vez resuelta, conforme al Reglamento (UE) 2016/679.`,
      ``,
      `------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`,
    ].join('\n')

    const destinatario = contactEmail
    const asuntoCorreo = `[inicio-github.io] ${nombre} - ${asunto} [${idUnico}]`

    return { destinatario, asunto: asuntoCorreo, cuerpo }
  }, [nombre, email, telNum, pais, servicio, asunto, mensaje])

  const copiar = async (texto: string, toast: string, setter: (v: boolean) => void) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(texto)
      } else {
        const ta = document.createElement('textarea')
        ta.value = texto
        ta.style.position = 'fixed'
        ta.style.left = '-999999px'
        document.body.appendChild(ta)
        ta.focus(); ta.select()
        document.execCommand('copy')
        ta.remove()
      }
      setter(true)
      setToastMsg(toast)
      setMostrarToast(true)
      toastTimers.current.push(
        setTimeout(() => setter(false), 3000),
        setTimeout(() => setMostrarToast(false), 4000),
      )
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched({ nombre: true, email: true, telefono: true, servicio: true, asunto: true, mensaje: true })
    if (!formularioValido || !aceptoTerminos || !correoConfigurado) return
    setContenidoCorreo(generarContenido())
    setVistaModal('opciones')
    setShowModal(true)
  }

  // El contenido (fecha, ID de seguimiento) se vuelve a generar en el momento de enviar o copiar,
  // para que la fecha de aceptación coincida con el instante real de la acción.
  const handleEnviarCorreo = () => {
    const c = generarContenido()
    setContenidoCorreo(c)
    const url = `mailto:${c.destinatario}?subject=${encodeURIComponent(c.asunto)}&body=${encodeURIComponent(c.cuerpo)}`
    const link = document.createElement('a')
    link.href = url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setVistaModal('enviado')
  }

  const abrirCopiar = () => {
    setContenidoCorreo(generarContenido())
    setVistaModal('copiar')
  }

  const resetFormulario = () => {
    setNombre(''); setEmail(''); setTelNum(''); setPais(PAIS_DEFAULT)
    setServicio(''); setAsunto(''); setMensaje('')
    setTouched({ nombre: false, email: false, telefono: false, servicio: false, asunto: false, mensaje: false })
    setAceptoTerminos(false)
    setContenidoCorreo(null)
    setVistaModal('opciones')
    setShowModal(false)
  }

  const handleScrollTerminos = () => {
    const el = scrollContainerRef.current
    if (!el) return
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) marcarTerminosLeidos()
  }

  const touch = (field: keyof typeof touched) => () =>
    setTouched(prev => ({ ...prev, [field]: true }))

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="mb-1.5 block text-xs font-medium text-foreground">
                Nombre completo o Empresa *
              </label>
              <input
                id="nombre" type="text" autoComplete="name"
                value={nombre} onChange={e => setNombre(e.target.value)} onBlur={touch('nombre')}
                placeholder="Tu nombre o el de tu empresa"
                aria-invalid={touched.nombre && !!errores.nombre}
                className={inputClass(touched.nombre, errores.nombre, nombre)}
              />
              {touched.nombre && errores.nombre && (
                <p role="alert" className="mt-1 text-xs text-destructive">{errores.nombre}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-foreground">
                Correo electrónico *
              </label>
              <input
                id="email" type="email" autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)} onBlur={touch('email')}
                placeholder="tu@email.com"
                aria-invalid={touched.email && !!errores.email}
                className={inputClass(touched.email, errores.email, email)}
              />
              {touched.email && errores.email && (
                <p role="alert" className="mt-1 text-xs text-destructive">{errores.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <div className="sm:col-span-2">
              <label htmlFor="telefono" className="mb-1.5 block text-xs font-medium text-foreground">
                Teléfono de contacto{' '}
                <span className="text-muted-foreground/70">(opcional)</span>
              </label>
              <div className="flex gap-2">
                <CountrySelect
                  selectedPais={pais}
                  onSelect={p => {
                    setPais(p)
                    setTouched(prev => ({ ...prev, telefono: false }))
                    setTelNum('')
                  }}
                />

                <div className="flex-1">
                  <input
                    id="telefono" type="tel" autoComplete="tel-national"
                    value={telNum}
                    onChange={e => setTelNum(e.target.value)}
                    onBlur={touch('telefono')}
                    placeholder={pais.placeholder || 'Número de teléfono'}
                    aria-invalid={touched.telefono && !!errores.telefono}
                className={inputClass(touched.telefono, errores.telefono, telNum)}
                  />
                </div>
              </div>
              {touched.telefono && errores.telefono && (
                <p role="alert" className="mt-1 text-xs text-destructive">{errores.telefono}</p>
              )}
              {!errores.telefono && telNum && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Se enviará como: <span className="font-medium">{pais.prefijo} {telNum}</span>
                </p>
              )}
            </div>

            {/* Servicio */}
            <div>
              <label htmlFor="servicio" className="mb-1.5 block text-xs font-medium text-foreground">
                Servicio de interés *
              </label>
              <select
                id="servicio"
                value={servicio}
                onChange={e => setServicio(e.target.value)}
                onBlur={touch('servicio')}
                aria-invalid={touched.servicio && !!errores.servicio}
                className={inputClass(touched.servicio, errores.servicio, servicio)}
              >
                <option value="" disabled>Selecciona una opción</option>
                {serviceOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {touched.servicio && errores.servicio && (
                <p role="alert" className="mt-1 text-xs text-destructive">{errores.servicio}</p>
              )}
            </div>

            {/* Asunto */}
            <div>
              <label htmlFor="asunto" className="mb-1.5 block text-xs font-medium text-foreground">
                Asunto de la consulta *
              </label>
              <input
                id="asunto" type="text"
                value={asunto} onChange={e => setAsunto(e.target.value)} onBlur={touch('asunto')}
                placeholder="Resume brevemente tu solicitud"
                maxLength={150}
                aria-invalid={touched.asunto && !!errores.asunto}
                className={inputClass(touched.asunto, errores.asunto, asunto)}
              />
              <div className="mt-1 flex justify-between">
                {touched.asunto && errores.asunto
                  ? <p role="alert" className="text-xs text-destructive">{errores.asunto}</p>
                  : <span />
                }
                <span className={`text-xs ${asunto.length > 140 ? 'text-destructive' : 'text-muted-foreground/60'}`}>
                  {asunto.length}/150
                </span>
              </div>
            </div>

            {/* Mensaje */}
            <div className="sm:col-span-2">
              <label htmlFor="mensaje" className="mb-1.5 block text-xs font-medium text-foreground">
                Detalle del mensaje *
              </label>
              <textarea
                id="mensaje" rows={5}
                value={mensaje} onChange={e => setMensaje(e.target.value)} onBlur={touch('mensaje')}
                placeholder="Explica detalladamente en qué consiste tu proyecto o consulta técnica..."
                maxLength={2000}
                aria-invalid={touched.mensaje && !!errores.mensaje}
                className={inputClass(touched.mensaje, errores.mensaje, mensaje)}
              />
              <div className="mt-1 flex justify-between">
                {touched.mensaje && errores.mensaje
                  ? <p role="alert" className="text-xs text-destructive">{errores.mensaje}</p>
                  : <span />
                }
                <span className={`text-xs ${mensaje.length > 1900 ? 'text-destructive' : 'text-muted-foreground/60'}`}>
                  {mensaje.length}/2000
                </span>
              </div>
            </div>

            {/* Términos */}
            <div className="sm:col-span-2">
              <div className={`flex items-start gap-3 rounded-lg border p-3.5 transition-colors ${
                aceptoTerminos ? 'border-green-500/40 bg-green-500/5' : 'border-border bg-card/60'
              }`}>
                <input
                  id="terms" type="checkbox" required
                  checked={aceptoTerminos}
                  onClick={e => {
                    if (!haLeidoHastaElFinal) {
                      e.preventDefault()
                      setShowTerminosModal(true)
                    }
                  }}
                  onChange={e => { if (haLeidoHastaElFinal) setAceptoTerminos(e.target.checked) }}
                  className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-primary accent-primary cursor-pointer"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  He leído y acepto las{' '}
                  <button type="button" onClick={() => setShowTerminosModal(true)}
                    className="font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors">
                    Condiciones del Servicio Gratuito y Autorización de Mención
                  </button>.
                </label>
              </div>
            </div>
          </div>

          {/* Botón enviar */}
          <div className="flex items-center justify-between gap-3 pt-1">
            {!correoConfigurado ? (
              <p role="alert" className="text-xs text-destructive">
                El formulario no está disponible: falta configurar el correo de contacto.
              </p>
            ) : !aceptoTerminos && (
              <p className="text-xs text-muted-foreground">
                Acepta las condiciones para continuar.
              </p>
            )}
            <button
              type="submit"
              disabled={!aceptoTerminos || !correoConfigurado}
              className="ml-auto inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
            >
              <IconMail className="h-4 w-4" />
              Preparar mensaje
            </button>
          </div>
        </form>
      </div>

      {/* TOAST */}
      {mostrarToast && (
        <div className="fixed inset-x-0 bottom-5 z-50 mx-auto flex w-fit items-center gap-2 rounded-xl bg-foreground text-background px-4 py-3 text-xs shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          <IconCheck className="h-4 w-4 text-green-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* MODAL TÉRMINOS */}
      {showTerminosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div role="dialog" aria-modal="true" aria-labelledby="modal-terminos-title" className="w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-xl sm:p-7 text-card-foreground flex flex-col max-h-[90dvh]">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 id="modal-terminos-title" className="text-lg font-semibold leading-none">
                Condiciones del Servicio Gratuito y Autorización de Mención
              </h3>
              <button type="button" onClick={() => setShowTerminosModal(false)} aria-label="Cerrar ventana"
                className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-accent cursor-pointer">
                ✕
              </button>
            </div>

            {!haLeidoHastaElFinal && (
              <p className="text-xs text-amber-600 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-md mb-2">
                ⚠️ Desplázate hasta el final para habilitar la confirmación.
              </p>
            )}

            <div ref={scrollContainerRef} onScroll={handleScrollTerminos}
              className="overflow-y-auto space-y-4 text-xs sm:text-sm text-muted-foreground pr-2 my-2 border rounded-lg p-4 bg-background/50 min-h-0 h-[55dvh] max-h-96 select-none leading-relaxed">
              <p className="font-semibold text-foreground text-base">
                Acuerdo de Prestación de Servicios Gratuitos y Autorización de Mención en el Portafolio
              </p>
              <p className="font-semibold text-foreground">1. Gratuidad Total del Servicio</p>
              <p>Todos los trabajos, asistencias, revisiones o colaboraciones técnicas solicitados a través de este sitio web se realizarán a título 100% gratuito. El usuario o empresa no abonará ningún importe económico ni honorario profesional.</p>
              <p className="font-semibold text-foreground">2. Autorización de Mención en el Portafolio de Proyectos</p>
              <p>A cambio de la prestación del servicio a título gratuito, el usuario o empresa autoriza expresamente al titular a mencionar su nombre, marca o logotipo en el portafolio de proyectos de este sitio web y en sus perfiles profesionales, como referencia de los trabajos técnicos realizados.</p>
              <p className="font-semibold text-foreground">3. Inexistencia de Contrato Comercial</p>
              <p>El envío del formulario constituye una solicitud de colaboración y no crea un contrato comercial vinculante ni un compromiso de soporte técnico permanente.</p>
              <p className="font-semibold text-foreground">4. Limitación de Responsabilidad Técnica</p>
              <p>Al tratarse de una prestación de servicios realizada en régimen de colaboración gratuita y de pruebas, el titular queda eximido de responsabilidades derivadas de imprevistos técnicos o incompatibilidades informáticas.</p>
              <p className="font-semibold text-foreground">5. Protección de Datos (RGPD)</p>
              <p>Los datos facilitados serán tratados de forma estrictamente confidencial para la atención de la consulta y la relación técnica derivada, conforme al Reglamento (UE) 2016/679. Se eliminarán una vez resuelta la consulta.</p>
              <div className="pt-6 pb-2 text-center text-xs font-semibold text-primary border-t">
                --- Fin de las Condiciones del Servicio ---
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-primary/30 bg-primary/5 -mx-6 -mb-6 p-6 rounded-b-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className={`flex items-center gap-2.5 text-sm font-medium ${
                haLeidoHastaElFinal ? 'text-foreground cursor-pointer' : 'text-muted-foreground opacity-50 cursor-not-allowed'
              }`}>
                <input type="checkbox" disabled={!haLeidoHastaElFinal}
                  checked={aceptoTerminos}
                  onChange={e => { if (haLeidoHastaElFinal) setAceptoTerminos(e.target.checked) }}
                  className="h-4 w-4 rounded border-input accent-primary cursor-pointer disabled:cursor-not-allowed" />
                Confirmo que he leído y acepto las condiciones
              </label>
              <button type="button" disabled={!haLeidoHastaElFinal || !aceptoTerminos}
                onClick={() => setShowTerminosModal(false)}
                className="w-full sm:w-auto inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none cursor-pointer">
                Aceptar y Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ENVÍO */}
      {showModal && contenidoCorreo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div role="dialog" aria-modal="true" aria-labelledby="modal-envio-title" className="w-full max-w-lg rounded-2xl border bg-card shadow-xl text-card-foreground">

            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <IconMail />
                </div>
                <div>
                  <h3 id="modal-envio-title" className="text-lg font-semibold leading-none">
                    {vistaModal === 'enviado' ? 'Solicitud enviada' : 'Tu mensaje está listo'}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {vistaModal === 'opciones'
                      ? '¿Cómo prefieres enviarlo?'
                      : vistaModal === 'copiar'
                        ? 'Copia cada parte y pégala en tu correo.'
                        : 'Último paso: pulsa «Enviar» en tu correo.'}
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => setShowModal(false)} aria-label="Cerrar ventana"
                className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-accent cursor-pointer">
                ✕
              </button>
            </div>

            <hr className="border-border" />

            {vistaModal === 'opciones' && (
              <div className="p-6 space-y-3">
                <button type="button" onClick={handleEnviarCorreo}
                  className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 cursor-pointer">
                  <IconMail className="h-4 w-4" />
                  Enviar desde mi aplicación de correo
                </button>
                <button type="button" onClick={abrirCopiar}
                  className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent cursor-pointer">
                  <IconCopy className="h-4 w-4 text-muted-foreground" />
                  Copiar el mensaje manualmente
                </button>
              </div>
            )}

            {vistaModal === 'copiar' && (
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Destinatario */}
                <div className="rounded-lg border border-input bg-background overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-input bg-muted/40">
                    <span className="text-xs font-semibold text-muted-foreground tracking-wider">PARA</span>
                    <button type="button"
                      onClick={() => copiar(contenidoCorreo.destinatario, '¡Destinatario copiado!', setCopiadoDestinatario)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors">
                      {copiadoDestinatario
                        ? <><IconCheck className="h-3.5 w-3.5 text-green-500" /> Copiado</>
                        : <><IconCopy className="h-3.5 w-3.5" /> Copiar</>}
                    </button>
                  </div>
                  <p className="px-3 py-2.5 text-sm text-foreground break-all">
                    {contenidoCorreo.destinatario}
                  </p>
                </div>

                {/* Asunto */}
                <div className="rounded-lg border border-input bg-background overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-input bg-muted/40">
                    <span className="text-xs font-semibold text-muted-foreground tracking-wider">ASUNTO</span>
                    <button type="button"
                      onClick={() => copiar(contenidoCorreo.asunto, '¡Asunto copiado!', setCopiadoAsunto)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors">
                      {copiadoAsunto
                        ? <><IconCheck className="h-3.5 w-3.5 text-green-500" /> Copiado</>
                        : <><IconCopy className="h-3.5 w-3.5" /> Copiar</>}
                    </button>
                  </div>
                  <p className="px-3 py-2.5 text-sm text-foreground">
                    {contenidoCorreo.asunto}
                  </p>
                </div>

                {/* Cuerpo */}
                <div className="rounded-lg border border-input bg-background overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-input bg-muted/40">
                    <span className="text-xs font-semibold text-muted-foreground tracking-wider">MENSAJE</span>
                    <button type="button"
                      onClick={() => copiar(contenidoCorreo.cuerpo, '¡Cuerpo del mensaje copiado!', setCopiadoCuerpo)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors">
                      {copiadoCuerpo
                        ? <><IconCheck className="h-3.5 w-3.5 text-green-500" /> Copiado</>
                        : <><IconCopy className="h-3.5 w-3.5" /> Copiar</>}
                    </button>
                  </div>
                  <pre className="px-3 py-2.5 text-xs text-foreground font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {contenidoCorreo.cuerpo}
                  </pre>
                </div>
              </div>
            )}

            {vistaModal === 'enviado' && (
              <div className="p-6 space-y-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Se ha abierto tu aplicación de correo con la solicitud ya redactada. El mensaje
                  <strong className="text-foreground"> no se envía solo</strong>: revisa los datos y
                  pulsa «Enviar» en tu correo. Te responderé en menos de 24 horas.
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Si no se abrió ninguna aplicación, puedes copiar el mensaje y pegarlo en tu correo.
                </p>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <button type="button" onClick={abrirCopiar}
                    className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent cursor-pointer">
                    <IconCopy className="h-4 w-4 text-muted-foreground" />
                    Copiar el mensaje
                  </button>
                  <button type="button" onClick={resetFormulario}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 cursor-pointer">
                    Ya lo he enviado · limpiar formulario
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-6 pt-0">
              {vistaModal === 'copiar' ? (
                <button type="button" onClick={() => setVistaModal('opciones')}
                  className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer">
                  ← Volver a opciones
                </button>
              ) : <span />}
              {vistaModal === 'copiar' && (
                <button type="button" onClick={resetFormulario}
                  className="ml-auto mr-2 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90 cursor-pointer">
                  Ya lo he enviado
                </button>
              )}
              <button type="button" onClick={() => setShowModal(false)}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-4 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent cursor-pointer">
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}
