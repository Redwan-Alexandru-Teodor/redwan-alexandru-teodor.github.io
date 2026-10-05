import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site-config'
import proyectos from '@/data/proyectos'

export const dynamic = 'force-static'

// Se genera en el build con la URL real (con o sin /inicio), así que no hay que editarlo
// si cambias el nombre del repositorio. Solo se lista la página; las anclas (#servicios…)
// no son URLs distintas para Google.
export default function sitemap(): MetadataRoute.Sitemap {
  const imagenes = proyectos.flatMap(p => [p.portada, ...p.galeria]).map(ruta => `${siteUrl}${ruta}`)

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${siteUrl}/images/perfil.jpg`, ...imagenes],
      alternates: { languages: { es: `${siteUrl}/` } },
    },
  ]
}
