import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { isStatic } from '../lib/env'

gsap.registerPlugin(ScrollTrigger)

/**
 * Рисованные от руки пометки — как в макетах: стрелка, обводка слова, подчёркивание.
 * Линия «дорисовывается» сама, когда доезжает до экрана.
 */
type Kind = 'arrow-down' | 'arrow-right' | 'circle' | 'underline'

const PATHS: Record<Kind, { d: string; box: string; head?: string }> = {
  'arrow-down': {
    box: '0 0 90 150',
    d: 'M72 6c6 34-2 58-20 74-15 13-34 19-41 38-3 9-1 19 6 26',
    head: 'M6 128l11 20 19-9',
  },
  'arrow-right': {
    box: '0 0 160 70',
    d: 'M6 22c30-18 66-20 98-6 15 7 30 18 50 16',
    head: 'M136 12l19 20-21 17',
  },
  circle: {
    box: '0 0 220 90',
    d: 'M126 8C74 2 22 12 9 34c-12 21 22 44 84 48 51 3 108-9 118-30 8-17-18-34-70-42-13-2-27-3-40-2',
  },
  underline: {
    box: '0 0 240 24',
    d: 'M6 12c46-8 106-9 160-4 22 2 46 5 68 10',
  },
}

export function Doodle({
  kind,
  className = '',
  color = 'var(--ink-faint)',
  width = 120,
  delay = 0,
}: {
  kind: Kind
  className?: string
  color?: string
  width?: number
  delay?: number
}) {
  const root = useRef<SVGSVGElement>(null)
  const cfg = PATHS[kind]

  useEffect(() => {
    if (isStatic) return

    const ctx = gsap.context(() => {
      const strokes = gsap.utils.toArray<SVGPathElement>('path', root.current!)
      strokes.forEach((p, i) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(p, {
          strokeDashoffset: 0,
          duration: i === 0 ? 1.1 : 0.35,
          ease: 'power2.inOut',
          delay: delay + i * 0.9,
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [delay])

  return (
    <svg
      ref={root}
      className={className}
      width={width}
      viewBox={cfg.box}
      fill="none"
      stroke={color}
      strokeWidth={kind === 'circle' || kind === 'underline' ? 1.6 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ overflow: 'visible' }}
    >
      <path d={cfg.d} />
      {cfg.head && <path d={cfg.head} />}
    </svg>
  )
}
