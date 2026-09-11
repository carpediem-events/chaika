#!/usr/bin/env python3
"""
Готовит присланные фото под веб: разворачивает по EXIF, ужимает, кладёт в public/media/.

    python3 scripts/prepare-media.py ~/Downloads

Список ниже — что и подо что идёт. Когда пришлют новые материалы,
дописать строку сюда и прогнать скрипт заново.
"""
import subprocess
import sys
import tempfile
from pathlib import Path
from PIL import Image, ImageOps

SRC = Path(sys.argv[1] if len(sys.argv) > 1 else "~/Downloads").expanduser()
OUT = Path(__file__).resolve().parent.parent / "public" / "media"

# (файл-источник, имя на выходе, максимальная сторона)
JOBS = [
    ("IMG_6334.PNG", "team.jpg", 2400),      # общая фотография с логотипом — полоса под первым экраном
    ("IMG_6330.PNG", "mk.jpg", 1600),        # актёрская практика — карточка 26.09
    ("IMG_3467.PNG", "afisha.jpg", 1600),    # афиша «Пушкин и деньги» — карточка 27.09
    ("IMG_3474.JPEG", "spektakl.jpg", 1600), # сцена — в запасе
    ("IMG_3476.JPEG", "hosts.jpg", 1600),    # Алексей и Егор — блок «ведут»
    ("IMG_6326.PNG", "past-1.jpg", 1300),
    ("IMG_6328.PNG", "past-2.jpg", 1300),
    ("IMG_6323.JPG", "past-3.jpg", 1300),
    ("IMG_6318.JPG", "past-4.jpg", 1300),
    ("IMG_6315.JPG", "past-5.jpg", 1300),   # общая с 6334 дублировалась — заменено
    ("IMG_6310.JPG", "past-6.jpg", 1300),   # было 3475 (Лёша в образе) — убрали по правкам
]

# превью ссылки для телеграма и инстаграма — кроп 1200×630 из общей фотографии
OG_FROM, OG_SIZE = "IMG_6334.PNG", (1200, 630)


def load(name: str) -> Image.Image:
    path = SRC / name
    # PIL не читает HEIF/HEIC с айфона — прогоняем через системный sips
    if path.suffix.lower() in {".heif", ".heic"}:
        tmp = Path(tempfile.mkdtemp()) / "converted.jpg"
        subprocess.run(
            ["sips", "-s", "format", "jpeg", str(path), "--out", str(tmp)],
            check=True, capture_output=True,
        )
        path = tmp
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for src, dst, box in JOBS:
        if not (SRC / src).exists():
            print(f"  пропуск: нет {src}")
            continue
        im = load(src)
        im.thumbnail((box, box), Image.LANCZOS)
        im.save(OUT / dst, "JPEG", quality=82, optimize=True, progressive=True)
        print(f"  {src} → media/{dst}  {im.width}×{im.height}")

    if (SRC / OG_FROM).exists():
        og = ImageOps.fit(load(OG_FROM), OG_SIZE, Image.LANCZOS, centering=(0.5, 0.42))
        og.save(OUT / "og.jpg", "JPEG", quality=84, optimize=True)
        print(f"  {OG_FROM} → media/og.jpg  {OG_SIZE[0]}×{OG_SIZE[1]}")


if __name__ == "__main__":
    main()
