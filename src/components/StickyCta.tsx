import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pricing } from '../content'
import { useBooking } from './Booking'
import './sticky.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Липкая кнопка брони. По ТЗ Розы: появляется, когда человек доходит
 * до блока прошлых мероприятий, и держится до конца страницы.
 * Прячется только на финальном экране — там уже есть большая кнопка.
 */
export function StickyCta() {
  const [shown, setShown] = useState(false)
  const { open } = useBooking()

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#gallery',
        start: 'top 70%',
        onEnter: () => setShown(true),
        onLeaveBack: () => setShown(false),
      })
      ScrollTrigger.create({
        trigger: '#finale',
        start: 'top 65%',
        onEnter: () => setShown(false),
        onLeaveBack: () => setShown(true),
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className={`sticky ${shown ? 'is-on' : ''}`} aria-hidden={!shown}>
      <div className="sticky__pill">
        <span className="sticky__info">
          <b>{pricing.early}</b>
          <s>{pricing.regular}</s>
          <i>· осталось {pricing.seatsLeft} мест</i>
        </span>
        <button className="btn btn--primary sticky__btn" onClick={() => open()} tabIndex={shown ? 0 : -1}>
          Забронировать
          <span className="btn__arrow">→</span>
        </button>
      </div>
    </div>
  )
}
