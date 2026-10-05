import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { Process } from '@/components/process'
import { Proyectos } from '@/components/proyectos'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { Reveal } from '@/components/reveal'
import { BackToTop } from '@/components/back-to-top'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Reveal><About /></Reveal>
        <Reveal><Services /></Reveal>
        <Reveal><Process /></Reveal>
        <Reveal><Proyectos /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}
