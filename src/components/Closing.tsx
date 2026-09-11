import { useEffect, useState } from 'react'
import { closing, contacts, pricing, priceDeadline } from '../content'
import { Burst } from './Burst'
import { useBooking } from './Booking'
import './closing.css'

function daysLeft() {
  return Math.max(0, Math.ceil((priceDeadline.getTime() - Date.now()) / 86400000))
}

function plural(n: number) {
  const t = n % 10
  if (n > 4 && n < 21) return 'дней'
  if (t === 1) return 'день'
  if (t > 1 && t < 5) return 'дня'
  return 'дней'
}

export function Closing() {
  const [left, setLeft] = useState(daysLeft)

  useEffect(() => {
    const id = setInterval(() => setLeft(daysLeft()), 60_000)
    return () => clearInterval(id)
  }, [])

  const { open } = useBooking()

  const links = [
    { label: 'Telegram', href: `https://t.me/${contacts.telegram.user}` },
    { label: 'Instagram', href: `https://instagram.com/${contacts.instagram.user}` },
    ...(contacts.tiktok.user
      ? [{ label: 'TikTok', href: `https://tiktok.com/@${contacts.tiktok.user}` }]
      : []),
  ]

  return (
    <>
      <section className="close" id="closing">
        <Burst className="close__burst" size={1000} />

        <div className="shell close__inner">
          <p className="close__price" data-reveal="0">
            <b>{pricing.early}</b>
            <s>{pricing.regular}</s>
            {left > 0 && <i>ещё {left} {plural(left)}</i>}
          </p>

          <p className="close__what" data-reveal="0.03">{pricing.what}</p>

          <h2 className="display close__h" data-reveal="0.06">{closing.title}</h2>
          <p className="close__body" data-reveal="0.1">{closing.body}</p>

          <button className="btn close__cta" data-reveal="0.14" onClick={() => open()}>
            {closing.cta}
          </button>

          <p className="close__note" data-reveal="0.18">
            Мастер-класс · осталось {pricing.seatsLeft} из {pricing.seatsTotal} мест
          </p>
        </div>
      </section>

      <footer className="foot">
        <div className="shell foot__inner">
          <span className="mark foot__mark">
            <span className="mark__name">CARPE DIEM</span>
            <span className="mark__sub">event agency</span>
          </span>

          <nav className="foot__links">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  )
}
