import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useReveal } from './hooks/useReveal'
import { BookingProvider } from './components/Booking'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Urgency } from './components/Urgency'
import { Events } from './components/Events'
import { Gallery } from './components/Gallery'
import { Finale } from './components/Finale'
import { StickyCta } from './components/StickyCta'

export default function App() {
  useSmoothScroll()
  useReveal()

  return (
    <BookingProvider>
      <div className="grain" aria-hidden />
      <main>
        <Hero />
        <About />
        <Urgency />
        <Events />
        <Gallery />
        <Finale />
      </main>
      <StickyCta />
    </BookingProvider>
  )
}
