--- KHUBO_DESIGN_SPECIFICATION.md (原始)


+++ KHUBO_DESIGN_SPECIFICATION.md (修改后)
---
version: 1.0
name: KHUBO-Design-System
description: A modern, trustworthy accommodation and roommate-finding platform with clean lines, bold primary colors, and photography-forward presentation. The design balances professional credibility with approachable warmth through careful use of deep navy blues, vibrant accent blues, and generous whitespace.

colors:
  primary: "#17294F"
  primary-hover: "#1e366a"
  accent: "#2252D6"
  accent-hover: "#1a41b8"
  white: "#ffffff"
  black: "#000000"
  neutral-50: "#fafafa"
  neutral-100: "#f5f5f5"
  neutral-200: "#e5e5e5"
  neutral-300: "#d4d4d4"
  neutral-400: "#a3a3a3"
  neutral-500: "#737373"
  neutral-600: "#525252"
  neutral-700: "#404040"
  neutral-800: "#262626"
  neutral-900: "#171717"
  text-primary: "#171717"
  text-secondary: "#525252"
  text-muted: "#a3a3a3"
  border-light: "#ebebeb"
  border-medium: "#dddddd"
  overlay-dark: "rgba(0, 0, 0, 0.4)"
  overlay-light: "rgba(255, 255, 255, 0.1)"
  shadow-sm: "0 1px 2px rgba(0, 0, 0, 0.08)"
  shadow-md: "0 4px 12px rgba(0, 0, 0, 0.05)"
  shadow-lg: "0 20px 40px rgba(0, 0, 0, 0.2)"
  shadow-xl: "0 2px 16px rgba(0, 0, 0, 0.12)"

typography:
  font-family-sans: "Roboto, ui-sans-serif, system-ui, sans-serif"
  font-family-display: "Roboto, sans-serif"
  font-family-serif: "Noto Serif, serif"
  font-family-noto-serif: "Noto Serif, serif"

  hero-display:
    fontFamily: "Roboto, sans-serif"
    fontSize: 35px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0.1em
  hero-subtitle:
    fontFamily: "Noto Serif, serif"
    fontSize: 35px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.3em
    fontStyle: italic
  heading-xl:
    fontFamily: "Roboto, sans-serif"
    fontSize: 35px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0
  heading-lg:
    fontFamily: "Roboto, sans-serif"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  heading-md:
    fontFamily: "Roboto, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  heading-sm:
    fontFamily: "Roboto, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  body-lg:
    fontFamily: "Roboto, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body:
    fontFamily: "Roboto, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-sm:
    fontFamily: "Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-xs:
    fontFamily: "Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  button-label:
    fontFamily: "Roboto, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: 0
  label:
    fontFamily: "Roboto, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0
  caption:
    fontFamily: "Roboto, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0

rounded:
  none: 0px
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  2xl: 16px
  3xl: 24px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 32px
  xxxl: 48px
  section: 64px

components:
  navbar:
    backgroundColor: "{colors.white}"
    borderColor: "{colors.border-light}"
    height: 80px
    logoColor: "{colors.primary}"
  search-bar:
    backgroundColor: "{colors.white}"
    borderColor: "{colors.border-medium}"
    borderRadius: "{rounded.full}"
    height: 48px
    shadow: "{colors.shadow-sm}, {colors.shadow-md}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    typography: "{typography.button-label}"
    borderRadius: "{rounded.full}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    typography: "{typography.button-label}"
    borderRadius: "{rounded.full}"
    padding: 12px 24px
  button-icon:
    backgroundColor: "transparent"
    iconColor: "{colors.white}"
    size: 40px
    borderRadius: "{rounded.full}"
  card-listing:
    backgroundColor: "{colors.white}"
    borderRadius: "{rounded.xl}"
    shadow: "none"
  modal-overlay:
    backgroundColor: "rgba(0, 0, 0, 0.5)"
    backdropFilter: "blur(4px)"
  modal-content:
    backgroundColor: "{colors.white}"
    borderRadius: "{rounded.3xl}"
    shadow: "{colors.shadow-lg}"
  dropdown-menu:
    backgroundColor: "{colors.white}"
    borderRadius: "{rounded.2xl}"
    shadow: "{colors.shadow-xl}"
    borderColor: "{colors.border-light}"
  input-field:
    backgroundColor: "{colors.neutral-100}"
    borderColor: "transparent"
    borderRadius: "{rounded.lg}"
    typography: "{typography.body}"
  hero-overlay:
    backgroundColor: "{colors.overlay-dark}"
    backdropBlur: "none"
  frosted-glass:
    backgroundColor: "{colors.overlay-light}"
    backdropFilter: "blur(12px)"
    borderColor: "rgba(255, 255, 255, 0.2)"

