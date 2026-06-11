# Technician Dashboard Components

A reusable, scalable component system for the technician dashboard with dynamic navigation, configurable header, and layout wrapper.

## Architecture Overview

```
TechnicianDashboardLayout (wrapper)
├── TechnicianSidebar (dynamic nav)
├── TechnicianHeader (configurable)
└── Page Content (children)
```

## Components

### 1. **TechnicianDashboardLayout** 
Main wrapper component for all technician dashboard pages.

**Location:** `TechnicianDashboardLayout.tsx`

**Usage:**
```tsx
import { TechnicianDashboardLayout } from '@/components/dashboard/technician';

export default function MyPage() {
  return (
    <TechnicianDashboardLayout
      headerProps={{
        userName: 'John Doe',
        isOnline: true,
        unreadNotifications: 2,
        onOnlineToggle: (isOnline) => console.log(isOnline),
      }}
    >
      {/* Your page content here */}
    </TechnicianDashboardLayout>
  );
}
```

**Props:**
- `children` - Page content to render
- `headerProps` (optional) - Configuration for TechnicianHeader

---

### 2. **TechnicianHeader**
Sticky header with online status toggle, notifications, and user profile.

**Location:** `TechnicianHeader.tsx`

**Features:**
- ✅ Welcome message with current date
- ✅ Online/offline toggle with state management
- ✅ Notification bell with unread count
- ✅ User profile avatar (with Next.js Image)
- ✅ Responsive design

**Props:**
```typescript
interface TechnicianHeaderProps {
  userName?: string;                    // Default: 'Vikram'
  userImage?: string;                   // Avatar URL
  isOnline?: boolean;                   // Default: true
  onOnlineToggle?: (isOnline: boolean) => void;  // Toggle callback
  unreadNotifications?: number;          // Default: 0
}
```

**Example:**
```tsx
<TechnicianHeader
  userName="Rajesh Kumar"
  userImage="https://example.com/avatar.jpg"
  isOnline={true}
  unreadNotifications={3}
  onOnlineToggle={(online) => updateStatus(online)}
/>
```

---

### 3. **TechnicianSidebar**
Dynamic sidebar with intelligent route highlighting and configurable navigation.

**Location:** `TechnicianSidebar.tsx`

**Features:**
- ✅ Dynamic route highlighting (uses `usePathname`)
- ✅ Navigation driven by config array
- ✅ Support/Help section
- ✅ Responsive fixed positioning

**How It Works:**
Navigation items are pulled from `navigationConfig.ts`. The sidebar automatically highlights the active route by:
1. Exact match for dashboard home (`/dashboard/technician`)
2. Prefix match for sub-pages (`/dashboard/technician/*`)

**Adding New Menu Items:**
Edit `/src/constants/technician/navigationConfig.ts`:

```typescript
export const technicianNavigationConfig: NavigationItem[] = [
  // Existing items...
  {
    id: 'settings',          // Unique ID
    label: 'Settings',       // Display name
    href: '/dashboard/technician/settings',  // Route
    icon: 'settings',        // Material icon name
    section: 'main',         // Section: 'main' or 'support'
  },
];
```

---

## Navigation Configuration

**File:** `/src/constants/technician/navigationConfig.ts`

```typescript
export interface NavigationItem {
  id: string;                 // Unique identifier
  label: string;              // Display text
  href: string;               // Route URL
  icon: string;               // Material Symbol icon name
  section?: 'main' | 'support'; // Menu section
}
```

**Available Sections:**
- `'main'` - Primary navigation menu
- `'support'` - Support/Help section (future)

