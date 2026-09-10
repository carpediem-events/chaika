import { hosts, forWhom } from '../content'
import { Frame } from './Frame'
import { Doodle } from './Doodle'
import './hosts.css'

/** Кто ведёт мастер-класс. */
export function Hosts() {
  return (
      <section className="hosts" id="hosts">
        <div className="shell hosts__grid">
          <div className="hosts__media" data-reveal="0">
            <Frame media={hosts.media} />
          </div>

          <div className="hosts__body">
            <p className="kicker" data-reveal="0.05">{hosts.kicker}</p>
            <h2 className="display hosts__names" data-reveal="0.1">{hosts.names}</h2>
            <p className="hosts__role" data-reveal="0.14">{hosts.role}</p>

            <ul className="hosts__facts">
              {hosts.facts.map((f, i) => (
                <li key={f} data-reveal={0.18 + i * 0.05}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
  )
}

/** Кому этот мастер-класс подойдёт. */
export function ForWhom() {
  return (
      <section className="who" id="who">
        <div className="shell">
          <p className="kicker" data-reveal="0">{forWhom.kicker}</p>

          <h2 className="display who__h" data-reveal="0.06">
            {forWhom.title}
            <Doodle kind="underline" className="who__doodle" color="var(--green)" width={220} delay={0.4} />
          </h2>

          <ul className="who__list">
            {forWhom.items.map((it, i) => (
              <li key={it} data-reveal={0.1 + i * 0.05}>{it}</li>
            ))}
          </ul>
        </div>
      </section>
  )
}
