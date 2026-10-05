import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site-config'

export const dynamic = 'force-static'

// Nota: los buscadores solo leen /robots.txt en la RAÍZ del dominio. Con el repositorio
// llamado <usuario>.github.io el archivo queda en la raíz y es válido; con un repositorio
// de proyecto (/inicio/) queda en una subcarpeta y se ignora.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
