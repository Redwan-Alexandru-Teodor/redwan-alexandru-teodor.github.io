# Redwan Alexandru Teodor · IT Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/GitHub_Pages-121013?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages">
</p>

<p align="center">
  <strong>Portfolio web personal y profesional</strong><br>
  Técnico en sistemas y redes · Proyectos · Servicios IT
</p>

<p align="center">
  <a href="https://redwan-alexandru-teodor.github.io/">🌐 Ver portfolio</a>
  ·
  <a href="https://github.com/Redwan-Alexandru-Teodor/redwan-alexandru-teodor.github.io">💻 Repositorio</a>
  ·
  <a href="https://www.linkedin.com/in/redwan-alexandru-teodor/">LinkedIn</a>
</p>

---

## 📌 Sobre el proyecto

Este repositorio contiene el sitio web personal y profesional de **Redwan Alexandru Teodor**, técnico en sistemas y redes.

El portfolio reúne:

- 👤 Perfil profesional
- 💼 Servicios técnicos
- 🚀 Proyectos realizados
- 📩 Formulario de contacto
- 📄 Documentación legal
- 🔎 Optimización SEO
- ♿ Características de accesibilidad

El sitio está desarrollado con **Next.js, React, TypeScript y Tailwind CSS** y se publica mediante **GitHub Pages** utilizando GitHub Actions.

---

## ✨ Características

### 🎨 Interfaz

- Diseño responsive.
- Tailwind CSS 4 con colores OKLCH.
- Modo claro y oscuro.
- Preferencia de tema almacenada en el navegador.
- Componentes y modales interactivos.
- Soporte para preferencias de reducción de movimiento.

### 💼 Portfolio y servicios

- Presentación de servicios técnicos mediante matriz interactiva.
- Portfolio de proyectos.
- Visor de imágenes.
- Descripciones de proyectos mediante Markdown.
- Organización de proyectos por slug.

### 📩 Contacto

- Formulario de contacto mediante `mailto:`.
- Los datos no son recibidos ni almacenados por el sitio.
- Validación por campo.
- Identificador único de registro para cada solicitud.
- Correo configurable mediante variables de entorno/GitHub Actions.

### 🔎 SEO

Incluye:

- Open Graph.
- Twitter Cards.
- JSON-LD.
- `robots.txt`.
- `sitemap.xml`.
- Integración con Google Search Console.

### ♿ Accesibilidad

- Roles ARIA en modales.
- Cierre mediante `Escape`.
- Bloqueo del scroll del contenido de fondo.
- Respeto de la preferencia `prefers-reduced-motion`.

### 🔐 Privacidad y documentación

- Aviso legal.
- Política de privacidad.
- Documentación relacionada con RGPD / LSSI-CE.
- Documentación disponible en PDF.

---

## 🧰 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---:|---|
| **Node.js** | 24 LTS | Entorno de compilación |
| **pnpm** | 12.3.4 | Gestión de paquetes |
| **Next.js** | 16.3.3 | Framework · App Router · Static Export |
| **React** | 19 | Interfaz de usuario |
| **TypeScript** | 5.7.3 | Tipado estático |
| **Tailwind CSS** | 4.3.3 | Estilos |
| **shadcn/ui** | ^4.11.0 | Componentes UI |
| **Base UI** | ^1.5.0 | Primitivas de interfaz |
| **Lucide React** | ^1.16.0 | Iconografía |
| **GitHub Pages** | — | Hosting |
| **GitHub Actions** | — | CI/CD |

> TypeScript está configurado para que los errores de compilación detengan el proceso de build.

---

## 📁 Arquitectura del proyecto

```text
.
├── app/
│   ├── rutas
│   ├── layout raíz
│   ├── metadatos
│   ├── sitemap
│   ├── robots
│   └── 404
│
├── components/
│   ├── secciones
│   ├── cabecera
│   ├── pie
│   ├── modales
│   └── ui/
│
├── data/
│   ├── servicios.ts
│   └── proyectos/
│
├── lib/
│   ├── configuración del sitio
│   ├── correo
│   ├── tema
│   └── utilidades
│
├── public/
│   ├── imágenes
│   ├── proyectos
│   ├── documentos PDF
│   └── iconos
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## ⚙️ Requisitos

Antes de comenzar necesitas:

- **Node.js 24 LTS**
- **pnpm 12.3.4**
- **Git**

La versión de pnpm está definida mediante `packageManager` y puede utilizarse con Corepack.

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Redwan-Alexandru-Teodor/redwan-alexandru-teodor.github.io.git
cd redwan-alexandru-teodor.github.io
```

