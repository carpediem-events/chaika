/**
 * ЕДИНЫЙ ФАЙЛ КОНТЕНТА.
 * Всё, что нужно править к созвону — правится здесь. Компоненты трогать не надо.
 *
 * Как подставить медиа:
 *   1. Положить файл в  public/media/
 *   2. Прописать путь ниже, например:  src: 'media/team-wave.mp4'
 *   3. Пока src не заполнен — на месте блока рисуется аккуратная заглушка с подписью.
 */

export type Media = {
  /** путь относительно public/, напр. 'media/hero.mp4'. Пусто = заглушка */
  src?: string
  kind: 'video' | 'image'
  /** подпись на заглушке — чтобы на созвоне было видно, что сюда идёт */
  placeholder: string
  /** постер для видео (первый кадр), напр. 'media/hero-poster.jpg' */
  poster?: string
  alt?: string
}

export const brand = {
  name: 'Carpe Diem',
  nameRu: 'Карпе Дием',
  tagline: 'Живые события, после которых не хочется расходиться',
  /** TODO: положить logo.svg в public/media/ */
  logo: 'media/logo.svg',
}

export const contacts = {
  /** TODO: подставить реальные хэндлы */
  telegram: {
    /** username без @ */
    user: 'carpediem',
    /** текст, который подставится в поле ввода Telegram */
    prefill: 'Привет! Хочу забронировать место',
  },
  instagram: {
    user: 'carpediem',
  },
  tiktok: {
    user: 'carpediem',
  },
}

/** Дедлайн ранней цены. Месяцы с нуля: 8 = сентябрь. */
export const priceDeadline = new Date(2026, 8, 13, 23, 59, 59)

export const pricing = {
  early: '99 €',
  regular: '119 €',
  seatsTotal: 32,
  /** ОБНОВЛЯТЬ ВРУЧНУЮ по мере продаж */
  seatsLeft: 16,
}

export const hero = {
  media: {
    kind: 'video',
    src: '',
    placeholder: 'ВИДЕО: команда машет в камеру (горизонт., без звука, 8–15 сек)',
    poster: '',
    alt: 'Команда Carpe Diem',
  } as Media,
  kicker: '26 и 27 сентября',
  title: 'Мы уже\nмашем тебе',
  subtitle:
    'Два вечера, тридцать два места и компания, ради которой стоит отменить все планы.',
  cta: 'Забронировать место',
  scrollHint: 'Листай — покажем',
}

export const about = {
  kicker: 'Кто мы',
  title: 'Carpe Diem — это не мероприятия. Это люди, которые на них приходят.',
  body: [
    'Мы собираем вечера, на которых незнакомые люди уходят друзьями: театр, психология, йога, разговоры до последнего трамвая.',
    'Без пафоса и нетворкинг-бейджиков. Просто тёплая комната, живые люди и ощущение, что ты наконец-то среди своих.',
  ],
  stats: [
    { value: '20+', label: 'проведённых встреч' },
    { value: '500+', label: 'человек прошло через нас' },
    { value: '32', label: 'места на этот раз' },
  ],
}

export type EventItem = {
  id: string
  date: string
  weekday: string
  title: string
  lead: string
  body: string
  meta: { label: string; value: string }[]
  media: Media
  cta: string
  /** текст, который подставится в Telegram при клике именно по этому событию */
  prefill: string
}

export const events: EventItem[] = [
  {
    id: 'chaika',
    date: '26 сентября',
    weekday: 'суббота',
    title: 'Чайка',
    lead: 'Главное событие сезона',
    body:
      'TODO: описание «Чайки» — что это, как проходит, почему ради этого стоит прийти. 2–3 предложения, живым языком.',
    meta: [
      { label: 'Когда', value: '26 сентября, 19:00' },
      { label: 'Где', value: 'TODO: площадка' },
      { label: 'Мест', value: 'ограничено' },
    ],
    media: {
      kind: 'image',
      src: '',
      placeholder: 'ФОТО/ВИДЕО: «Чайка» — с работы, репетиций',
      alt: 'Чайка',
    },
    cta: 'Забронировать на 26-е',
    prefill: 'Привет! Хочу забронировать место на «Чайку» 26 сентября',
  },
  {
    id: 'teatr',
    date: '27 сентября',
    weekday: 'воскресенье',
    title: 'Театр',
    lead: 'На следующий день',
    body:
      'TODO: описание события 27-го. Что за спектакль, чем он про зрителя, а не про сцену.',
    meta: [
      { label: 'Когда', value: '27 сентября, 19:00' },
      { label: 'Где', value: 'TODO: площадка' },
      { label: 'Мест', value: 'ограничено' },
    ],
    media: {
      kind: 'image',
      src: '',
      placeholder: 'ФОТО/ВИДЕО: со спектаклей',
      alt: 'Театр',
    },
    cta: 'Забронировать на 27-е',
    prefill: 'Привет! Хочу забронировать место на 27 сентября',
  },
]

export const gallery = {
  kicker: 'Как это было',
  title: 'Наши прошлые\nвстречи',
  note: 'Листай вбок',
  items: [
    {
      title: 'Психология',
      caption: 'Вечер, где говорят про то, о чём обычно молчат',
      media: { kind: 'image', src: '', placeholder: 'ФОТО: психология' } as Media,
    },
    {
      title: 'Йога',
      caption: 'Утро, которое начинается не с телефона',
      media: { kind: 'image', src: '', placeholder: 'ФОТО: йога' } as Media,
    },
    {
      title: 'Rury',
      caption: 'Совместные фотографии и очень много смеха',
      media: { kind: 'image', src: '', placeholder: 'ФОТО: Rury' } as Media,
    },
    {
      title: 'Спектакли',
      caption: 'Сцена в паре метров от тебя',
      media: { kind: 'image', src: '', placeholder: 'ВИДЕО: со спектаклей' } as Media,
    },
    {
      title: 'Команда',
      caption: 'Те, кто всё это придумывает',
      media: { kind: 'image', src: '', placeholder: 'ФОТО: команда целиком' } as Media,
    },
  ],
}

export const finale = {
  kicker: 'Осталось решить одно',
  title: 'Идёшь?',
  body: 'Напиши нам — забронируем место и всё расскажем. Это занимает одно сообщение.',
  cta: 'Написать и забронировать',
}

export const modal = {
  title: 'Как тебе удобнее?',
  subtitle: 'Напиши — забронируем место и ответим на всё.',
  telegram: {
    label: 'Telegram',
    hint: 'Быстрее всего — сообщение уже готово, останется нажать «отправить»',
  },
  instagram: {
    label: 'Instagram Direct',
    hint: 'Если пишешь впервые — загляни в «Запросы» и «Спам», ответ может упасть туда',
  },
}
