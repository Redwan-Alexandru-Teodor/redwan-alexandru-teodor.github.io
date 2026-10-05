<div align="center">

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages" />
</p>

<h1 align="center">Redwan Alexandru Teodor · IT Portfolio &amp; Services</h1>

<p align="center">
  <i>Web profesional de servicios técnicos de IT, redes y sistemas, ofrecidos en régimen de colaboración para construir portafolio.</i>
</p>

<p align="center">
  <a href="#-qué-es">Qué es</a> •
  <a href="#-características-principales">Características</a> •
  <a href="#-formulario-de-contacto">Formulario</a> •
  <a href="#-modelo-de-servicio-y-marco-legal">Marco legal</a> •
  <a href="#-stack-tecnológico">Stack</a> •
  <a href="#-estructura-del-proyecto">Estructura</a>
</p>

</div>

---

## 🚀 Qué es

Es el sitio web personal y profesional de **Redwan Alexandru Teodor**, técnico en sistemas y redes con base en Sevilla. Sirve como portfolio, como presentación de los servicios que ofrece y como punto de contacto para solicitudes de soporte técnico.

El diseño es minimalista, con foco en la experiencia de usuario, el rendimiento y la protección frente a bots de rastreo. El sitio se genera como página estática, sin servidor propio, y se publica en GitHub Pages.

---

## 🌐 Demo

