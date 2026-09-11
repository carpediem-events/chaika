import { useCallback, useEffect, useRef, useState } from 'react'
import './promo.css'

/** Клипборд бывает недоступен (http, старый webview) — тогда старый способ. */
async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    /* падаем в запасной вариант ниже */
  }

  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', '')
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
  document.body.appendChild(ta)
  ta.select()
  ta.setSelectionRange(0, text.length)
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  ta.remove()
  return ok
}

/**
 * Плашка с промокодом: жмётся целиком (удобно пальцем) и показывает,
 * что код уехал в буфер — иконка сменяется галочкой, подпись — «скопировано».
 */
export function Promo({ code, note }: { code: string; note: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const onClick = useCallback(async () => {
    if (!(await copyText(code))) return
    setCopied(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2200)
  }, [code])

  return (
    <button
      type="button"
      className={`promo ${copied ? 'is-copied' : ''}`}
      onClick={onClick}
      aria-label={`Скопировать промокод ${code}`}
    >
      <span className="promo__text">
        <span className="promo__label">
          <span className="promo__label-i">Промокод</span>
          <span className="promo__label-i promo__label-i--done">Промокод скопирован</span>
        </span>
        <span className="promo__line">
          <span className="promo__code">{code}</span>
          <span className="promo__note">{note}</span>
        </span>
      </span>

      <span className="promo__icon" aria-hidden>
        <svg className="promo__ico promo__ico--copy" viewBox="0 0 24 24">
          <rect x="9" y="9" width="11.5" height="11.5" rx="2.6" />
          <path d="M15 6.2V5.4A2.4 2.4 0 0 0 12.6 3H5.4A2.4 2.4 0 0 0 3 5.4v7.2A2.4 2.4 0 0 0 5.4 15h.8" />
        </svg>
        <svg className="promo__ico promo__ico--done" viewBox="0 0 24 24">
          <path d="M4.5 12.6 9.4 17.5 19.5 6.8" />
        </svg>
      </span>

      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Промокод скопирован' : ''}
      </span>
    </button>
  )
}
