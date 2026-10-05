// ─────────────────────────────────────────────────────────────────────────────
//  ÍNDICE DE PROYECTOS
//
//  Para añadir un proyecto nuevo:
//    1. Crea una carpeta  data/proyectos/<slug>/
//    2. Añade un index.ts con los datos (copia cualquiera de los existentes)
//    3. Importa y añade aquí abajo en el array
//
//  ⚠️  Las fotos NO van en data/ — Next.js solo sirve archivos estáticos
//      desde public/. Pon las imágenes de cada proyecto en:
//      public/proyectos/<slug>/Portada.png
//      public/proyectos/<slug>/Imagen-1.png  ...etc
//      La carpeta <slug> debe coincidir con el id del proyecto.
//
//  El ORDEN del array es el orden en que aparecen en la web.
// ─────────────────────────────────────────────────────────────────────────────

import paginaWebServicios from './pagina-web-servicios'

const proyectos = [
  paginaWebServicios,
]

export default proyectos
