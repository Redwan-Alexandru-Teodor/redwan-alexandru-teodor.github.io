import { CalendarCheck, Check, Handshake, Send, type LucideIcon } from 'lucide-react'

const pasos: { icon: LucideIcon; titulo: string; texto: string }[] = [
  {
    icon: Send,
    titulo: '1. Cuéntame qué necesitas',
    texto:
      'Rellenas el formulario y se abre tu aplicación de correo con la solicitud ya redactada. Solo tienes que pulsar «Enviar».',
  },
  {
    icon: CalendarCheck,
    titulo: '2. Te respondo con una propuesta',
    texto:
      'En menos de 24 horas recibes una propuesta sin compromiso y acordamos si es presencial o por asistencia remota.',
  },
  {
    icon: Handshake,
    titulo: '3. Lo resuelvo y lo documento',
    texto:
      'Hago el trabajo sin coste. A cambio, con tu autorización, el caso puede mencionarse en mi portafolio como referencia.',
  },
]

export function Process() {
  return (
    <section id="proceso" aria-labelledby="process-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Cómo funciona</p>
          <h2 id="process-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Del primer mensaje a la solución
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Servicio 100% gratuito en régimen de colaboración. Así es el proceso, paso a paso.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {pasos.map(({ icon: Icon, titulo, texto }) => (
            <li key={titulo} className="rounded-xl border bg-card p-6 shadow-sm">
              <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold">{titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{texto}</p>
            </li>
          ))}
        </ol>

        {/* Por qué es gratis: explicado como un intercambio, no como una oferta barata */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-transparent bg-ink p-6 text-ink-foreground dark:border-primary/60 sm:p-8">
          <h3 className="text-xl font-semibold tracking-tight">¿Por qué es gratis?</h3>
          <p className="mt-3 text-pretty leading-relaxed text-ink-foreground/80">
            Estoy construyendo mi portafolio profesional. Tú consigues resolver tu problema técnico
            sin pagar nada; yo consigo un caso real que enseñar. Es un intercambio claro entre los
            dos, sin letra pequeña.
          </p>
          <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
            {['Sin pagos ni facturas', 'Sin permanencia ni contrato comercial', 'Condiciones claras antes de enviar'].map(t => (
              <li key={t} className="flex items-center gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
