import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isStatic } from '../lib/env'
import { days, venue } from '../content'
import { Frame } from './Frame'
import { Promo } from './Promo'
import { useBooking } from './Booking'
import './days.css'

gsap.registerPlugin(ScrollTrigger)

/** Два дня: 26.09 и 27.09. Крупная дата, одна фраза, одна кнопка. */
export function Days() {
  const root = useRef<HTMLElement>(null)
  const { open } = useBooking()

  useEffect(() => {
    if (isStatic) return

    const ctx = gsap.context(() => {
      // афишу не двигаем: она вписана целиком, параллакс её бы «косил»
      gsap.utils.toArray<HTMLElement>('.day__media:not(.day__media--flat) .frame').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="days" id="days" ref={root}>
      {days.map((d, i) => (
        <article className={`day ${i % 2 ? 'day--flip' : ''}`} key={d.id}>
          <div className="shell day__grid">
            <div
              className={`day__media ${d.media.fit === 'contain' ? 'day__media--flat' : ''}`}
              data-reveal="0"
            >
              <Frame media={d.media} />
            </div>

            <div className="day__body">
              <p className="display day__date" data-reveal="0.05">{d.date}</p>

              <p className="kicker day__kicker" data-reveal="0.1">
                {d.kicker} <i>·</i> {d.weekday}
              </p>

              <h2 className="display day__title" data-reveal="0.14">«{d.title}»</h2>

              <p className="day__lead" data-reveal="0.18">{d.lead}</p>

              <p className="day__meta" data-reveal="0.22">
                <a className="day__place" href={venue.map} target="_blank" rel="noopener noreferrer">
                  {venue.name}
                </a>
                <i>·</i> {venue.city} <i>·</i> {d.time}
              </p>

              {d.credits && (
                <p className="day__credits" data-reveal="0.24">{d.credits}</p>
              )}

              {d.external ? (
                <div className="day__ext" data-reveal="0.26">
                  <Promo code={d.external.promo.code} note={d.external.promo.note} />
                  <div className="day__ext-row">
                    {d.external.links.map((l, n) =>
                      l.href ? (
                        <a
                          key={l.label}
                          className={`btn ${n ? 'btn--quiet' : ''}`}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <span key={l.label} className="btn btn--todo">
                          {l.label} — ссылка не получена
                        </span>
                      ),
                    )}
                  </div>
                </div>
              ) : (
                <button className="btn day__cta" data-reveal="0.26" onClick={() => open(d.prefill)}>
                  Забронировать
                  <span className="btn__arrow">→</span>
                </button>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
