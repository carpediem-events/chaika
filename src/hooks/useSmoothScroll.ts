import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Инерционный скролл, синхронизированный с ScrollTrigger. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // ?static — режим для снятия скриншотов: без инерции и без анимаций проявления
    if (import.meta.env.DEV && new URLSearchParams(location.search).has('static')) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)

    // удобно дёргать из консоли при отладке скролл-анимаций
    if (import.meta.env.DEV) {
      const w = window as unknown as { lenis?: Lenis; __tick?: () => void }
      w.lenis = lenis
      // фоновая вкладка не получает rAF — этим можно прокрутить кадр вручную
      w.__tick = () => {
        lenis.raf(performance.now())
        gsap.ticker.tick()
      }
    }

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
