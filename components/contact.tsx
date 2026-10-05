import { Clock, MapPin, MessageSquare } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

const details = [
  { icon: MapPin, title: 'Zona de servicio', value: 'Presencial en Sevilla y alrededores · asistencia remota desde cualquier lugar' },
  { icon: Clock, title: 'Tiempo de respuesta', value: 'En menos de 24 horas laborables' },
  { icon: MessageSquare, title: 'Modalidad', value: 'Presencial o asistencia remota' },
]

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contact-title" className="border-y bg-secondary/60 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contacto</p>
          <h2
            id="contact-title"
            className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Solicita tu propuesta
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Cuéntame qué necesitas y te enviaré una propuesta personalizada sin compromiso.
          </p>
          <ul className="mt-8 space-y-5">
            {details.map(({ icon: Icon, title, value }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{title}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="mb-5 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-foreground">
            <strong>Sin coste y sin compromiso.</strong> Es una colaboración: resuelvo tu caso y, con
            tu autorización, lo menciono en mi portafolio. Podrás leer las condiciones completas
            antes de enviar.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
