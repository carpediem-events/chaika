import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gallery } from '../content'
import { Frame } from './Frame'
import './gallery.css'

gsap.registerPlugin(ScrollTrigger)

export function Gallery() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Десктоп: секция «прилипает», лента едет вбок — быстрый просмотр прошлых встреч.
      mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current!
        const distance = () => Math.max(0, el.scrollWidth - window.innerWidth + 80)

        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.4}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
      })

      // Мобилка: обычный свайп со snap — pin на тачах ведёт себя капризно.
      mm.add('(max-width: 900px)', () => {
        gsap.from('.gal__card', {
          opacity: 0,
          y: 30,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="gal" id="gallery" ref={root}>
      <div className="gal__inner">
        <header className="gal__head shell">
          <div>
            <p className="kicker">{gallery.kicker}</p>
            <h2 className="display gal__h">{gallery.title}</h2>
          </div>
          <p className="gal__note">
            {gallery.note} <i>→</i>
          </p>
        </header>

        <ul className="gal__track" ref={track}>
          {gallery.items.map((item, i) => (
            <li className="gal__card" key={item.title}>
              <div className="gal__media">
                <Frame media={item.media} />
              </div>
              <div className="gal__cap">
                <span className="gal__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="gal__card-title">{item.title}</h3>
                  <p className="gal__card-text">{item.caption}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
