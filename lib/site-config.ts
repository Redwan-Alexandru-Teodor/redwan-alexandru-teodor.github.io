// ─────────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN CENTRAL DEL SITIO
//  Todo lo que cambia según el despliegue o los datos personales vive aquí.
// ─────────────────────────────────────────────────────────────────────────────

/** Prefijo de ruta. Lo inyecta el workflow (vacío si el repo se llama <usuario>.github.io). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** Antepone el basePath a una ruta de /public. */
export const asset = (path: string) => `${basePath}${path}`

/** Dominio donde se publica el sitio (sin basePath). */
export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://redwan-alexandru-teodor.github.io'

/** URL base completa del sitio, sin barra final. */
export const siteUrl = `${siteOrigin}${basePath}`

/**
 * Correo de contacto. NO está en el código: se define como variable de
 * repositorio `CONTACT_EMAIL` en GitHub (Settings → Secrets and variables →
 * Actions → Variables) y el workflow la pasa al build.
 * En local: crea `.env.local` con NEXT_PUBLIC_CONTACT_EMAIL=tu@correo.com
 */
export const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim()

/** Muestra u oculta el distintivo "Disponible para nuevos proyectos" del Hero. */
export const disponible = true
