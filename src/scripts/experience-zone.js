const ZONE_MIN_WIDTH = 720;
const PAD = 24;
const WANDER = 30;
const ROT_MAX = 2.4;
const COL_GAP = 40;
const ROW_GAP = 40;
const APPROACH = 2.4;
const ROT_APPROACH = 3.2;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const rand = (min, max) => min + Math.random() * (max - min);
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function setupZone(zone) {
  const floatEls = Array.from(zone.querySelectorAll(".experience-float"));
  if (!floatEls.length) return;

  const cards = floatEls.map((el) => ({
    el,
    homeX: 0,
    homeY: 0,
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    rot: 0,
    trot: 0,
    wanderAt: 0,
    minDx: 0,
    maxDx: 0,
    minDy: 0,
    maxDy: 0,
  }));

  let active = false;
  let frozen = false;
  let raf = 0;
  let last = 0;
  let observer = null;

  function pickWander(card, now) {
    card.tx = rand(-WANDER, WANDER);
    card.ty = rand(-WANDER, WANDER);
    card.trot = rand(-ROT_MAX, ROT_MAX);
    card.wanderAt = now + rand(1100, 2400);
  }

  function activate() {
    if (active) return;
    active = true;
    zone.classList.add("is-active");

    const now = performance.now();
    cards.forEach((card, i) => {
      card.rot = rand(-ROT_MAX, ROT_MAX);
      card.trot = card.rot;
      card.el.style.zIndex = String(i + 1);
      pickWander(card, now + i * 700);
    });
    last = now;
    raf = requestAnimationFrame(frame);
  }

  function deactivate() {
    if (!active) return;
    active = false;
    zone.classList.remove("is-active");
    zone.style.height = "";
    cards.forEach((card) => {
      card.el.style.left = "";
      card.el.style.top = "";
      card.el.style.transform = "";
    });
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function layout() {
    const zoneW = zone.clientWidth;
    if (zoneW < ZONE_MIN_WIDTH) {
      deactivate();
      return;
    }

    activate();

    const cs = getComputedStyle(zone);
    const borderY =
      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
    const cardW = floatEls[0].offsetWidth;
    const cardH = Math.max(...floatEls.map((f) => f.offsetHeight));
    const usableW = zoneW - PAD * 2;
    const n = cards.length;

    const cols = usableW >= n * cardW + (n - 1) * COL_GAP ? n : 2;
    if (cols === 2 && usableW < 2 * cardW + COL_GAP) {
      deactivate();
      return;
    }

    const rows = Math.ceil(n / cols);
    const colGap = cols > 1 ? (usableW - cols * cardW) / (cols - 1) : 0;
    const zoneH = PAD * 2 + rows * cardH + (rows - 1) * ROW_GAP;

    zone.style.height = `${zoneH + borderY}px`;

    cards.forEach((card, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const inRow = row === rows - 1 ? n - row * cols : cols;
      const offset = (usableW - inRow * cardW - (inRow - 1) * colGap) / 2;

      card.homeX = PAD + offset + col * (cardW + colGap);
      card.homeY = PAD + row * (cardH + ROW_GAP);
      card.minDx = PAD - card.homeX;
      card.maxDx = zoneW - PAD - cardW - card.homeX;
      card.minDy = PAD - card.homeY;
      card.maxDy = zoneH - PAD - cardH - card.homeY;

      card.x = clamp(card.x, card.minDx, card.maxDx);
      card.y = clamp(card.y, card.minDy, card.maxDy);
      card.tx = clamp(card.tx, card.minDx, card.maxDx);
      card.ty = clamp(card.ty, card.minDy, card.maxDy);

      card.el.style.left = `${card.homeX}px`;
      card.el.style.top = `${card.homeY}px`;
      card.el.style.transform = `translate3d(${card.x}px, ${card.y}px, 0) rotate(${card.rot}deg)`;
    });
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    const rect = zone.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    if (frozen) return;

    for (const card of cards) {
      if (now >= card.wanderAt) pickWander(card, now);
      const k = 1 - Math.exp(-dt * APPROACH);
      card.x += (card.tx - card.x) * k;
      card.y += (card.ty - card.y) * k;
      card.rot += (card.trot - card.rot) * (1 - Math.exp(-dt * ROT_APPROACH));
      card.el.style.transform = `translate3d(${card.x}px, ${card.y}px, 0) rotate(${card.rot}deg)`;
    }
  }

  function setFrozen(value) {
    if (frozen === value) return;
    frozen = value;
    zone.classList.toggle("is-frozen", value);
    if (!value) {
      const now = performance.now();
      cards.forEach((card) => pickWander(card, now));
      last = now;
    }
  }

  zone.addEventListener("mouseenter", () => setFrozen(true));
  zone.addEventListener("mouseleave", () => setFrozen(false));
  zone.addEventListener("focusin", () => setFrozen(true));
  zone.addEventListener("focusout", () => setFrozen(false));
  zone.addEventListener("touchstart", () => setFrozen(true), { passive: true });
  zone.addEventListener("touchend", () => setFrozen(false), { passive: true });

  layout();

  if ("ResizeObserver" in window) {
    observer = new ResizeObserver(() => layout());
    observer.observe(zone);
  }
}

if (!reduced) {
  document.querySelectorAll("[data-experience-zone]").forEach(setupZone);
}
