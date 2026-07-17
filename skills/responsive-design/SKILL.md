---
name: responsive-design
description: Responsive web design patterns — mobile-first approach, fluid grids, media queries, flexible images, accessible layouts, and cross-device optimization.
metadata:
  origin: ECC
---

# Responsive Design Patterns

Practical guidelines for building responsive, accessible, and maintainable web interfaces.

## When to Activate

- Building or refactoring responsive layouts
- Adding media queries or breakpoints
- Optimizing for mobile, tablet, and desktop
- Converting fixed layouts to fluid/flexible
- Auditing cross-device UX or accessibility
- Working with responsive images or typography

## Core Principles

### 1. Mobile-First

Start with the smallest screen. Enhance upward with `min-width` queries.

```css
/* Base styles = mobile */
.container { padding: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 3rem; max-width: 1200px; margin: 0 auto; }
}
```

### 2. Fluid Grids

Use relative units, not fixed pixels.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: 1rem;
}
```

Flexbox alternative:
```css
.layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.layout > * { flex: 1 1 300px; }
```

### 3. Responsive Images

```html
<picture>
  <source media="(min-width: 1024px)" srcset="hero-wide.webp">
  <source media="(min-width: 640px)" srcset="hero-medium.webp">
  <img src="hero-mobile.webp" alt="Description" loading="lazy" decoding="async">
</picture>
```

```css
img, video { max-width: 100%; height: auto; }
```

Use SVG for icons/logos. Compress raster images. Prefer WebP/AVIF.

### 4. Breakpoints

Standard breakpoints — adjust to your design, not device names:

| Token | Min-width | Typical use |
|-------|-----------|-------------|
| `sm` | 640px | Large phones / small tablets |
| `md` | 768px | Tablets portrait |
| `lg` | 1024px | Tablets landscape / small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### 5. Content Hierarchy

- Prioritize critical tasks on mobile
- Hide or collapse non-essential elements at small viewports
- Use progressive disclosure — show detail on demand

### 6. Adaptive Navigation

```css
/* Mobile: stacked or hamburger */
.nav-links { display: none; }
.nav-links.open { display: flex; flex-direction: column; }

/* Desktop: horizontal */
@media (min-width: 768px) {
  .nav-links { display: flex; flex-direction: row; }
  .hamburger { display: none; }
}
```

Touch targets: minimum 44x44px per WCAG.

### 7. Performance

- Lazy-load below-the-fold images (`loading="lazy"`)
- Use `aspect-ratio` to prevent layout shift
- Minimize HTTP requests; bundle critical CSS inline
- Defer non-critical JS

```css
.image-wrapper {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
```

### 8. Touch-Friendly

- Buttons/links: min 44x44px tap target
- Generous spacing between interactive elements
- Avoid hover-only interactions on mobile

```css
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.25rem;
}
```

### 9. Consistency

- Use CSS custom properties for tokens (colors, spacing, type scale)
- Consistent spacing rhythm across viewports
- Shared component library / design tokens

```css
:root {
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --text-base: clamp(1rem, 0.925rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
}
```

### 10. Accessibility

- Contrast ratio: 4.5:1 minimum (text), 3:1 (large text)
- Semantic HTML (`<nav>`, `<main>`, `<article>`, `<aside>`)
- `alt` text on all meaningful images
- Keyboard-navigable; visible focus indicators
- Resizable text (use `rem`/`em`, not `px` for type)

```css
:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
```

### 11. Testing & Iteration

Test on real devices, not just DevTools emulation:
- Physical phones (iOS Safari, Android Chrome)
- Tablet landscape + portrait
- Desktop at various widths
- Browser stack (Chrome, Firefox, Safari, Edge)

## Responsive Typography

```css
h1 {
  font-size: clamp(1.75rem, 1.5rem + 1.5vw, 3rem);
  line-height: 1.2;
}
```

## Container Queries (Reusable Components)

```css
.card-container { container-type: inline-size; }

@container (min-width: 400px) {
  .card { display: flex; }
}
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Checklist

Before shipping:
- [ ] Mobile-first CSS with `min-width` queries
- [ ] All images responsive (srcset/picture or max-width: 100%)
- [ ] Touch targets ≥ 44x44px
- [ ] Text uses relative units (rem/em/clamp)
- [ ] Semantic HTML and ARIA where needed
- [ ] Keyboard navigation works
- [ ] Contrast ratios pass WCAG AA
- [ ] `prefers-reduced-motion` respected
- [ ] Tested on 3+ real device widths
- [ ] No horizontal scroll on any viewport
