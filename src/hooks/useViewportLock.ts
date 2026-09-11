import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * На телефоне интерфейс браузера (адресная строка Safari, шапка встроенного
 * браузера телеграма) то выезжает, то прячется — и делает это на каждой смене
 * направления скролла. Высота вьюпорта из-за этого скачет, а вместе с ней:
 *   — «дышат» все размеры и отступы на vh/svh;
 *   — ScrollTrigger считает ресайзом и пересчитывает пины и параллакс.
 * Отсюда прыжки по всей странице ровно в момент разворота скролла.
 *
 * Лечим с двух сторон.
 */

// 1. Отключаем автопересчёт по resize — дальше решаем сами (см. onResize ниже).
//    Конфиг ставим на импорте, до того как компоненты создадут свои триггеры.
ScrollTrigger.config({
  ignoreMobileResize: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
})

/** Стабильная высота экрана: 100svh — вьюпорт с РАЗВЁРНУТЫМ интерфейсом браузера. */
function stableHeight() {
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none'
  document.documentElement.appendChild(probe)
  const h = probe.getBoundingClientRect().height
  probe.remove()
  // svh нет (старый webview) или вернулся мусор — берём то, что есть сейчас
  return Math.round(h > 0 ? h : window.innerHeight)
}

// 2. Замораживаем высоту в --vh: вся вёрстка считает от неё, а не от живого vh.
function lockHeight() {
  document.documentElement.style.setProperty('--vh', `${stableHeight() / 100}px`)
}

export function useViewportLock() {
  useEffect(() => {
    lockHeight()

    let w = window.innerWidth
    let h = window.innerHeight
    let timer: ReturnType<typeof setTimeout> | undefined

    const onResize = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const widthChanged = window.innerWidth !== w
      // на тачах одна только смена высоты — это интерфейс браузера, не ресайз
      if (!widthChanged && (coarse || window.innerHeight === h)) return

      w = window.innerWidth
      h = window.innerHeight
      clearTimeout(timer)
      timer = setTimeout(() => {
        lockHeight()
        ScrollTrigger.refresh()
      }, 120)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])
}
