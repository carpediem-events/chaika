import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { events } from '../content'
import { Frame } from './Frame'
import { useBooking } from './Booking'
import './events.css'

gsap.registerPlugin(ScrollTrigger)

export function Events() {
  const root = useRef<HTMLElement>(null)
  const { open } = useBooking()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // лёгкий параллакс внутри рамки: картинка живёт медленнее карточки
      gsap.utils.toArray<HTMLElement>('.ev__media .frame').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -9, scale: 1.14 },
          {
            yPercent: 9,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="ev" id="events" ref={root}>
      <div className="shell">
        <p className="kicker" data-reveal="0">Что вас ждёт</p>
        <h2 className="display ev__h" data-reveal="0.08">
          Два вечера{'\n'}
          <span className="serif-em">подряд</span>
        </h2>
      </div>

      {events.map((e, i) => (
        <article className={`ev__item ${i % 2 ? 'ev__item--flip' : ''}`} key={e.id}>
          <div className="shell ev__grid">
            <div className="ev__media" data-reveal="0">
              <Frame media={e.media} />
              <span className="ev__badge">{e.date}</span>
            </div>

            <div className="ev__body">
              <p className="ev__lead" data-reveal="0.05">
                {e.lead} <i>·</i> {e.weekday}
              </p>

              <h3 className="display ev__title" data-reveal="0.1">{e.title}</h3>

              <p className="ev__text" data-reveal="0.15">{e.body}</p>

              <dl className="ev__meta" data-reveal="0.2">
                {e.meta.map((m) => (
                  <div key={m.label}>
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>

              <button
                className="btn btn--primary ev__cta"
                data-reveal="0.25"
                onClick={() => open(e.prefill)}
              >
                {e.cta}
                <span className="btn__arrow">→</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
