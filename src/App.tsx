import type { ReactNode } from 'react'
import { useViewportLock } from './hooks/useViewportLock'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useReveal } from './hooks/useReveal'
import { isStatic } from './lib/env'
import { BookingProvider } from './components/Booking'
import { Hero } from './components/Hero'
import { Band } from './components/Band'
import { Days } from './components/Days'
import { Program } from './components/Program'
import { Hosts, ForWhom } from './components/Hosts'
import { Gallery } from './components/Gallery'
import { Closing } from './components/Closing'
import { StickyCta } from './components/StickyCta'

const SECTIONS: [string, ReactNode][] = [
  ['hero', <Hero key="hero" />],
  ['band', <Band key="band" />],
  ['days', <Days key="days" />],
  ['program', <Program key="program" />],
  ['hosts', <Hosts key="hosts" />],
  ['who', <ForWhom key="who" />],
  ['gallery', <Gallery key="gallery" />],
  ['closing', <Closing key="closing" />],
]

export default function App() {
  useViewportLock()
  useSmoothScroll()
  useReveal()

  // dev: ?static&only=days — отрисовать одну секцию, удобно для скриншотов
  const only = isStatic ? new URLSearchParams(location.search).get('only') : null
  const sections = only ? SECTIONS.filter(([id]) => id === only) : SECTIONS

  return (
    <BookingProvider>
      <main>{sections.map(([, node]) => node)}</main>
      <StickyCta />
    </BookingProvider>
  )
}
