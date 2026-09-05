# Taste

## Visual design
- Loves a Brutalist × Minimalist fusion for UI design: a Brutalist foundation (thick 2-3px solid black borders, hard offset shadows with zero blur like `box-shadow: 6px 6px 0 0 #000`, bold confident typography, visible structural grid, raw intentional edges) softened by minimalist restraint (soft muted palette — warm off-white/cream background, soft desaturated accents, black as the dominant structural color, generous whitespace, clear hierarchy, nothing decorative that doesn't earn its place). The result should read as calm and refined with only the layout and borders staying hard-edged. Confidence: 0.95
- Wants a brighter, more colorful UI: when the base palette reads as too muted, prefers adding color to enhance brightness rather than staying strictly neutral/desaturated. Confidence: 0.8
- Prefers interactive UI to be self-explanatory rather than annotated with instructional/status overlays — e.g., asked to remove a "Hover to pause"/"Paused" badge from the floating experience cards entirely. Confidence: 0.6
- Prefers social/external link buttons to use their official brand colors (e.g., GitHub dark `#24292e`, LinkedIn brand blue `#0a66c2`) rather than the site's accent palette or bright non-brand accents — explicitly asked to undo a bright-green GitHub button and revert to the dark brand color. Confidence: 0.85

## Motion & animation
- Enjoys playful interactive motion beyond static reveals — e.g., cards drifting freely/randomly within a zone that pause on hover and resume when the mouse leaves. Confidence: 0.6
- Prefers restrained, purposeful animation: skip sections that already have a good amount of animation rather than re-animating everything. Confidence: 0.7
- Prefers scroll/motion animation built around one coherent authored thesis (e.g., "structure draws itself") with differentiated reveals per element type — headings lead via an underline wipe, cards snap in with their offset shadow — rather than one identical fade-rise repeated across every section. Confidence: 0.8
- Values progressive enhancement and accessibility in animation: content stays visible without JS, a full `prefers-reduced-motion` override kills all motion/blur/clip, and animations end cleanly (`backwards` fill) so they don't lock `transform`/`box-shadow` and break hover states. Confidence: 0.8
- Prefers interactive layouts to degrade gracefully on narrow screens (fall back to a normal stacked layout when a free-floating card zone can't fit). Confidence: 0.6
- Prefers hover/interaction micro-interactions to be subtle and unique while staying on-brand: echo an existing signature motion (and its easing curve) rather than introduce a standalone, generic effect, and complement existing load-in animations instead of replacing them. Confidence: 0.8
- Prefers snappier, more energetic motion pacing: when a continuous motion (e.g., drifting cards) reads as too slow, wants the speed/energy turned up (faster direction changes, stronger easing) rather than kept subtle and slow. Confidence: 0.6
- Prefers CSS-only animations over JavaScript where possible: when JS-driven movement showed jitter, asked whether the same motion could be done in pure CSS because it would be "lighter," and was happy to delete the JS entirely. Confidence: 0.8
- Prefers animated text to stay crisp and readable: avoids rotating/skewing text-bearing elements mid-animation (angular motion forces glyph re-rasterization) and avoids forcing text onto its own GPU layer (`will-change: transform` / `translate3d`) since that rasterizes glyphs at a fixed resolution and shimmers under sub-pixel motion — prefers plain whole-pixel 2D `translate` values. Confidence: 0.85
- Prefers animated/floating card layouts to have generous spacing and padding so the elements have ample room to roam, rather than being tightly packed. Confidence: 0.55
- Prefers compact, summary-first cards that reveal detail on hover rather than showing everything at once — e.g., experience cards collapsed to role/company/dates that "roll open like paper" on hover. Confidence: 0.7
- Enjoys marquee-style continuous scrolling text (e.g., a tech-stack ticker running left-to-right) as a way to showcase repeated items. Confidence: 0.6

## Consistency
- New UI elements (logo, favicon, back buttons, etc.) must be designed to match the existing design system rather than introduced ad hoc. Confidence: 0.7
- Prefers photos and other image assets to be edited/graded so they blend with the design system (e.g., recoloring a portrait to the site's palette as a deliberate duotone) rather than dropped in as-is, and is happy for the agent to modify the asset freely to achieve that fit. Confidence: 0.8
ce: 0.8
