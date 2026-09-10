import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Проявление элементов с [data-reveal] при входе в экран.
 * data-reveal="0.15" — задержка в секундах.
 */
export function useReveal() {
  useEffect(() => {
    if (import.meta.env.DEV && new URLSearchParams(location.search).has('static')) {
      document.documentElement.classList.add('is-static')
      return
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          delay: parseFloat(el.dataset.reveal || '0'),
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })
    return () => ctx.revert()
  }, [])
}
