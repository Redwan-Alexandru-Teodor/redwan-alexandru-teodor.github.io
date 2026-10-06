# Redwan Alexandru Teodor · IT Portfolio y Servicios

Sitio web personal y profesional de **Redwan Alexandru Teodor**, técnico en sistemas y redes con base en Sevilla. Presenta su perfil, su portafolio de proyectos y los servicios técnicos que ofrece en régimen de colaboración.

- **Sitio en producción:** https://redwan-alexandru-teodor.github.io/
- **Repositorio:** https://github.com/Redwan-Alexandru-Teodor/redwan-alexandru-teodor.github.io

## Características

- Diseño responsive con Tailwind CSS 4 y colores en OKLCH.
- Modo claro y oscuro, con la preferencia guardada en el navegador.
- Presentación de servicios técnicos con matriz interactiva.
- Portafolio de proyectos con visor de imágenes y descripciones en Markdown.
- Formulario de contacto que abre el cliente de correo del visitante (`mailto:`). El sitio no recibe ni guarda los datos.
- Validación por campo e identificador único de registro en cada solicitud.
- Aviso legal, política de privacidad (RGPD / LSSI-CE) y documentación en PDF desde el pie de página.
- SEO: Open Graph, Twitter Card, JSON-LD, `robots.txt` y `sitemap.xml` generados en el build.
- Accesibilidad: modales con roles ARIA, cierre con `Escape`, bloqueo de scroll de fondo y respeto a «reducir movimiento».
- Correo de contacto fuera del código: se inyecta desde una variable de GitHub Actions.

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | 24 (LTS) | Entorno de compilación |
| pnpm | 12.3.4 (`packageManager`) | Gestor de paquetes |
| Next.js | 16.3.3 | Framework (App Router) con exportación estática |
| React | 19 | Interfaz de componentes |
| TypeScript | 5.7.3 | Tipado; los errores detienen el build |
| Tailwind CSS | 4.3.3 | Estilos |
| shadcn/ui · Base UI | ^4.11.0 · ^1.5.0 | Primitivas de interfaz |
| Lucide React | ^1.16.0 | Iconos SVG |
| GitHub Pages · Actions | — | Hosting y CI/CD desde `main` |

## Estructura del proyecto

```
app/                            Rutas, layout raíz, metadatos, sitemap, robots y 404
components/                     Secciones, cabecera, pie y modales (ui/ con primitivas)
data/                           Servicios (servicios.ts) y proyectos (proyectos/<slug>/)
lib/                            Configuración del sitio, correo, tema y utilidades
public/                         Activos estáticos: imágenes, PDF e iconos
.github/workflows/deploy.yml    Build y publicación en GitHub Pages
```

## Requisitos

- Node.js 24 LTS
- pnpm (la versión de `packageManager` se usa con Corepack)
- Git

## Instalación en local

```bash
git clone https://github.com/Redwan-Alexandru-Teodor/redwan-alexandru-teodor.github.io.git
cd redwan-alexandru-teodor.github.io
corepack enable
pnpm install
```

Opcional: para probar el botón de correo en local, crea un archivo `.env.local` en la raíz del proyecto (Git lo ignora):

```bash
NEXT_PUBLIC_CONTACT_EMAIL=tu@correo.com
```

## Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo en http://localhost:3000 |
| `pnpm build` | Genera el sitio estático en `out/` |

Para previsualizar la versión estática:

```bash
pnpm build
python3 -m http.server 8000 --directory out
```

Después abre http://localhost:8000. `next start` no es compatible con la exportación estática (`output: 'export'`), así que no se usa para previsualizar.

## Variables de GitHub Actions

Se configuran en **Settings → Secrets and variables → Actions**, a nivel de repositorio.

| Nombre | Obligatoria | Descripción |
|---|---|---|
| `CONTACT_EMAIL` | Sí, para el formulario | Destinatario de los correos. Si falta, los botones de correo se desactivan. También se acepta `NEXT_PUBLIC_CONTACT_EMAIL`. |
| `GOOGLE_SITE_VERIFICATION` | No | Valor de `content` de la etiqueta HTML de Google Search Console. |

Tras crear o cambiar una variable, vuelve a desplegar.

## Despliegue en GitHub Pages

1. Configura las variables de la sección anterior.
2. Sube los cambios a la rama `main`.
3. Para lanzar el despliegue manualmente: **Actions → Deploy to GitHub Pages → Run workflow**.

## Google Search Console

1. Añade una propiedad de tipo **Prefijo de URL** con la dirección `https://redwan-alexandru-teodor.github.io/`.
2. Verifica la propiedad con la etiqueta HTML y guarda el valor en `GOOGLE_SITE_VERIFICATION`.
3. Tras el despliegue, pulsa **Verificar** y envía `sitemap.xml` en el apartado **Sitemaps**.

## Editar el contenido

| Qué | Dónde |
|---|---|
| Servicios | `data/servicios.ts` |
| Proyectos | `data/proyectos/<slug>/` e imágenes en `public/proyectos/<slug>/` |
| Foto de perfil | `public/images/perfil.jpg` |
| Documentación en PDF | `public/docs/Documentacion.pdf` |
| Disponibilidad | `disponible` en `lib/site-config.ts` |
| Aviso legal | `components/site-footer.tsx` |

## Autor

**Redwan Alexandru Teodor** · Técnico en Sistemas y Redes · Sevilla, España
LinkedIn: https://www.linkedin.com/in/redwan-alexandru-teodor/

## Licencia

© 2026 Redwan Alexandru Teodor. Todos los derechos reservados.

El código se publica como referencia de mi trabajo. Para reutilizarlo, adaptarlo o usarlo en otro proyecto, contacta conmigo antes.
