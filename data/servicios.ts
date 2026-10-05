// ─────────────────────────────────────────────────────────────────────────────
//  DATOS DE SERVICIOS Y TECNOLOGÍAS
//  Fuente única: la usan <Services />, el Hero (contador) y el JSON-LD (SEO).
//  El icono de cada servicio se asigna por `id` en components/services.tsx.
// ─────────────────────────────────────────────────────────────────────────────

export interface Servicio {
  id: string
  label: string
  description: string
  /** Duración orientativa; depende siempre del caso concreto. */
  tiempo: string
}

const servicios: Servicio[] = [
  {
    id: 'mantenimiento',
    label: 'Mantenimiento Informático',
    description:
      'Puesta a punto y optimización de sistemas operativos (Windows y Linux), depuración de software, actualización de controladores y resolución de fallos para un funcionamiento fluido.',
    tiempo: '1–3 horas',
  },
  {
    id: 'seguridad',
    label: 'Seguridad y Protección',
    description:
      'Instalación de soluciones antimalware, configuración de cortafuegos básicos, gestión de permisos de usuario y aplicación de buenas prácticas contra amenazas habituales.',
    tiempo: '1–2 horas',
  },
  {
    id: 'virtualizacion',
    label: 'Virtualización y Servidores',
    description:
      'Despliegue y administración básica de servidores (Windows y Linux), recursos compartidos en red y gestión de máquinas virtuales.',
    tiempo: '1–3 días',
  },
  {
    id: 'copias',
    label: 'Copias de Seguridad',
    description:
      'Implantación de respaldos periódicos y automatizados en discos externos, unidades NAS o almacenamiento en la nube para garantizar la integridad de la información.',
    tiempo: '2–4 horas',
  },
  {
    id: 'recuperacion',
    label: 'Recuperación de Datos',
    description:
      'Diagnóstico y rescate de archivos eliminados por error o inaccesibles en unidades HDD, SSD o memorias USB mediante herramientas especializadas a nivel de software.',
    tiempo: 'De 1 hora a 2 días',
  },
  {
    id: 'redes',
    label: 'Infraestructura de Redes',
    description:
      'Confección de cableado estructurado (RJ45), instalación de switches y routers, y configuración de redes locales (Wi-Fi, direcciones IP, DHCP y DNS) estables.',
    tiempo: '2 horas – 1 jornada',
  },
  {
    id: 'hardware',
    label: 'Optimización de Hardware',
    description:
      'Diagnóstico de componentes, sustitución de discos rígidos por SSD, ampliación de RAM, cambio de pasta térmica, limpieza interna y montaje de equipos a medida.',
    tiempo: '1–2 horas',
  },
  {
    id: 'soporte',
    label: 'Soporte Técnico y Remoto',
    description:
      'Asistencia in situ o remota en tiempo real (AnyDesk/TeamViewer) para resolver incidencias cotidianas, configuración de periféricos, correo y atención al usuario.',
    tiempo: '30 min – 2 horas',
  },
]

export default servicios

/** Entornos y herramientas, tomados del CV (formación, prácticas y experiencia en empresa). */
export const tecnologias: { area: string; items: string[] }[] = [
  { area: 'Sistemas y servidores', items: ['Windows', 'Linux', 'Servidores Windows y Linux', 'Virtualización', 'Docker', 'Portainer'] },
  { area: 'Redes', items: ['Redes LAN cableadas e inalámbricas', 'Cableado', 'Conexión a internet', 'Acceso remoto'] },
  { area: 'Hardware y soporte', items: ['Montaje y diagnóstico de equipos', 'Mantenimiento preventivo y correctivo', 'Periféricos', 'Inventario de recursos'] },
  { area: 'Software de gestión', items: ['Factusol', 'Facturaplus Flex', 'Sage 50', 'Migración de ERP', 'Amazon Seller Central', 'Microsoft Office'] },
  { area: 'Desarrollo web', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GitHub Pages', 'LaTeX'] },
]
