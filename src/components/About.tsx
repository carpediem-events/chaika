import { about } from '../content'
import './about.css'

export function About() {
  return (
    <section className="about shell" id="about">
      <p className="kicker" data-reveal="0">{about.kicker}</p>

      <h2 className="display about__title" data-reveal="0.08">
        {about.title}
      </h2>

      <div className="about__cols">
        {about.body.map((p, i) => (
          <p className="about__p" key={i} data-reveal={0.14 + i * 0.08}>
            {p}
          </p>
        ))}
      </div>

      <ul className="about__stats">
        {about.stats.map((s, i) => (
          <li key={s.label} data-reveal={0.1 + i * 0.09}>
            <span className="about__stat-value">{s.value}</span>
            <span className="about__stat-label">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