---

## Overview

KHUBO is a **modern accommodation and roommate-finding platform** that combines the functionality of property booking services with intelligent matching systems. The design language emphasizes trust, clarity, and approachability through a carefully curated color palette, generous whitespace, and photography-forward layouts.

The visual identity centers on a deep navy blue (`{colors.primary}` — #17294F) as the primary brand color, conveying professionalism and reliability. A vibrant accent blue (`{colors.accent}` — #2252D6) provides interactive signals and highlights. The interface uses abundant white space, subtle borders, and smooth animations to create a polished, contemporary feel.

**Key Characteristics:**
- Deep navy primary (#17294F) establishes trust and professionalism
- Vibrant accent blue (#2252D6) for all interactive elements and highlights
- Clean, rounded geometry with pill-shaped buttons and soft card corners
- Hero sections feature dramatic photography with dark overlays for text legibility
- Frosted glass effects on floating UI elements (search bars, dropdowns)
- Smooth motion transitions using Motion library with accessibility considerations
- Responsive grid system adapting from mobile-first to wide desktop layouts
- Consistent 80px navbar height across all pages
- Interactive states use scale transforms and color shifts for feedback

## Colors

### Brand & Accent
- **Primary Navy** (`{colors.primary}` — #17294F): The core brand color used for logos, primary buttons, active states, and key interactive elements. Conveys trust, stability, and professionalism.
- **Primary Hover** (`{colors.primary-hover}` — #1e366a): Slightly lighter variant for hover states on primary-colored elements.
- **Accent Blue** (`{colors.accent}` — #2252D6): The action color for secondary buttons, icons in dropdowns, focus rings, and highlighted elements. More vibrant than the primary to draw attention.
- **Accent Hover** (`{colors.accent-hover}` — #1a41b8): Darker variant for hover states on accent-colored elements.

### Surface
- **Pure White** (`{colors.white}` — #ffffff): The dominant canvas for cards, modals, navbars, and content areas. Creates a clean, spacious feel.
- **Neutral 50** (`{colors.neutral-50}` — #fafafa): Subtle off-white for hover states on list items and secondary backgrounds.
- **Neutral 100** (`{colors.neutral-100}` — #f5f5f5): Input field backgrounds, light dividers, and subtle UI elements.
- **Neutral 200** (`{colors.neutral-200}` — #e5e5e5): Disabled states and secondary borders.

### Text
- **Neutral 900** (`{colors.neutral-900}` — #171717): Primary text color for headings and body copy. Near-black for high contrast.
- **Neutral 700** (`{colors.neutral-700}` — #404040): Secondary text for less prominent content.
- **Neutral 600** (`{colors.neutral-600}` — #525252): Body text in certain contexts, particularly on white backgrounds.
- **Neutral 500** (`{colors.neutral-500}` — #737373): Tertiary text, timestamps, and metadata.
- **Neutral 400** (`{colors.neutral-400}` — #a3a3a3): Placeholder text and muted labels.

### Borders & Dividers
- **Border Light** (`{colors.border-light}` — #ebebeb): Subtle dividers between sections, card borders in low-emphasis contexts.
- **Border Medium** (`{colors.border-medium}` — #dddddd): More visible borders for search bars, input fields, and elevated cards.

### Overlays & Shadows
- **Overlay Dark** (`{colors.overlay-dark}` — rgba(0, 0, 0, 0.4)): Hero section background overlay to ensure text legibility over photography.
- **Overlay Light** (`{colors.overlay-light}` — rgba(255, 255, 255, 0.1)): Frosted glass effect base for search bars and floating UI.
- **Shadow SM** (`{colors.shadow-sm}` — 0 1px 2px rgba(0, 0, 0, 0.08)): Subtle elevation for search bars and small UI elements.
- **Shadow MD** (`{colors.shadow-md}` — 0 4px 12px rgba(0, 0, 0, 0.05)): Medium elevation for cards and dropdowns.
- **Shadow LG** (`{colors.shadow-lg}` — 0 20px 40px rgba(0, 0, 0, 0.2)): Large elevation for modals and overlays.
- **Shadow XL** (`{colors.shadow-xl}` — 0 2px 16px rgba(0, 0, 0, 0.12)): Extra-large elevation for dropdown menus and popovers.

## Typography

### Font Families
- **Sans-Serif**: `Roboto, ui-sans-serif, system-ui, sans-serif` — The workhorse typeface for body copy, UI elements, and most interface text. Chosen for excellent readability and neutral character.
- **Display**: `Roboto, sans-serif` — Used for headlines and prominent text. Same family as sans-serif but applied at larger sizes with bolder weights.
- **Serif**: `Noto Serif, serif` — Reserved for elegant, editorial moments like the hero subtitle ("WELCOME TO"). Adds sophistication and contrast to the otherwise modern aesthetic.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 35px | 700 | 1.1 | 0.1em | Main hero title "KHUBO" |
| `{typography.hero-subtitle}` | 35px | 400 | 1.2 | 0.3em | Hero subtitle "WELCOME TO" (italic) |
| `{typography.heading-xl}` | 35px | 700 | 1.1 | 0 | Largest section headings |
| `{typography.heading-lg}` | 28px | 700 | 1.2 | 0 | Major section headings |
| `{typography.heading-md}` | 24px | 700 | 1.2 | 0 | Subsection headings |
| `{typography.heading-sm}` | 20px | 700 | 1.3 | 0 | Card titles, small sections |
| `{typography.body-lg}` | 18px | 400 | 1.5 | 0 | Large body copy, introductions |
| `{typography.body}` | 16px | 400 | 1.5 | 0 | Default body copy |
| `{typography.body-sm}` | 14px | 400 | 1.5 | 0 | Secondary text, descriptions |
| `{typography.body-xs}` | 12px | 400 | 1.5 | 0 | Captions, metadata |
| `{typography.button-label}` | 14px | 600 | 1.0 | 0 | All button labels |
| `{typography.label}` | 12px | 600 | 1.2 | 0 | Form labels, tags |
| `{typography.caption}` | 11px | 400 | 1.3 | 0 | Fine print, legal text |

### Principles

- **Bold headings, regular body**: All headings use weight 700 for strong visual hierarchy. Body text stays at 400 for comfortable reading.
- **Generous line-height**: Body text uses 1.5 line-height for excellent readability, especially important for property descriptions and user-generated content.
- **Letter-spacing for display**: The hero display text uses positive letter-spacing (0.1em) for an open, premium feel. The hero subtitle uses extreme letter-spacing (0.3em) for elegance.
- **Consistent sizing scale**: Typography follows a clear scale from 35px down to 11px, with no gaps or awkward jumps.
- **Weight 600 for emphasis**: Button labels and form labels use weight 600 to stand out without being as heavy as headings.

### Font Loading Strategy
- Roboto and Noto Serif are loaded from Google Fonts with specific weights (400, 500, 600, 700, 800, 900)
- Fallback stack uses `ui-sans-serif, system-ui` for fast initial paint
- Font display strategy relies on browser default (swap)

## Layout

### Spacing System
- **Base unit**: 4px. All spacing values are multiples of 4px for consistent rhythm.
- **Tokens**: `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 20px · `{spacing.xl}` 24px · `{spacing.xxl}` 32px · `{spacing.xxxl}` 48px · `{spacing.section}` 64px.
- **Section padding**: `{spacing.section}` (64px) between major page sections.
- **Card padding**: `{spacing.xl}` (24px) inside listing cards and utility cards.
- **Button padding**: 12px vertical, 24px horizontal for standard buttons.
- **Navbar padding**: Horizontal padding scales with breakpoint (xl:px-12, md:px-12, sm:px-4, px-4).

### Grid & Container
- **Max content width**: 2520px for ultra-wide displays, with responsive padding (xl:px-12, md:px-12, sm:px-4, px-4).
- **Column patterns**:
  - Desktop: 4-5 column grid for listing cards
  - Tablet: 2-3 column grid
  - Mobile: Single column stack
- **Gutters**: 24-32px between cards in grids.

### Whitespace Philosophy
KHUBO uses generous whitespace to create a sense of luxury and trust. Cards breathe with ample padding, sections are clearly separated, and interactive elements have room to be tapped comfortably. The hero section occupies significant viewport real estate (22vh on mobile, 45vh on desktop) to establish mood and brand presence.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Base surface, navbar background |
| Subtle border | 1px `{colors.border-light}` | Section dividers, card separators |
| Light shadow | `{colors.shadow-sm}` + `{colors.shadow-md}` | Search bar, floating elements |
| Medium shadow | `{colors.shadow-md}` | Dropdown menus, elevated cards |
| Heavy shadow | `{colors.shadow-lg}` | Modals, overlays |
| Extra shadow | `{colors.shadow-xl}` | Dropdown menus with border |

**Shadow philosophy.** KHUBO uses shadows strategically to indicate interactivity and hierarchy. The search bar uses a dual-shadow system for a floating effect. Modals use heavy shadows to separate from the background. Listing cards typically have no shadow by default, gaining elevation on hover.

### Decorative Effects
- **Frosted glass**: The hero search bar uses `backdrop-blur-md` with semi-transparent white background for a modern, layered feel.
- **Dark overlay**: Hero sections use `bg-black/40` overlay on photography to ensure text legibility.
- **Smooth transitions**: All interactive elements use transition classes for hover, focus, and active states.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Rarely used; decorative lines |
| `{rounded.xs}` | 2px | Minimal rounding on small elements |
| `{rounded.sm}` | 4px | Input fields, small buttons |
| `{rounded.md}` | 6px | Checkboxes, small UI elements |
| `{rounded.lg}` | 8px | Standard buttons, input fields |
| `{rounded.xl}` | 12px | Listing cards, modal inner elements |
| `{rounded.2xl}` | 16px | Modal containers, dropdown menus |
| `{rounded.3xl}` | 24px | Large modals, hero elements |
| `{rounded.full}` | 9999px | Pill buttons, circular icons, search bar |

### Photography Geometry
- **Hero imagery**: Full-bleed background images with aspect ratios around 16:9 or wider. Always overlaid with `{colors.overlay-dark}` for text legibility.
- **Listing cards**: Square or 4:3 aspect ratio thumbnails with `{rounded.xl}` (12px) radius.
- **User avatars**: Circular crops using `{rounded.full}`.
- **Modal imagery**: Rounded corners at `{rounded.sm}` or `{rounded.md}` within modal content.

## Components

### Navigation

**`navbar`** — Persistent top navigation bar. Background `{colors.white}`, height 80px, bottom border 1px `{colors.border-light}`. Contains logo (left), search bar (center), user menu (right). On mobile, maintains full height with adjusted padding. Logo is SVG or PNG, colored in `{colors.primary}`. User menu dropdown appears on click with smooth animation.

**Search Bar in Navbar** — Located center of navbar. Background `{colors.white}`, border 1px `{colors.border-medium}`, rounded `{rounded.full}`, height 48px. Dual-shadow system (`{colors.shadow-sm}`, `{colors.shadow-md}`) creates floating effect. Contains three segments: "Anywhere", "Any week", "Add guests" with search icon button. Focus state shows 2px ring in `{colors.primary}`.

### Buttons

**`button-primary`** — Primary action button. Background `{colors.primary}`, text `{colors.white}`, typography `{typography.button-label}` (14px/600), rounded `{rounded.full}`, padding 12px × 24px. Used for main CTAs like "Search", "Book Now", "Add to Bag". Hover state uses `{colors.primary-hover}`. Active state uses `transform: scale(0.95)`.

**`button-secondary`** — Secondary action button. Background transparent, text `{colors.text-primary}`, border 1px `{colors.border-medium}`, same typography and shape as primary. Used for actions like "Learn More", "Cancel".

**`button-icon`** — Icon-only button for utilities. Background transparent, icon color context-dependent, size 40×40px, rounded `{rounded.full}`. Used for language selector, announcements, menu triggers. Hover state gains `{colors.neutral-100}` background.

### Cards

**`card-listing`** — Property listing card. Background `{colors.white}`, rounded `{rounded.xl}`, no shadow by default. Contains image thumbnail (top, rounded), title, location, price, rating. Hover state may gain subtle shadow. Used in grid layouts on home, category, and search results pages.

**`modal-overlay`** — Modal backdrop. Background `rgba(0, 0, 0, 0.5)` with optional `backdrop-filter: blur(4px)`. Covers entire viewport, z-index above all content except topmost modals.

**`modal-content`** — Modal container. Background `{colors.white}`, rounded `{rounded.3xl}` (24px), shadow `{colors.shadow-lg}`. Contains header, body, footer sections. Max-width varies by modal type (typically 500-700px). Animates in with scale and opacity transition.

### Inputs & Forms

**`input-field`** — Standard text input. Background `{colors.neutral-100}`, border transparent (or 1px `{colors.border-medium}` on focus), rounded `{rounded.lg}` (8px), typography `{typography.body}`. Used in forms, search interfaces, filters. Focus state shows 2px ring in `{colors.accent}`.

**`dropdown-menu`** — Floating menu container. Background `{colors.white}`, rounded `{rounded.2xl}` (16px), shadow `{colors.shadow-xl}`, border 1px `{colors.border-light}`. Used for user menu, search suggestions, filter options. Animates in with clipPath and opacity transition.

### Overlays

**`hero-overlay`** — Hero section background overlay. Background `{colors.overlay-dark}` (rgba(0, 0, 0, 0.4)), no backdrop blur. Applied over hero photography to ensure text legibility. Does not affect centered content positioning.

**`frosted-glass`** — Frosted glass effect for floating UI. Background `{colors.overlay-light}` (rgba(255, 255, 255, 0.1)), backdrop-filter `blur(12px)`, border 1px `rgba(255, 255, 255, 0.2)`. Used for hero search bar, creating a modern layered effect.

### Specialized Components

**`search-dropdown`** — Search suggestions dropdown. Appears below hero search bar when active. Background `{colors.white}`, rounded `{rounded.2xl}`, shadow `{colors.shadow-lg}`. Contains categorized suggestions (locations, property types, amenities). Each suggestion is a clickable row with icon and label.

**`date-scroll-picker`** — Horizontal scrolling date picker. Used in hero dropdown for date selection. Shows dates in scrollable horizontal list with day names and dates. Selected state highlighted in `{colors.primary}`.

**`listing-modal`** — Property detail modal. Opens on listing card click. Contains photo gallery, title, description, amenities, host info, booking form. Scrollable content area with sticky booking button on mobile.

**`auth-modal`** — Authentication modal. Tabbed interface for Login/Signup. Email/password fields, social login options, terms acceptance checkbox. Rounded `{rounded.3xl}`, max-width ~450px.

**`create-listing-modal`** — Multi-step listing creation wizard. Steps: Photos, Details, Location, Pricing, Review. Progress indicator at top. Form fields with validation. Submit button disabled until required fields complete.

**`filters-overlay`** — Filter panel for search results. Slides in from right on mobile, appears as dropdown on desktop. Categories: Price range, Property type, Amenities, Dates, Instant book. Apply/Clear buttons at bottom.

**`roommate-card`** — Roommate profile card. Similar structure to listing card but optimized for person data. Shows photo, name, age, university, bio preview, compatibility tags. Click opens detailed modal.

**`toast-notification`** — Temporary notification banner. Appears at bottom or top of viewport. Background varies by type (success: green, error: red, info: blue). Auto-dismisses after 3-5 seconds. Contains message and optional action button.

**`footer`** — Page footer. Background `{colors.white}` or `{colors.neutral-50}`, top border 1px `{colors.border-light}`. Contains links (About, Careers, Press, Policies), social icons, copyright. Padding `{spacing.section}` (64px) vertical.

## Do's and Don'ts

### Do
- Use `{colors.primary}` (#17294F) for primary branding elements and key interactive components.
- Use `{colors.accent}` (#2252D6) for secondary actions, icons in dropdowns, and focus rings.
- Set hero typography with proper letter-spacing (0.1em for display, 0.3em for subtitle italic).
- Maintain 80px navbar height across all breakpoints (adjust internal padding instead).
- Use `{rounded.full}` for all pill-shaped buttons and circular elements.
- Apply dual-shadow system to search bar for signature floating effect.
- Use frosted glass effect on hero search bar for modern layered aesthetic.
- Ensure all interactive elements have visible focus states (2px ring in appropriate color).
- Use Motion library for smooth, accessible animations with reduced-motion support.
- Keep body text at 16px minimum for readability.

### Don't
- Don't introduce additional brand colors beyond the navy/accent blue palette.
- Don't use sharp corners where rounded would be appropriate (KHUBO is friendly, not severe).
- Don't remove the dark overlay from hero sections—text legibility is critical.
- Don't make buttons smaller than 44×44px touch target minimum.
- Don't use weight 500 for body text—stick to 400 for body, 600 for labels, 700 for headings.
- Don't add shadows to listing cards by default—reserve for hover states or special emphasis.
- Don't use pure black (#000000) for text—use `{colors.neutral-900}` (#171717) instead.
- Don't mix border radius values arbitrarily—use the defined scale consistently.
- Don't forget to implement reduced-motion alternatives for users who prefer it.
- Don't place critical information below the fold on mobile without visual cues.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | ≤ 640px | Single-column layouts, hamburger menu, condensed hero (22vh), search bar simplified |
| Tablet | 641–1023px | 2-3 column grids, full navbar visible, hero at intermediate height |
| Desktop | 1024–1439px | 4-5 column grids, full feature set, hero at 45vh |
| Wide Desktop | ≥ 1440px | Max content width 2520px, increased horizontal padding |

Tailwind breakpoint aliases used: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).

### Touch Targets
- Minimum 44×44px for all interactive elements (buttons, links, icons).
- Search bar segments are easily tappable on mobile with adequate padding.
- Dropdown menu items have generous vertical padding (py-2.5 to py-3).
- Modal close buttons are positioned for easy thumb access on mobile.

### Collapsing Strategy
- **Navbar**: Maintains 80px height on all screens. Logo scales down on mobile. User menu collapses to icon-only.
- **Hero**: Height reduces from 45vh (desktop) to 22vh (mobile). Typography scales from 35px to 20px. Search bar becomes single input with icon.
- **Search Dropdown**: Full multi-column on desktop, single-column stacked on mobile.
- **Listing Grid**: 5-col → 4-col → 3-col → 2-col → 1-col as viewport narrows.
- **Modals**: Full-screen on mobile with slide-up animation, centered dialog on desktop.
- **Filters**: Overlay panel on mobile (slides from right), inline dropdown on desktop.

### Image Behavior
- Hero images use `bg-cover bg-center` for consistent framing across breakpoints.
- Listing thumbnails use object-fit cover with aspect-ratio constraints.
- Lazy loading implemented for all below-fold images.
- Art direction may change at mobile (different crop or image entirely for hero).

## Iteration Guide

1. Reference component tokens directly (`{component.navbar}`, `{component.button-primary}`).
2. When adding new variants, follow existing naming conventions (`-hover`, `-active`, `-mobile`).
3. Use token references everywhere—never inline hex codes or magic numbers.
4. Document both default and active/pressed states. Hover states are optional.
5. Maintain the 400/600/700 weight ladder for body/labels/headings.
6. Test all new components at mobile, tablet, and desktop breakpoints.
7. Ensure WCAG AA contrast ratios for all text/background combinations.
8. When in doubt about spacing, use the defined scale rather than custom values.

## Known Gaps

- Dark mode implementation details not fully documented (ThemeToggle exists but design specs incomplete).
- Error states for form inputs not comprehensively documented across all components.
- Loading skeletons exist for listings and roommate cards but design tokens not formalized.
- Animation durations and easing curves not standardized as tokens (currently inline in Motion components).
- Accessibility audit findings and ARIA implementations vary by component maturity.
- Print stylesheets not implemented or documented.
- High-contrast mode support not addressed.
- Internationalization considerations (RTL layouts, text expansion) not documented.

---

*Last Updated: 2025*
*Maintained By: KHUBO Design & Development Team*