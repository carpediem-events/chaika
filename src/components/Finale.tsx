import { finale, contacts, brand, pricing } from '../content'
import { useBooking } from './Booking'
import './finale.css'

export function Finale() {
  const { open } = useBooking()

  const links = [
    { label: 'Telegram', href: `https://t.me/${contacts.telegram.user}` },
    { label: 'Instagram', href: `https://instagram.com/${contacts.instagram.user}` },
    { label: 'TikTok', href: `https://tiktok.com/@${contacts.tiktok.user}` },
  ]

  return (
    <>
      <section className="fin" id="finale">
        <div className="fin__glow" aria-hidden />
        <div className="shell fin__inner">
          <p className="kicker" data-reveal="0">{finale.kicker}</p>

          <h2 className="display fin__h" data-reveal="0.08">{finale.title}</h2>

          <p className="fin__text" data-reveal="0.14">{finale.body}</p>

          <button className="btn btn--primary fin__cta" data-reveal="0.2" onClick={() => open()}>
            {finale.cta}
            <span className="btn__arrow">→</span>
          </button>

          <p className="fin__price" data-reveal="0.26">
            {pricing.early} до 13 сентября · дальше {pricing.regular}
          </p>
        </div>
      </section>

      <footer className="foot">
        <div className="shell foot__inner">
          <span className="foot__brand">{brand.name}</span>

          <nav className="foot__links">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </nav>

          <span className="foot__note">© {new Date().getFullYear()} · {brand.tagline}</span>
        </div>
      </footer>
    </>
  )
}
