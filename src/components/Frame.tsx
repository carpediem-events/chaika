import type { Media } from '../content'
import './frame.css'

/**
 * Единая обёртка под фото/видео.
 * Если media.src пустой — рисует осмысленную заглушку с подписью,
 * чтобы на созвоне было видно, какой материал сюда встаёт.
 */
export function Frame({
  media,
  className = '',
  cover = true,
  eager = false,
}: {
  media: Media
  className?: string
  cover?: boolean
  /** для ленты, которая едет вбок: там ленивая загрузка срабатывает не всегда */
  eager?: boolean
}) {
  if (!media.src) {
    return (
      <div className={`frame frame--empty ${className}`}>
        <div className="frame__ph">
          <span className="frame__ph-icon" aria-hidden>
            {media.kind === 'video' ? '▶' : '◻'}
          </span>
          <span className="frame__ph-text">{media.placeholder}</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`frame ${className}`}>
      {media.kind === 'video' ? (
        <video
          src={media.src}
          poster={media.poster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ objectFit: cover ? 'cover' : 'contain' }}
        />
      ) : (
        <img
          src={media.src}
          alt={media.alt || ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectFit: cover ? 'cover' : 'contain' }}
        />
      )}
    </div>
  )
}