- **Sitio en producción:** [redwan-alexandru-teodor.github.io](https://redwan-alexandru-teodor.github.io/)
- **Repositorio:** [github.com/Redwan-Alexandru-Teodor/inicio](https://github.com/Redwan-Alexandru-Teodor/redwan-alexandru-teodor.github.io)

---

## ✨ Características principales

* 🎨 **Diseño moderno:** interfaz construida con Tailwind CSS v4, colores en OKLCH y transiciones suaves.
* 🧩 **Componentes accesibles:** primitivos basados en shadcn/ui y Radix UI.
* 🛠️ **Servicios técnicos:** presentación de los servicios de mantenimiento, redes y sistemas, con una matriz interactiva.
* 📁 **Portfolio de proyectos:** galería de proyectos con visor de imágenes, carrusel táctil y descripciones en Markdown renderizado sin dependencias externas.
* 📧 **Contacto sin API de terceros:** el formulario abre el cliente de correo del propio visitante (`mailto:`) con la solicitud ya preparada. El sitio no recibe ni guarda esos datos.
* ✅ **Validación por campo:** nombre, email, servicio, asunto y mensaje se comprueban antes de preparar el correo, con mensajes de error junto a cada campo.
* 📋 **Copiado al portapapeles:** si el visitante no tiene cliente de correo configurado, puede copiar la solicitud completa con el acuerdo legal adjunto.
* 🔢 **ID de registro único:** cada solicitud lleva un identificador generado en el momento del envío (`ID-YYYYMMDD-HHMMSS-MSHEX-TZ`) para dar trazabilidad al correo recibido.
* 📜 **Aviso legal y privacidad (RGPD / LSSI-CE):** modal con el texto legal completo y scroll interno, accesible desde el pie de página.
* 📄 **Documentación en PDF:** visor integrado en un modal, con enlace directo para abrir o descargar el documento.
* ⌨️ **Modales cómodos:** se cierran con la tecla `Escape`, haciendo clic fuera del cuadro o con el botón de cerrar. Mientras un modal está abierto, el scroll de la página queda bloqueado.
* ♿ **Accesibilidad:** `role="dialog"`, `aria-modal`, `aria-labelledby` y etiquetas en los botones de icono.
* 🛡️ **Correo fuera del código:** la dirección de contacto no está escrita en el repositorio; se inyecta en el build desde una variable de GitHub Actions.
* 🧭 **Navegación viva:** el menú resalta la sección visible; en móvil el botón de contacto está siempre a la vista.
* 🌗 **Modo oscuro/claro:** toggle en el header que guarda la preferencia en `localStorage` y la aplica sin parpadeo al cargar.
* 🔗 **LinkedIn en el header:** acceso directo al perfil profesional desde la barra de navegación, tanto en escritorio como en móvil.
* ✨ **Animaciones de entrada** que respetan «reducir movimiento» y botón de volver arriba.
* 🔍 **SEO:** metadatos Open Graph y Twitter Card, JSON-LD (Schema.org con servicios y precio «Gratuito»), `robots.txt` y `sitemap.xml` generados en el build con la URL real.
* 📱 **Responsive:** adaptado a móviles, tablets y escritorio.

---

## 📧 Formulario de contacto

El formulario no envía datos a ningún servidor. El flujo es el siguiente:

1. El visitante rellena el formulario y se validan los campos.
2. Acepta las condiciones (hay que leerlas hasta el final; se recuerda durante la sesión).
3. Al pulsar «Preparar mensaje» se abre un modal con dos opciones. En el momento de elegir, se genera el ID de registro y la fecha de aceptación, para que coincidan con el instante real del envío.
4. **Enviar desde mi aplicación de correo** abre el cliente de correo (`mailto:`) con asunto y cuerpo rellenos. **Copiar el mensaje** deja cada parte lista para pegar.
5. Una pantalla final recuerda que el correo no se envía solo y permite limpiar el formulario.

Como el envío sale desde el correo del propio visitante, el sitio no necesita ninguna clave, endpoint ni servicio externo para el formulario.

---

## ⚖️ Modelo de servicio y marco legal

El sitio opera bajo un enfoque de **servicios técnicos gratuitos y colaborativos para la construcción de portafolio**, estructurado mediante:

1. **Exención de responsabilidad técnica** y ausencia de relaciones contractuales comerciales previas.
2. **Autorización de mención** del nombre o marca del solicitante en el portafolio, como referencia del trabajo realizado.
3. **Adjunto de aceptación** con marca temporal e identificador único en cada solicitud.

El texto completo de estas condiciones, junto con el aviso legal, la política de privacidad y la política de cookies, está en el modal **«Aviso Legal, Privacidad y RGPD»** del pie de página. Su contenido está escrito en `components/site-footer.tsx`.

---

## 🧰 Índice de tecnologías

| Tecnología | Versión | Para qué se usa | Dónde |
| :--- | :--- | :--- | :--- |
| **Node.js** | 24 (LTS) | Entorno de compilación | `deploy.yml` |
| **pnpm** | según `packageManager` | Gestor de paquetes | `package.json`, `pnpm-lock.yaml` |
| **Next.js** | 16 (App Router, Turbopack) | Framework; exportación estática (`output: 'export'`) | `next.config.mjs`, `app/` |
| **React** | 19 | Interfaz y estado de los componentes | `components/` |
| **TypeScript** | 5.7 | Tipado; los errores hacen fallar el build | `tsconfig.json` |
| **Tailwind CSS** | 4 | Estilos con tokens de color en OKLCH | `app/globals.css` |
| **shadcn/ui · Base UI** | 4 / 1.5 | Primitivos de interfaz (botón) | `components/ui/` |
| **Lucide** | 1.x | Iconos SVG | `components/*` |
| **tw-animate-css** | 1.4 | Animaciones de entrada de modales | `app/globals.css` |
| **clsx · tailwind-merge · cva** | — | Composición de clases | `lib/utils.ts`, `components/ui/button.tsx` |
| **Schema.org (JSON-LD)** | — | Datos estructurados para buscadores | `app/layout.tsx` |
| **GitHub Pages · Actions** | — | Hosting y CI/CD desde la rama `main` | `.github/workflows/deploy.yml` |

---

## 📁 Estructura del proyecto

```text
./
├── .github/workflows/deploy.yml   # Build + publicación. Inyecta BASE_PATH y CONTACT_EMAIL
├── app/
│   ├── layout.tsx                 # Layout raíz: fuente, metadatos, JSON-LD
│   ├── page.tsx                   # Ensambla las secciones (con animación de entrada)
│   ├── sitemap.ts · robots.ts     # sitemap.xml y robots.txt generados en el build
│   ├── globals.css                # Tokens de color y estilos globales
│   └── not-found.tsx              # Página 404
├── components/
│   ├── site-header.tsx            # Menú sticky, sección activa, CTA móvil, LinkedIn y toggle dark/light
│   ├── hero.tsx                   # Presentación, disponibilidad y ventajas
│   ├── about.tsx · services.tsx   # Sobre mí · servicios + índice de tecnologías
│   ├── process.tsx                # «Cómo funciona» en 3 pasos
│   ├── proyectos.tsx              # Galería, visor con zoom y renderizador Markdown
│   ├── contact.tsx · contact-form.tsx  # Sección de contacto y formulario
│   ├── mail-modal.tsx             # Confirmación del botón «Enviar correo»
│   ├── site-footer.tsx            # Pie, aviso legal y visor del PDF
│   ├── reveal.tsx · back-to-top.tsx    # Animación de entrada · volver arriba
│   └── ui/                        # Primitivos reutilizables
├── data/
│   ├── servicios.ts               # Servicios y entornos de trabajo (fuente única)
│   └── proyectos/                 # Un directorio por proyecto
├── lib/
│   ├── site-config.ts             # basePath, siteUrl, correo de contacto, disponibilidad
│   ├── mail.ts                    # ID único y URL mailto:
│   ├── paises.ts                  # Prefijos internacionales y validación telefónica
│   ├── use-scroll-lock.ts         # Bloqueo de scroll compartido por todos los modales
│   ├── use-active-section.ts      # Sección visible (resalta el menú)
│   └── utils.ts                   # cn()
└── public/                        # Activos estáticos servidos tal cual
    ├── .nojekyll · icon.svg · og_image.png
    ├── images/                    # Foto de perfil (perfil.jpg)
    ├── docs/                      # Documentación del proyecto (Documentacion.pdf)
    └── proyectos/<slug>/          # Imágenes de cada proyecto
```

### Flujo de datos

```text
deploy.yml ──(NEXT_PUBLIC_BASE_PATH, NEXT_PUBLIC_CONTACT_EMAIL)──▶ lib/site-config.ts
site-config ──▶ layout.tsx · sitemap.ts · robots.ts · todos los asset()
data/servicios.ts ──▶ services.tsx · layout.tsx (JSON-LD)
data/proyectos ──▶ proyectos.tsx · sitemap.ts (imágenes)
lib/mail.ts ──▶ mail-modal.tsx · contact-form.tsx
lib/use-scroll-lock.ts ──▶ mail-modal · contact-form · site-footer · proyectos
```

Los activos binarios (imágenes, PDF) se guardan siempre en `public/`, porque la exportación estática solo copia esa carpeta al sitio final.

---

## 📄 Contenido legal y documentación

El pie de página tiene dos opciones en **Información legal**:

| Opción | Cómo se muestra | Origen del contenido |
| :--- | :--- | :--- |
| **Aviso Legal, Privacidad y RGPD** | Texto dentro de un modal con scroll interno | `components/site-footer.tsx` |
| **Documentación del proyecto (PDF)** | Visor PDF dentro de un modal, con enlace para abrir o descargar | `public/Documentacion.pdf` |

En iPhone, Safari no muestra PDFs de forma fiable dentro de un `iframe`, por eso el modal incluye siempre el enlace **«Abrir o descargar PDF completo»**.

---

## ⚙️ Configuración y datos personales

El repositorio es **público**, así que no hay datos de contacto escritos en el código.

| Qué | Dónde se define |
| :--- | :--- |
| Correo de contacto | Variable de repositorio **`CONTACT_EMAIL`** (GitHub → Settings → Secrets and variables → Actions → *Variables*). El workflow la pasa como `NEXT_PUBLIC_CONTACT_EMAIL`. |
| Correo en local | Archivo `.env.local` con `NEXT_PUBLIC_CONTACT_EMAIL=tu@correo.com` (ya ignorado por Git). |
| Ubicación | Solo «Sevilla». |
| Disponibilidad | `disponible` en `lib/site-config.ts`. |

---

## ♿ Accesibilidad

* Los modales usan `role="dialog"` y `aria-modal="true"`, con un título asociado mediante `aria-labelledby`.
* Se cierran con la tecla `Escape`, con el botón de cerrar o haciendo clic fuera del cuadro.
* El scroll de la página de fondo se bloquea mientras hay un modal abierto y se restaura al cerrarlo.
* Los iconos decorativos llevan `aria-hidden="true"`. Los botones que solo tienen icono llevan `aria-label`.
* Los errores de validación se anuncian a lectores de pantalla (`role="alert"`, `aria-invalid`).
* El menú marca la sección actual con `aria-current`.
* Las animaciones se desactivan con «reducir movimiento».

---

## 👤 Autor

**Redwan Alexandru Teodor**
Técnico en Sistemas y Redes · Sevilla, España

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/redwan-alexandru-teodor/)

---

## 📜 Licencia

© 2026 Redwan Alexandru Teodor. Todos los derechos reservados.

El código se publica como referencia de mi trabajo. Para reutilizarlo, adaptarlo o usarlo en otro proyecto, contacta conmigo antes.