**Material Icons:** Use any icon from [Material Symbols](https://fonts.google.com/icons)

---

## Usage Examples

### Example 1: Dashboard Home Page
```tsx
'use client';

import { TechnicianDashboardLayout } from '@/components/dashboard/technician';

export default function DashboardHome() {
  return (
    <TechnicianDashboardLayout>
      <div className="space-y-6">
        <h2>Dashboard Content</h2>
        {/* Your content */}
      </div>
    </TechnicianDashboardLayout>
  );
}
```

### Example 2: Custom Header Props
```tsx
'use client';

import { TechnicianDashboardLayout } from '@/components/dashboard/technician';
import { useState } from 'react';

export default function CustomPage() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <TechnicianDashboardLayout
      headerProps={{
        userName: 'Vikram Singh',
        isOnline: isOnline,
        unreadNotifications: 5,
        onOnlineToggle: setIsOnline,
      }}
    >
      {/* Page content */}
    </TechnicianDashboardLayout>
  );
}
```

### Example 3: Adding a New Dashboard Page
1. Create folder: `/src/app/dashboard/technician/earnings/`
2. Create file: `page.tsx`
3. Add navigation item to config:

```typescript
{
  id: 'earnings',
  label: 'Earnings',
  href: '/dashboard/technician/earnings',
  icon: 'payments',
  section: 'main',
}
```

4. Use layout in page:

```tsx
'use client';

import { TechnicianDashboardLayout } from '@/components/dashboard/technician';

export default function EarningsPage() {
  return (
    <TechnicianDashboardLayout>
      <h1>Your Earnings</h1>
      {/* Content */}
    </TechnicianDashboardLayout>
  );
}
```

---

## File Structure

```
src/
├── components/
│   └── dashboard/
│       └── technician/
│           ├── TechnicianDashboardLayout.tsx
│           ├── TechnicianHeader.tsx
│           ├── TechnicianSidebar.tsx
│           ├── index.ts
│           └── README.md (this file)
├── constants/
│   └── technician/
│       └── navigationConfig.ts
└── app/
    └── dashboard/
        └── technician/
            ├── page.tsx
            └── profile/
                └── page.tsx
```

---

## Key Features

### ✅ Reusability
- Single layout component used across all technician dashboard pages
- No duplicate headers or sidebars
- DRY principle applied

### ✅ Maintainability
- Navigation items defined in one config file
- Adding menu items requires only config update
- Component logic is isolated and testable

### ✅ Scalability
- Easy to add new pages
- Support for additional features (notifications, settings)
- Extensible header and sidebar via props

### ✅ Active Route Highlighting
- Automatic highlighting based on current route
- Works with nested routes
- No manual state needed

---

## Future Enhancements

1. **Add dropdown menus** - Extend `NavigationItem` with `children` property
2. **Mobile sidebar** - Add hamburger menu and drawer
3. **Search functionality** - Add search in header
4. **Theme switcher** - Dark mode toggle in header
5. **Notifications panel** - Click bell to open notifications
6. **User menu** - Click avatar for user actions

---

## Styling

All components use **Tailwind CSS** with HiChandra design tokens:
- Colors: `primary`, `surface-white`, `text-primary`, etc.
- Typography: `font-headline-md`, `font-label-md`, etc.
- Spacing: Based on `base` unit (8px)

---

## Performance

- ✅ Uses Next.js `usePathname()` for route detection (no extra renders)
- ✅ Server-side image optimization with `next/image`
- ✅ Client-side state management for header toggle
- ✅ Fixed sidebar with sticky positioning

---

## Browser Support

- Chrome/Edge ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

---

## Troubleshooting

**Q: New navigation item not appearing?**
A: Make sure you added it to `navigationConfig.ts` and it's exported from the config.

**Q: Active highlight not working?**
A: Check the `href` matches your route exactly. Use `startsWith()` for prefixes.

**Q: Header not showing?**
A: Ensure you're using `TechnicianDashboardLayout` component wrapper.

**Q: Sidebar overlapping content?**
A: The layout uses `ml-64` (margin-left) to offset content. Verify CSS is applied.

---

## Notes

- All components are **client-side** (`'use client'`)
- Uses Material Symbols for icons
- Responsive breakpoints: `md:` prefix for medium screens
- Production-ready with TypeScript support