### 2. Activar Corepack

```bash
corepack enable
```

### 3. Instalar dependencias

```bash
pnpm install
```

### 4. Iniciar el entorno de desarrollo

```bash
pnpm dev
```

El proyecto estará disponible en:

```text
http://localhost:3000
```

---

## 📧 Configuración del correo local

Para probar el botón de contacto durante el desarrollo puedes crear:

```text
.env.local
```

En la raíz del proyecto:

```env
NEXT_PUBLIC_CONTACT_EMAIL=tu@correo.com
```

El archivo `.env.local` está excluido de Git.

---

## 📜 Scripts disponibles

| Comando | Función |
|---|---|
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Genera la versión estática del sitio |

Para generar y previsualizar la versión estática:

```bash
pnpm build
python3 -m http.server 8000 --directory out
```

Después abre:

```text
http://localhost:8000
```

> `next start` no se utiliza porque el proyecto está configurado con `output: 'export'`.

---

## 🔑 Variables de GitHub Actions

Las variables se configuran desde:

**GitHub → Settings → Secrets and variables → Actions**

| Variable | Obligatoria | Descripción |
|---|:---:|---|
| `CONTACT_EMAIL` | ✅ | Destinatario del formulario de contacto |
| `GOOGLE_SITE_VERIFICATION` | ❌ | Valor `content` proporcionado por Google Search Console |

También se admite:

```text
NEXT_PUBLIC_CONTACT_EMAIL
```

Si `CONTACT_EMAIL` no está configurada, los botones de correo se desactivan.

Después de modificar una variable es necesario volver a desplegar el proyecto.

---

## 🌐 Despliegue

El proyecto se publica mediante **GitHub Pages + GitHub Actions**.

### Despliegue automático

Los cambios enviados a:

```text
main
```

pueden activar el workflow de despliegue.

### Despliegue manual

Desde GitHub:

```text
Actions
└── Deploy to GitHub Pages
    └── Run workflow
```

Workflow:

```text
.github/workflows/deploy.yml
```

---

## 🔎 Google Search Console

Para configurar Google Search Console:

### 1. Crear una propiedad

Utiliza el tipo:

```text
Prefijo de URL
```

Con:

```text
https://redwan-alexandru-teodor.github.io/
```

### 2. Configurar la verificación

Guarda el valor `content` de la etiqueta HTML proporcionada por Google en:

```text
GOOGLE_SITE_VERIFICATION
```

### 3. Verificar el sitio

Después del despliegue:

**Google Search Console → Verificar**

### 4. Añadir el sitemap

En la sección **Sitemaps**, utiliza:

```text
sitemap.xml
```

---

## ✏️ Editar el contenido

| Contenido | Archivo / ubicación |
|---|---|
| 🛠️ Servicios | `data/servicios.ts` |
| 🚀 Proyectos | `data/proyectos/<slug>/` |
| 🖼️ Imágenes de proyectos | `public/proyectos/<slug>/` |
| 👤 Foto de perfil | `public/images/perfil.jpg` |
| 📄 Documentación PDF | `public/docs/Documentacion.pdf` |
| 🟢 Disponibilidad | `disponible` en `lib/site-config.ts` |
| ⚖️ Aviso legal | `components/site-footer.tsx` |

---

## 🔗 Enlaces

**Portfolio**

https://redwan-alexandru-teodor.github.io/

**Repositorio**

https://github.com/Redwan-Alexandru-Teodor/redwan-alexandru-teodor.github.io

**LinkedIn**

https://www.linkedin.com/in/redwan-alexandru-teodor/

---

## 👤 Autor

**Redwan Alexandru Teodor**

*Técnico en Sistemas y Redes · Sevilla, España*

---

## 📄 Licencia

© 2026 Redwan Alexandru Teodor. Todos los derechos reservados.

El código se publica como referencia de mi trabajo.

Para reutilizarlo, adaptarlo o utilizarlo en otro proyecto, contacta conmigo previamente.

---

<p align="center">
  <strong>Desarrollado por Redwan Alexandru Teodor</strong><br>
  <sub>Portfolio personal · Sistemas · Redes · Desarrollo web</sub>
</p>
