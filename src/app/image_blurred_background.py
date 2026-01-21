from PIL import Image, ImageFilter
from pathlib import Path

# ====== SETTINGS YOU'LL TWEAK ======
INPUT_PATH = "/Users/samircerrato/Desktop/MFLC/mflc-site/public/thumbnail2026.png"   # <-- change
OUTPUT_PATH = "/Users/samircerrato/Desktop/MFLC/mflc-site/public/thumbnail2026_blurred.png"  # <-- change

CANVAS_W, CANVAS_H = 1080, 1920

BLUR_RADIUS = 30

# Foreground placement:
# 0.0 = top of screen, 0.5 = middle, 1.0 = bottom
FOREGROUND_Y_RATIO = 0.38   # <-- try 0.35 to 0.55
# ==================================

img = Image.open(INPUT_PATH).convert("RGB")

# --- Background: "cover" the canvas, then blur ---
scale_bg = max(CANVAS_W / img.width, CANVAS_H / img.height)
bg = img.resize((int(img.width * scale_bg), int(img.height * scale_bg)), Image.LANCZOS)

# Center-crop background to canvas
left = (bg.width - CANVAS_W) // 2
top = (bg.height - CANVAS_H) // 2
bg = bg.crop((left, top, left + CANVAS_W, top + CANVAS_H))

bg = bg.filter(ImageFilter.GaussianBlur(radius=BLUR_RADIUS))

# --- Foreground: full-bleed width (touch corners) ---
fg_w = CANVAS_W
scale_fg = fg_w / img.width
fg_h = int(img.height * scale_fg)
fg = img.resize((fg_w, fg_h), Image.LANCZOS)

# Position: full width => x = 0
x = 0

# Vertical placement (not centered):
# Place fg so its TOP starts at a chosen ratio of the canvas height
y = int(CANVAS_H * FOREGROUND_Y_RATIO)

# If it would go off-screen, clamp it
y = max(0, min(y, CANVAS_H - fg_h))

# Composite
canvas = bg.copy()
canvas.paste(fg, (x, y))

canvas.save(OUTPUT_PATH)
print("Saved:", OUTPUT_PATH)
 