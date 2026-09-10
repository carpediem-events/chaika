import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { hero, brand, pricing } from '../content'
import { Frame } from './Frame'
import { useBooking } from './Booking'
import './hero.css'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const { open } = useBooking()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // вход: заголовок собирается по строкам, медиа «выдыхает» из зума
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero__media', { scale: 1.18, opacity: 0, duration: 1.8 })
        .from('.hero__line span', { yPercent: 118, duration: 1.2, stagger: 0.09 }, 0.35)
        .from('.hero__kicker, .hero__sub, .hero__actions, .hero__scroll', {
          opacity: 0,
          y: 22,
          duration: 0.9,
          stagger: 0.1,
        }, 0.85)

      // параллакс: фон уезжает медленнее текста
      gsap.to('.hero__media', {
        yPercent: 22,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.hero__inner', {
        yPercent: -14,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={root}>
      <div className="hero__media">
        <Frame media={hero.media} />
      </div>
      <div className="hero__veil" />

      <header className="hero__bar shell">
        <span className="hero__brand">{brand.name}</span>
        <button className="hero__bar-cta" onClick={() => open()}>
          Забронировать
        </button>
      </header>

      <div className="hero__inner shell">
        <p className="kicker hero__kicker">{hero.kicker}</p>

        <h1 className="display hero__title">
          {hero.title.split('\n').map((line, i) => (
            <span className="hero__line" key={i}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero__sub">{hero.subtitle}</p>

        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => open()}>
            {hero.cta}
            <span className="btn__arrow">→</span>
          </button>
          <span className="hero__seats">
            <b>{pricing.seatsLeft}</b> из {pricing.seatsTotal} мест свободно
          </span>
        </div>
      </div>

      <div className="hero__scroll">
        <span>{hero.scrollHint}</span>
        <i />
      </div>
    </section>
  )
}
