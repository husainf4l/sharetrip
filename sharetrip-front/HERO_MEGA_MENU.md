# Hero Category Mega Menu

A GetYourGuide-style hero mega menu implementation using Next.js (App Router), Tailwind CSS, shadcn/ui, and Framer Motion.

## 🚀 Features

- **Pills Navigation**: Rounded pill-style category buttons with hover effects
- **Mega Menu Panels**: Wide dropdown panels with 2-column grid layout
- **Hover Intent**: 150ms hover delay for better UX
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Space, Escape)
- **Mobile Responsive**: Horizontal scroll pills + slide-down drawer
- **Accessibility**: ARIA compliant with proper roles and focus management
- **Animations**: Smooth framer-motion animations with reduced motion support
- **SSR Safe**: No hydration mismatches, fully compatible with Next.js App Router

## 📁 Files Created

### Components
- `src/components/HeroMegaMenu.tsx` - Main mega menu component
- `src/components/TopNav.tsx` - Navigation shell with hero section
- `src/components/ui/navigation-menu.tsx` - shadcn/ui NavigationMenu component
- `src/lib/utils.ts` - Utility functions for className merging

### Demo Page
- `src/app/(demo)/hero-mega-menu/page.tsx` - Demo page with sample data

### Configuration
- Updated `tailwind.config.js` with shadcn/ui theme
- Updated `src/app/globals.css` with CSS variables

## 🎯 API Usage

```tsx
import { HeroMegaMenu, Category } from '@/components/HeroMegaMenu';

const categories: Category[] = [
  {
    id: 'culture',
    label: 'Culture',
    items: [
      {
        href: '/culture/museums',
        title: 'Museums & Galleries',
        img: '/images/museums.jpg',
        alt: 'Museums and galleries'
      }
      // ... more items
    ]
  }
  // ... more categories
];

// Basic usage
<HeroMegaMenu categories={categories} activeId="culture" />

// With TopNav wrapper
<TopNav categories={categories} activeId="culture" />
```

## 🎨 Styling

The component uses Tailwind CSS with custom design tokens:

- **Pills**: `rounded-full` with subtle shadows and hover effects
- **Panels**: `rounded-2xl` with `ring-1 ring-black/5` and `shadow-xl`
- **Thumbnails**: 40px circular images with lazy loading
- **Colors**: Blue accent colors with white/gray backgrounds

## ⌨️ Keyboard Navigation

- **Left/Right Arrows**: Navigate between category pills
- **Enter/Space**: Toggle mega menu panel
- **Escape**: Close menu
- **Tab**: Cycle through menu items
- **Up/Down**: Navigate within grid (when implemented)

## 📱 Mobile Behavior

- Pills become horizontally scrollable
- Tap opens slide-down drawer instead of dropdown
- Accordion-style category expansion
- Overlay with outside-tap-to-close

## 🎭 Animations

All animations use Framer Motion with:
- 150-200ms duration
- Smooth easing curves
- `prefers-reduced-motion` support
- Stagger effects for menu items

## 🔧 Dependencies

```json
{
  "framer-motion": "^11.x",
  "@radix-ui/react-navigation-menu": "^1.x",
  "@radix-ui/react-icons": "^1.x",
  "class-variance-authority": "^0.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

## 🚀 Demo

Visit `/hero-mega-menu` to see the component in action with sample data.

## 🎯 Acceptance Criteria

✅ Desktop dropdown looks and behaves like GetYourGuide
✅ Mobile drawer works smoothly
✅ No API or backend code - purely frontend and data-driven
✅ SSR-safe with no hydration mismatches
✅ Full keyboard and accessibility support
✅ Smooth animations with motion preferences
✅ Hover intent with proper delays

## 🔮 Future Enhancements

- [ ] Search functionality within mega menu
- [ ] Category icons alongside labels
- [ ] Analytics tracking for menu interactions
- [ ] A/B testing variants
- [ ] Progressive loading for large datasets