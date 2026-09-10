import { useEffect, useState } from 'react'
import { priceDeadline, pricing } from '../content'
import './urgency.css'

function diff(to: Date) {
  const ms = Math.max(0, to.getTime() - Date.now())
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
    over: ms === 0,
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export function Urgency() {
  const [t, setT] = useState(() => diff(priceDeadline))

  useEffect(() => {
    const id = setInterval(() => setT(diff(priceDeadline)), 1000)
    return () => clearInterval(id)
  }, [])

  const sold = pricing.seatsTotal - pricing.seatsLeft
  const pct = Math.round((sold / pricing.seatsTotal) * 100)

  return (
    <section className="urg">
      <div className="urg__marquee" aria-hidden>
        <div className="urg__track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>
              26 · 27 сентября <i>✦</i> Carpe Diem <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="shell urg__grid">
        <div className="urg__block" data-reveal="0">
          <p className="urg__label">
            {t.over ? 'Цена по раннему тарифу закончилась' : `Цена ${pricing.early} действует ещё`}
          </p>

          {!t.over && (
            <div className="urg__clock">
              {([['дн', t.d], ['ч', t.h], ['мин', t.m], ['сек', t.s]] as const).map(([u, v]) => (
                <div className="urg__unit" key={u}>
                  <span className="urg__num">{pad(v)}</span>
                  <span className="urg__u">{u}</span>
                </div>
              ))}
            </div>
          )}

          <p className="urg__price">
            <b>{pricing.early}</b>
            <i>→</i>
            <s>{pricing.regular}</s>
            <em>дальше</em>
          </p>
        </div>

        <div className="urg__block urg__block--seats" data-reveal="0.12">
          <p className="urg__label">Мест осталось</p>
          <p className="urg__seats">
            {pricing.seatsLeft}
            <span>/{pricing.seatsTotal}</span>
          </p>
          <div className="urg__bar">
            <span style={{ width: `${pct}%` }} />
          </div>
          <p className="urg__note">{sold} мест уже забронировано</p>
        </div>
      </div>
    </section>
  )
}
