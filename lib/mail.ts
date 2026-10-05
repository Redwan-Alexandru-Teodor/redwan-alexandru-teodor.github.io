import { contactEmail } from '@/lib/site-config'

const pad = (n: number, l = 2) => String(n).padStart(l, '0')

/** "UTC+2", "UTC-0330"… según la zona horaria del navegador. */
export function zonaHoraria(fecha: Date): string {
  const offset = -fecha.getTimezoneOffset()
  const signo = offset >= 0 ? '+' : '-'
  const abs = Math.abs(offset)
  const horas = pad(Math.floor(abs / 60))
  const minutos = pad(abs % 60)
  return `UTC${signo}${horas}${minutos !== '00' ? minutos : ''}`
}

/** Identificador único de seguimiento: ID-YYYYMMDD-HHMMSS-MSHEX-TZ */
export function generarIdUnico(fecha: Date = new Date()): string {
  const hex = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0')
  return (
    `ID-${fecha.getFullYear()}${pad(fecha.getMonth() + 1)}${pad(fecha.getDate())}` +
    `-${pad(fecha.getHours())}${pad(fecha.getMinutes())}${pad(fecha.getSeconds())}` +
    `-${pad(fecha.getMilliseconds(), 3)}${hex}-${zonaHoraria(fecha)}`
  )
}

/** true si el build recibió el correo de contacto. */
export const correoConfigurado = contactEmail.length > 0

/** URL mailto: mínima (solo asunto) para los botones "Enviar correo". */
export function generarMailtoUrl(origen: string): string {
  const asunto = encodeURIComponent(`Contacto desde ${origen} [${generarIdUnico()}]`)
  return `mailto:${contactEmail}?subject=${asunto}`
}
