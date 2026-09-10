import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useBooking } from './Booking'
import './sticky.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Кнопка брони следует за человеком: появляется с блока прошлых встреч
 * и прячется только на финальном экране, где уже стоит большая кнопка.
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
        trigger: '#closing',
        start: 'top 60%',
        onEnter: () => setShown(false),
        onLeaveBack: () => setShown(true),
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className={`sticky ${shown ? 'is-on' : ''}`} aria-hidden={!shown}>
      <button className="btn sticky__btn" onClick={() => open()} tabIndex={shown ? 0 : -1}>
        Забронировать
      </button>
    </div>
  )
}
