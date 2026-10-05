const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // En GitHub Pages el basePath lo aporta el workflow (/<nombre-del-repo>),
  // así que sigue funcionando aunque cambies el nombre del repositorio.
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  // Los errores de TypeScript hacen fallar el build (y por tanto el despliegue).
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
