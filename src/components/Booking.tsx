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

export const useBooking = () => useContext(BookingCtx)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<string | null>(null)
  const isOpen = prefill !== null

  const open = useCallback((text?: string) => setPrefill(text || contacts.telegram.prefill), [])
  const close = useCallback(() => setPrefill(null), [])

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

  return (
    <BookingCtx.Provider value={value}>
      {children}

      {isOpen && (
        <div className="bm" role="dialog" aria-modal="true" aria-label={t.title}>
          <div className="bm__scrim" onClick={close} />
          <div className="bm__card">
            <button className="bm__close" onClick={close} aria-label="Закрыть">✕</button>

            <h3 className="display bm__title">{t.title}</h3>
            <p className="bm__sub">{t.subtitle}</p>

            <div className="bm__row">
              <a
                className="btn bm__btn"
                href={`https://t.me/${contacts.telegram.user}?text=${encodeURIComponent(prefill)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Telegram
              </a>
              <a
                className="btn btn--quiet bm__btn"
                href={`https://ig.me/m/${contacts.instagram.user}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </BookingCtx.Provider>
  )
}
