import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { contacts, modal as t } from '../content'
import './booking.css'

type Ctx = { open: (prefill?: string) => void }
const BookingCtx = createContext<Ctx>({ open: () => {} })

/** Любая кнопка на странице открывает модалку через useBooking().open(текст) */
export const useBooking = () => useContext(BookingCtx)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<string | null>(null)
  const isOpen = prefill !== null

  const open = useCallback((text?: string) => {
    setPrefill(text || contacts.telegram.prefill)
  }, [])
  const close = useCallback(() => setPrefill(null), [])

  // Esc + блокировка прокрутки фона, пока модалка открыта
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [isOpen, close])

  const value = useMemo(() => ({ open }), [open])

  const tgHref = `https://t.me/${contacts.telegram.user}?text=${encodeURIComponent(
    prefill ?? '',
  )}`
  const igHref = `https://ig.me/m/${contacts.instagram.user}`

  return (
    <BookingCtx.Provider value={value}>
      {children}

      {isOpen && (
        <div className="bm" role="dialog" aria-modal="true" aria-label={t.title}>
          <div className="bm__scrim" onClick={close} />
          <div className="bm__card">
            <button className="bm__close" onClick={close} aria-label="Закрыть">
              ✕
            </button>

            <p className="kicker bm__kicker">Бронь</p>
            <h3 className="display bm__title">{t.title}</h3>
            <p className="bm__sub">{t.subtitle}</p>

            <a className="bm__opt bm__opt--tg" href={tgHref} target="_blank" rel="noopener noreferrer">
              <TgIcon />
              <span className="bm__opt-body">
                <span className="bm__opt-label">{t.telegram.label}</span>
                <span className="bm__opt-hint">{t.telegram.hint}</span>
              </span>
              <span className="bm__opt-arrow">→</span>
            </a>

            <a className="bm__opt" href={igHref} target="_blank" rel="noopener noreferrer">
              <IgIcon />
              <span className="bm__opt-body">
                <span className="bm__opt-label">{t.instagram.label}</span>
                <span className="bm__opt-hint">{t.instagram.hint}</span>
              </span>
              <span className="bm__opt-arrow">→</span>
            </a>

            <p className="bm__msg">
              <span>Сообщение уже готово:</span>
              <em>«{prefill}»</em>
            </p>
          </div>
        </div>
      )}
    </BookingCtx.Provider>
  )
}

function TgIcon() {
  return (
    <svg className="bm__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.9 4.3 18.6 20c-.25 1.1-.9 1.37-1.83.85l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.15 9.37-8.47c.4-.36-.09-.56-.63-.2L6.79 13.3l-4.98-1.56c-1.08-.34-1.1-1.08.23-1.6l19.47-7.5c.9-.33 1.69.2 1.39 1.66z" />
    </svg>
  )
}

function IgIcon() {
  return (
    <svg className="bm__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}
