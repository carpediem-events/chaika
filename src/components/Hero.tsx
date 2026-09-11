import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isStatic } from '../lib/env'
import { hero, pricing } from '../content'
import { Burst } from './Burst'
import { Doodle } from './Doodle'
import { useBooking } from './Booking'
import './hero.css'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const { open } = useBooking()

  useEffect(() => {
    if (isStatic) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero__burst', { scale: 0.72, opacity: 0, rotate: -25, duration: 2, ease: 'power2.out' })
        .from('.hero__mark, .hero__meta', { opacity: 0, y: 14, duration: 0.9, stagger: 0.08 }, 0.2)
        .from('.hero__line span', { yPercent: 110, duration: 1.15, stagger: 0.08 }, 0.35)
        .from('.hero__sub, .hero__act', { opacity: 0, y: 18, duration: 0.9, stagger: 0.1 }, 0.9)

      // параллакс: вспышка живёт своей жизнью, текст уходит чуть быстрее
      gsap.to('.hero__burst', {
        yPercent: 26,
        rotate: 34,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__inner', {
        yPercent: -9,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={root}>
      <Burst className="hero__burst" size={1500} />

      <div className="hero__inner shell">
        <span className="mark hero__mark">
          <span className="mark__name">CARPE DIEM</span>
          <span className="mark__sub">event agency</span>
        </span>

        <p className="hero__meta">
          {hero.city} <i>·</i> {hero.dates}
        </p>

        <h1 className="display hero__title">
          {hero.title.split('\n').map((line, i) => (
            <span className="hero__line" key={i}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero__sub">{hero.subtitle}</p>

        <div className="hero__act">
          <Doodle kind="arrow-down" className="hero__doodle" width={76} color="var(--ink-soft)" delay={1.5} />
          <button className="btn" onClick={() => open()}>{hero.cta}</button>
          <span className="hero__seats">
            мастер-класс <i>·</i> осталось {pricing.seatsLeft} из {pricing.seatsTotal}
          </span>
        </div>
      </div>
    </section>
  )
}
