import { useState } from 'react'
import { program } from '../content'
import { Burst } from './Burst'
import './program.css'

/** Программа мастер-класса: одна строка на пункт, описание раскрывается по клику. */
export function Program() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="prog" id="program">
      <Burst className="prog__burst" size={820} />

      <div className="shell prog__inner">
        <header className="prog__head">
          <div>
            <p className="kicker" data-reveal="0">{program.kicker}</p>
            <h2 className="display prog__h" data-reveal="0.06">{program.title}</h2>
          </div>
          <p className="prog__hint" data-reveal="0.1">{program.hint}</p>
        </header>

        <ul className="prog__list">
          {program.items.map((it, i) => {
            const expandable = Boolean(it.body)
            const isOpen = expandable && openIdx === i

            return (
              <li className={`prog__row ${isOpen ? 'is-open' : ''}`} key={it.time + it.title}>
                <button
                  className="prog__btn"
                  onClick={() => expandable && setOpenIdx(isOpen ? null : i)}
                  aria-expanded={expandable ? isOpen : undefined}
                  disabled={!expandable}
                >
                  <span className="prog__time">{it.time}</span>
                  <span className="prog__title">{it.title}</span>
                  {expandable && <span className="prog__sign" aria-hidden />}
                </button>

                {expandable && (
                  <div className="prog__wrap">
                    <p className="prog__body">{it.body}</p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
