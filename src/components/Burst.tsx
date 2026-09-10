/**
 * Фирменная «вспышка» с макетов инстаграма: 16 тонких лучей разной длины.
 * Живёт на фоне секций, медленно вращается и уезжает параллаксом.
 */
export function Burst({
  className = '',
  size = 900,
  style,
}: {
  className?: string
  size?: number
  style?: React.CSSProperties
}) {
  // четырёхлучевая искра; k задаёт «талию» — чем меньше, тем острее лучи
  const spark = (r: number, k = 0.05) => {
    const c = 100
    const p = r * k
    return [
      `M${c},${c - r}`,
      `C${c},${c - p} ${c + p},${c} ${c + r},${c}`,
      `C${c + p},${c} ${c},${c + p} ${c},${c + r}`,
      `C${c},${c + p} ${c - p},${c} ${c - r},${c}`,
      `C${c - p},${c} ${c},${c - p} ${c},${c - r}`,
      'Z',
    ].join(' ')
  }

  return (
    <svg
      className={`burst ${className}`}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="currentColor"
      aria-hidden
      style={style}
    >
      <path d={spark(100, 0.035)} />
      <path d={spark(84, 0.04)} transform="rotate(45 100 100)" />
      <path d={spark(58, 0.06)} transform="rotate(22.5 100 100)" />
      <path d={spark(58, 0.06)} transform="rotate(67.5 100 100)" />
    </svg>
  )
}
