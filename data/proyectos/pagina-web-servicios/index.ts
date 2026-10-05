import type { ProyectoData } from '../types'

const proyecto: ProyectoData = {
  id: 'pagina-web-servicios',
  titulo: 'Portafolio de Servicios IT',
  subtitulo: 'Web profesional de servicios IT, redes y sistemas en Sevilla.',

  portada: '/proyectos/pagina-web-servicios/Portada.png',

  // Fotos extra (se muestran después de la portada, en este orden).
  // Los archivos deben estar en public/proyectos/pagina-web-servicios/
  galeria: [
    '/proyectos/pagina-web-servicios/Imagen-1.png', // Sobre mí
    '/proyectos/pagina-web-servicios/Imagen-2.png', // Servicios
    '/proyectos/pagina-web-servicios/Imagen-3.png', // Proyectos
    '/proyectos/pagina-web-servicios/Imagen-4.png', // Contacto
  ],

  // Cada "## Título" se muestra como una pestaña en el pop-up.
  readme: `
## Resumen
Este repositorio contiene el código fuente de mi **portfolio profesional y sitio web de servicios IT**. Ha sido diseñado bajo un enfoque minimalista pero de alta gama, priorizando la experiencia de usuario (UX), el rendimiento extremo, la seguridad frente a bots de rastreo y un marco de colaboración transparente adaptado a proyectos de portafolio.

## Características
- **UI/UX moderna y limpia** — diseñado con **Tailwind CSS**, tipografías cuidadas y transiciones fluidas.
- **Formulario de colaboración 100% gratuito** — solicitudes de soporte técnico y proyectos sin ánimo de lucro a cambio de la autorización de mención en el portafolio de proyectos.
- **Aviso legal y transparencia RGPD** — modal interactivo accesible desde el pie de página que detalla el cumplimiento normativo (RGPD y LSSI-CE).
- **ID de registro único e irrepetible** — generado en el momento del envío (\`ID-YYYYMMDD-HHMMSS-MSHEX-TZ\`) para dotar de trazabilidad formal a cada consulta directamente en el correo.
- **Correo fuera del código** — la dirección de contacto no está escrita en el repositorio: se inyecta en el build mediante una variable de GitHub Actions.
- **Respaldo de copiado al portapapeles** — lanza el gestor de correo predeterminado (\`mailto:\`) o copia la solicitud completa con su acuerdo legal si no hay cliente de correo configurado.
- **Totalmente responsive** — adaptación fluida a móviles, tablets y escritorio.

## Modelo de servicio
El sitio opera bajo un enfoque de **servicios técnicos gratuitos y colaborativos para construcción de portafolio**, estructurado legalmente mediante:
1. **Exención de responsabilidad técnica** y exclusión de relaciones contractuales comerciales previas.
2. **Autorización de mención** del nombre o marca del solicitante en el portafolio de proyectos, como referencia del trabajo realizado.
3. **Adjunto de aceptación firmado** con marca temporal y hash único en cada cabecera de correo (\`Nombre - Asunto - ID\`).

## Stack
| Categoría | Tecnologías / Herramientas |
| --- | --- |
| Framework | Next.js, React |
| Estilos y UI | Tailwind CSS, Lucide Icons |
| Lenguaje | TypeScript |
| Control de versiones | Git, GitHub |
| Despliegue | GitHub Pages, GitHub Actions |
| Runtime de compilación | Node.js 24, pnpm |

## Datos personales
El repositorio es público, así que ningún dato de contacto se escribe en el código. La dirección de correo se define como variable del repositorio y se inyecta al compilar:
\`\`\`tsx
// lib/site-config.ts
export const contactEmail = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim()
\`\`\`
Al ser una web estática, el valor final sí queda en el sitio publicado (el navegador necesita la dirección para abrir el correo), pero no en el código fuente del repositorio.
`.trim(),

  github: 'https://github.com/Redwan-Alexandru-Teodor/inicio',
  tecnologias: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub Pages', 'GitHub Actions'],
}

export default proyecto