/**
 * ?static (только в dev) — режим для снятия скриншотов:
 * без инерции, без анимаций входа, всё сразу на своих местах.
 */
export const isStatic =
  import.meta.env.DEV && new URLSearchParams(location.search).has('static')
