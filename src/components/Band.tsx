import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isStatic } from '../lib/env'
import { band } from '../content'
import { Frame } from './Frame'
import './band.css'

gsap.registerPlugin(ScrollTrigger)

/** Полоса во всю ширину: одна фраза и живое видео команды. */
export function Band() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (isStatic) return

    const ctx = gsap.context(() => {
      // кадр раскрывается снизу вверх и медленно едет — тот самый параллакс
      gsap.from('.band__clip', {
        clipPath: 'inset(18% 12% 18% 12% round 4px)',
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'top 25%', scrub: true },
      })
      gsap.fromTo(
        '.band__clip .frame',
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="band" id="band" ref={root}>
      <div className="band__head">
        <p className="display band__line" data-reveal="0">{band.line}</p>
        <p className="band__body" data-reveal="0.08">{band.body}</p>
      </div>
      <div className="band__clip">
        <Frame media={band.media} />
      </div>
    </section>
  )
}
