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

/**
 * Código de verificación de Google Search Console (etiqueta HTML).
 * Variable de repositorio `GOOGLE_SITE_VERIFICATION`: solo el valor de content="...".
 * Vacío = no se añade la etiqueta.
 */
export const googleVerification = (() => {
  const bruto = (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '').trim()
  // Admite el código solo, la etiqueta <meta> completa o "google-site-verification=<código>"
  const dentroDeMeta = bruto.match(/content\s*=\s*["']([^"']+)["']/i)
  const codigo = dentroDeMeta ? dentroDeMeta[1] : bruto.replace(/^google-site-verification=/i, '')
  return /^[\w-]+$/.test(codigo) ? codigo : ''
})()

/**
 * Código de GoatCounter (estadísticas sin cookies). Es el nombre de tu panel:
 * si tu panel es https://redwan.goatcounter.com, el código es `redwan`.
 * Variable de repositorio `GOATCOUNTER_CODE`. Vacío = no se carga ningún script.
 */
export const goatCounterCode = (process.env.NEXT_PUBLIC_GOATCOUNTER_CODE || '').trim()
