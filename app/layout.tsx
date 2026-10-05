import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { basePath, siteUrl } from '@/lib/site-config'
import servicios from '@/data/servicios'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Redwan Alexandru Teodor | Técnico en Sistemas y Redes en Sevilla',
  description:
    'Soporte informático, mantenimiento de equipos, consultoría TI, copias de seguridad y recuperación de datos en Sevilla.',
  applicationName: 'Redwan Alexandru Teodor - Servicios IT',
  authors: [{ name: 'Redwan Alexandru Teodor' }],
  keywords: ['soporte informático Sevilla', 'técnico en sistemas y redes', 'mantenimiento de equipos', 'consultoría TI', 'copias de seguridad', 'recuperación de datos', 'redes locales', 'Sevilla'],
  alternates: { canonical: `${siteUrl}/`, languages: { es: `${siteUrl}/` } },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  metadataBase: new URL(`${siteUrl}/`),
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: 'image/svg+xml' },
    ],
    apple: `${basePath}/icon.svg`,
  },
  openGraph: {
    title: 'Redwan Alexandru Teodor | Técnico en Sistemas y Redes en Sevilla',
    description:
      'Soporte informático, mantenimiento de equipos, consultoría TI, copias de seguridad y recuperación de datos en Sevilla.',
    url: `${siteUrl}/`,
    siteName: 'Redwan Alexandru Teodor - Servicios IT',
    images: [
      {
        url: `${siteUrl}/og_image.png`,
        width: 1200,
        height: 630,
        alt: 'Redwan Alexandru Teodor - Técnico en Sistemas y Redes',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redwan Alexandru Teodor | Técnico en Sistemas y Redes en Sevilla',
    description:
      'Soporte informático, mantenimiento de equipos, consultoría TI, copias de seguridad y recuperación de datos en Sevilla.',
    images: [`${siteUrl}/og_image.png`],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#131b26', // = --ink (oklch(0.22 0.025 255)) en hexadecimal
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#persona`,
      name: 'Redwan Alexandru Teodor',
      jobTitle: 'Técnico en Sistemas y Redes',
      url: `${siteUrl}/`,
      image: `${siteUrl}/images/perfil.jpg`,
      address: { '@type': 'PostalAddress', addressLocality: 'Sevilla', addressCountry: 'ES' },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#servicio`,
      name: 'Redwan Alexandru Teodor - Servicios IT',
      description:
        'Soporte informático, mantenimiento de equipos, consultoría TI, copias de seguridad y recuperación de datos en Sevilla.',
      url: `${siteUrl}/`,
      image: `${siteUrl}/og_image.png`,
      areaServed: { '@type': 'City', name: 'Sevilla' },
      priceRange: 'Gratuito',
      inLanguage: 'es',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios informáticos',
        itemListElement: servicios.map(servicio => ({
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'EUR',
          itemOffered: {
            '@type': 'Service',
            name: servicio.label,
            description: servicio.description,
            areaServed: 'Sevilla',
            provider: { '@id': `${siteUrl}/#servicio` },
          },
        })),
      },
      address: { '@type': 'PostalAddress', addressLocality: 'Sevilla', addressCountry: 'ES' },
      founder: { '@id': `${siteUrl}/#persona` },
      knowsLanguage: 'es',
    },
  ],
}

// JSON-LD serializado de forma segura: se escapa "<" para que ningún valor pueda cerrar la etiqueta <script>
const jsonLdSeguro = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdSeguro }}
        />
        {children}
      </body>
    </html>
  )
}
