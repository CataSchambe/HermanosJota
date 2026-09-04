---
name: Artesanía & Ebanistería Cálida
colors:
  surface: '#fff8f6'
  surface-dim: '#e5d7d1'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1eb'
  surface-container: '#faebe5'
  surface-container-high: '#f4e5df'
  surface-container-highest: '#eee0d9'
  on-surface: '#211a17'
  on-surface-variant: '#54433c'
  inverse-surface: '#372f2b'
  inverse-on-surface: '#fdeee7'
  outline: '#87736b'
  outline-variant: '#dac1b8'
  surface-tint: '#934a27'
  primary: '#904825'
  on-primary: '#ffffff'
  primary-container: '#ae603b'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb596'
  secondary: '#7d5544'
  on-secondary: '#ffffff'
  secondary-container: '#fec9b3'
  on-secondary-container: '#795241'
  tertiary: '#006872'
  on-tertiary: '#ffffff'
  tertiary-container: '#28828c'
  on-tertiary-container: '#000607'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcd'
  primary-fixed-dim: '#ffb596'
  on-primary-fixed: '#360f00'
  on-primary-fixed-variant: '#753412'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#efbba6'
  on-secondary-fixed: '#2f1407'
  on-secondary-fixed-variant: '#623e2e'
  tertiary-fixed: '#9df0fb'
  tertiary-fixed-dim: '#81d3de'
  on-tertiary-fixed: '#001f23'
  on-tertiary-fixed-variant: '#004f56'
  background: '#fff8f6'
  on-background: '#211a17'
  surface-variant: '#eee0d9'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: 0.1em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 25.6px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  gutter-mobile: 1rem
  gutter-desktop: 2rem
  margin-mobile: 1.25rem
  margin-desktop: 3rem
---

## Brand & Style

This design system expresses the timeless dignity, structural precision, and sensory warmth of bespoke woodworking and artisanal furniture design. It speaks directly to design-conscious homeowners, architects, and interior curators who prioritize material authenticity, heirloom durability, and conscious craft over mass production.

The visual direction merges **Warm Editorial Minimalism** with structural joinery aesthetics:
- Generous breathing space framing tactile materials and furniture profiles.
- Uncompromising editorial typography celebrating classic proportion and craft heritage.
- A grounded, organic posture rooted in natural pigments: raw timbers, clay earth, drying sage, and burnished metal fittings.

## Colors

The palette balances warm earthen pigments with fresh botanical and mineral notes:

- **Terracotta Sólido (`#B1623D`)**: The primary brand pillar. Encapsulates aged teak, cherry wood, and warm terracotta. Used for primary CTAs, active highlights, major display titles, and authoritative boundary accents.
- **Marrón Arcilla (`#986D5B`)**: Secondary organic anchor. Represents FSC-certified forestry, sustainability attributes, botanical linings, and restorative status badges.
- **Gris Piedra (`#807570`)**: Foundational neutral surface. Provides a textured plaster-like canvas that eliminates the sterile chill of pure white, bathing product photography in natural afternoon light.
- **Teal Profundo (`#006F79`)**: Tertiary accent. Reserved for master craftsman emblems, premium certifications, rating stars, and refined brass hardware metaphors.

## Typography

The typographic tension pairs the architectural grace of high-contrast serif headlines with the crystalline utility of a modern grotesque:

- **Headlines (H1, H2, H3)**: Rendered strictly in **Playfair Display**, uppercase, tracked at `0.1em` (`letter-spacing: 0.1em`). Applied in Terracotta Sólido (`#B1623D`) or deep Umber (`#2B1D16`) to emulate bespoke catalog presswork.
- **Body Text**: Governed by **Inter Regular** (15px–16px / 11pt–12pt) with a line-height ratio of 1.6 for comfortable reading across furniture descriptions, dimension charts, and wood care essays.
- **Captions & Technical Subtitles**: Authored in **Inter Light** at 12px (9pt) with `0.02em` tracking for discreet serial numbers, wood provenance notes, and understated breadcrumb navigation.
- **Buttons & Interactive CTAs**: Executed in **Inter Medium**, uppercase, with deliberate `0.08em` tracking for crisp architectural balance across all actions.

## Layout & Spacing

This design system employs a structured 12-column grid system built on an 8pt architectural rhythm, maintaining calm proportion:

- **Desktop (1024px+)**: 12 columns with 32px (`2rem`) gutters and 48px (`3rem`) page margins. Max layout bounding box is locked at 1320px to preserve comfortable viewing distances.
- **Tablet (768px - 1023px)**: 8 columns with 24px (`1.5rem`) gutters and 32px (`2rem`) margins.
- **Mobile (320px - 767px)**: 4 columns with 16px (`1rem`) gutters and 20px (`1.25rem`) outer margins.
- **Spatial Principles**: Content breathes symmetrically. Vertical pacing across editorial sections requires substantial spacing (`space-2xl` to `space-3xl`) to establish high-end gallery framing around product silhouettes.

## Elevation & Depth

Visual hierarchy rejects heavy digital drop shadows, instead using material layering and low-contrast outlines reminiscent of physical carpentry:

- **Surface Tiers**: Base views sit on Soft Alabaster (`#FFF8F3`). Secondary cards and detail drawers use Warm Alabaster (`#E6D8C5`). Elevated sheets and interactive dropdowns rest on pristine off-white surfaces (`#FFFFFF`).
- **Joinery Borders**: Surfaces delineate their bounds via 1px low-contrast hairpins tinted in warm sand (`border: 1px solid #E6D3BF`).
- **Warm Ambient Shadow**: When modal or cart overlays require physical detachment, use a single diffused shadow tinted with warm umber rather than cold black:
  - `0 12px 32px -4px rgba(43, 29, 22, 0.08), 0 4px 12px -2px rgba(43, 29, 22, 0.04)`

## Shapes

The geometric form language adopts soft, precision-milled tolerances:

- Base radius is set to **Soft (`roundedness: 1` / 4px / `0.25rem`)**, reflecting finely sanded and finished timber edges.
- Cards, dialogue panes, and photo containers utilize subtle corner softening (4px to 8px max).
- Pill shapes are strictly forbidden; buttons, badges, and tags remain clean architectural blocks with slight bevel softening to sustain timeless craft maturity.

## Components

### Buttons & Interactive CTAs
- **Primary Button**: Solid Terracotta Sólido background (`#B1623D`), pure white text, Inter Medium uppercase typography (`letter-spacing: 0.08em`), 4px border radius. Padding: 14px 28px. Hover transition deepens tone to `#8c3b18`.
- **Secondary Button**: Marrón Arcilla fill (`#986D5B`) with crisp light-cream text, or transparent background with a 1px border in Terracotta Sólido (`#B1623D`) and matching text.

### Tags & Chips
- **Ecological & Sustainability**: Marrón Arcilla outline or soft tint (`#986D5B` with 12% opacity fill) with forest-green text and Inter Light 12px lettering.
- **Artisan / Premium Badges**: Teal Profundo text (`#006F79`) over Warm Alabaster with a delicate 1px brass border.

### Form Inputs & Text Areas
- Background filled with Alabastro Cálido (`#F5E6D3` at 40% tint) or `#FFFFFF`.
- 1px hairline perimeter in `#E6D3BF`.
- Focus state activates an outline in Terracotta Sólido (`#B1623D`) with zero shadow bloom.
- Input label set in Inter Regular (13px), placeholder text in `#807570` at 60% opacity.

### Selection Controls (Checkboxes & Radios)
- Box frame styled with a 1.5px border in Terracotta Sólido (`#B1623D`).
- Selected fill matches `#B1623D` with an off-white checkmark.
- Radio indicators employ an inset concentric circle in solid Terracotta Sólido.

### Product & Editorial Cards
- Flat surfaces constructed on Alabastro Cálido (`#F5E6D3`) or framed by 1px `#E6D3BF` rules.
- Image aspect ratio locked to 4:5 or 1:1 portrait crops with generous 16px internal padding.
- Title rendered in Playfair Display (uppercase, tracked), paired with price and dimensions displayed in Inter Light (12px).
- Star reviews rendered cleanly in Teal Profundo (`#006F79`).

### Dimension & Specification Tables
- Minimalist open borders: horizontal separation rules only (1px solid `#E6D3BF`).
- Headers formatted in Inter Medium (11px, uppercase, tracked `0.06em`).
- Cell content aligned in Inter Light (13px) with alternating rows faintly washed in Alabastro Cálido.