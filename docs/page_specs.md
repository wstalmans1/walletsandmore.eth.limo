# Organization Details Page - UI Specification

## Overview

This document describes the **Organization Details Page** - a comprehensive, user-friendly interface for viewing and managing individual organization data within a blockchain-based DApp. The page features a two-column layout with contextual navigation, inline editing capabilities, real-time updates, and integrated debugging tools.

## Visual Layout

### High-Level Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Header (Global)                                              │
│ [DApp Title] [Test Devtools] ──────────── [Wallet Info]     │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│ Left Sidebar │ Main Content Area                           │
│ (Fixed 320px)│ (Flexible)                                  │
│              │                                              │
│ ┌──────────┐ │ ┌────────────────────────────────────────┐  │
│ │ Org Card │ │ │ Details Tab                           │  │
│ │ (Yellow) │ │ │                                        │  │
│ └──────────┘ │ │ • Name (editable)                      │  │
│              │ │ • Purpose (editable)                  │  │
│ Navigation   │ │ • Creator (read-only)                 │  │
│ • Details ✓  │ │ • Contract (read-only)                │  │
│ • Constitution│ │ • Debug & Refresh                     │  │
│ • Roles       │ └────────────────────────────────────────┘  │
│ • Partners (11)│                                              │
│ • History     │                                              │
│ • Home        │                                              │
│ • About       │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
│ WebSocket: Healthy | Quality: excellent (bottom right)      │
└─────────────────────────────────────────────────────────────┘
```

### Layout Specifications

- **Layout Type**: Two-column flex layout
- **Left Sidebar**: Fixed width `320px` (or `w-80` in Tailwind)
- **Main Content**: Flexible width, fills remaining space
- **Responsive**: Sidebar collapses/hides on mobile, content stacks vertically
- **Color Scheme**: Green gradient theme (`from-[#327045] to-[#338233]`)

---

## Component Breakdown

### 1. Left Sidebar

#### 1.1 Organization Overview Card

**Visual Design:**
- **Background**: Yellow/gold gradient (`from-british-racing-green to-rich-gold`)
- **Position**: Top of sidebar
- **Padding**: `p-6`
- **Border Radius**: `rounded-xl`

**Content Elements:**

1. **Icon & Title Section**
   - Building icon (SVG, `w-10 h-10`, white background with 20% opacity)
   - Organization name (bold, white text, `text-lg`)
   - Optional "Archived" badge (if organization is archived)

2. **Purpose/Description**
   - Multi-line text (`text-gray-50`, `text-sm`)
   - Displays organization's purpose from smart contract

3. **Contract Address**
   - Small monospace font (`text-[10px]`, `font-mono`)
   - Clickable link to blockchain explorer
   - White text with 90% opacity, hover effect

4. **Partner Status Indicator**
   - Shows "✓ You are a partner" if connected wallet is a partner
   - OR shows "Sign Constitution" button if not a partner
   - Conditional rendering based on `hasSignedConstitution` query

**Data Source:**
- `useOrganizationDetails(address)` hook
- `useHasSignedConstitution(address)` hook
- Smart contract read operations

#### 1.2 Navigation Menu

**Visual Design:**
- List of navigation items below the overview card
- Each item has an icon and label
- Active tab highlighted (red text color)
- Badge support for counts (e.g., "Partners (11)")

**Navigation Items:**
1. **Details** (active) - Document icon
2. **Constitution** - Document icon
3. **Roles** - People icon
4. **Partners** - User group icon + badge count
5. **History** - Clock icon
6. **Home** - House icon (navigates to `/`)
7. **About** - Information icon

**Implementation:**
- Tab state managed with `useState('details')`
- Icons as SVG components or icon library
- Click handlers update active tab and render corresponding component

---

### 2. Main Content Area - Details Tab

#### 2.1 Section Header

- **Title**: "Details"
- **Subtitle**: "Organization management and information"
- **Background**: Green gradient container (`from-[#327045] to-[#338233]`)
- **Padding**: `px-[5px] py-6`

#### 2.2 Editable Fields

**Name Field:**
- **Label**: "Name" (white, `text-lg font-medium`)
- **Display Mode**: Plain text (`text-white text-base`)
- **Edit Mode**: Text input with white/transparent styling
- **Edit Button**: Small text button next to label ("Edit" / "Cancel")
- **Submit Button**: "Register on Blockchain" (white/20% opacity background)
- **Validation**: Disabled if empty, wrong network, or user hasn't signed constitution
- **Loading State**: "Updating..." during transaction

**Purpose Field:**
- **Label**: "Purpose" (white, `text-lg font-medium`)
- **Display Mode**: Plain text (`text-white text-base`)
- **Edit Mode**: Textarea (3 rows) with same styling as name input
- **Edit Button**: Same pattern as name field
- **Submit Button**: Same pattern as name field
- **Validation**: Same constraints as name field

**Key Features:**
- Inline editing (no separate edit page)
- Form validation before submission
- Network and permission checks
- Real-time transaction status feedback
- Success overlay on completion

#### 2.3 Read-Only Fields

**Creator Field:**
- **Label**: "Creator" (white, `text-lg font-medium`)
- **Content**: Ethereum address (clickable, links to explorer)
- **Badge**: "You" badge if connected address matches creator
- **Styling**: Blue link color (`text-blue-300`), hover effect

**Contract Field:**
- **Label**: "Contract" (white, `text-lg font-medium`)
- **Content**: Organization contract address (clickable, links to explorer)
- **Styling**: Same as creator field

#### 2.4 Debug & Refresh Section

**Manual Refresh Button:**
- **Label**: "🔄 Manual Refresh"
- **Color**: Blue (`bg-blue-600`, hover: `bg-blue-700`)
- **Functionality**: 
  - Invalidates TanStack Query cache for organization details
  - Invalidates organization list caches
  - Triggers refetch of all related data
  - Console logging for debugging

**Debug Cache Button:**
- **Label**: "🐛 Debug Cache"
- **Color**: Gray (`bg-gray-600`, hover: `bg-gray-700`)
- **Functionality**: 
  - Links to `/debug/{organizationAddress}` page
  - Opens in new tab
  - Shows cache state, query keys, and invalidation tools

---

### 3. Global Elements

#### 3.1 Header (Shared Across All Pages)

**Left Side:**
- DApp title ("DamirOS DApp") - clickable, navigates to home
- "Test Devtools" button/link - developer tools access

**Right Side:**
- Wallet connection button (RainbowKit `ConnectButton`)
- Shows wallet balance, network, ENS name if available

#### 3.2 WebSocket Status Indicator

**Position**: Bottom right corner (fixed or absolute)
**Display**:
- "WebSocket: Healthy" (green pill)
- "Quality: excellent" (additional detail)
- Updates in real-time based on connection health

**Data Source**: Connection health monitoring hook

---

## Technical Implementation

### Required Dependencies

```json
{
  "wagmi": "^2.5.0",
  "viem": "^2.7.0",
  "@tanstack/react-query": "^5.85.5",
  "@rainbow-me/rainbowkit": "^2.0.0",
  "react-router-dom": "^6.20.0",
  "zustand": "^4.4.7",
  "tailwindcss": "^3.3.6"
}
```

### Key Hooks & Functions

#### Data Fetching

```typescript
// Fetch organization details (name, purpose, creator)
const { data: orgDetails, isLoading } = useOrganizationDetails(organizationAddress)

// Check if user has signed constitution (partner status)
const { data: hasSigned } = useHasSignedConstitution(organizationAddress)

// Get organization partners count
const { data: partners } = useOrganizationPartners(organizationAddress)
```

#### Mutations

```typescript
// Update organization name
const { updateName, isPending, isConfirming, isSuccess, error } = 
  useUpdateOrganizationName(organizationAddress)

// Update organization purpose
const { updatePurpose, isPending, isConfirming, isSuccess, error } = 
  useUpdateOrganizationPurpose(organizationAddress)
```

#### Real-Time Event Watching

```typescript
// Watch for name updates
useWatchContractEvent({
  address: organizationAddress,
  abi: organizationAbi(),
  eventName: 'NameUpdated',
  poll: false, // WebSocket only
  onLogs: () => {
    // Invalidate cache to trigger refetch
    queryClient.invalidateQueries({ /* ... */ })
  }
})

// Watch for purpose updates
useWatchContractEvent({
  address: organizationAddress,
  abi: organizationAbi(),
  eventName: 'PurposeUpdated',
  poll: false,
  onLogs: () => { /* invalidate cache */ }
})

// Watch for combined updates
useWatchContractEvent({
  address: organizationAddress,
  abi: organizationAbi(),
  eventName: 'NameAndPurposeUpdated',
  poll: false,
  onLogs: () => { /* invalidate cache */ }
})
```

### State Management

**Local Component State:**
- `isEditingName` / `isEditingPurpose` (boolean)
- `newName` / `newPurpose` (string)
- `showSuccessOverlay` (boolean)
- `successMessage` (string)
- `activeTab` (string) - for navigation

**Global State (Zustand):**
- Pending transaction state
- Modal management
- Connection health

**Server State (TanStack Query):**
- Organization details cache
- Partner status cache
- Partners list cache

### Cache Invalidation Strategy

**Scope Keys:**
- Details page: `orgDetails:{address.toLowerCase()}`
- List pages: `orgBatch:*`

**Invalidation Triggers:**
1. Manual refresh button click
2. Contract events (`NameUpdated`, `PurposeUpdated`, `NameAndPurposeUpdated`)
3. Successful mutation completion

**Implementation:**
```typescript
// Invalidate details page cache
queryClient.invalidateQueries({
  predicate: (q) => {
    const scopeKey = (q.queryKey[1] as any)?.scopeKey
    return scopeKey === `orgDetails:${address.toLowerCase()}`
  }
})

// Invalidate list page caches
queryClient.invalidateQueries({
  predicate: (q) => {
    const scopeKey = (q.queryKey[1] as any)?.scopeKey
    return scopeKey?.includes('orgBatch:')
  }
})
```

---

## User Interactions & Flow

### Editing Organization Name

1. **Initiate Edit:**
   - User clicks "Edit" button next to "Name" label
   - Input field appears with current value
   - "Edit" button changes to "Cancel"

2. **Edit Value:**
   - User types new name in input field
   - Submit button enabled when field has content

3. **Submit:**
   - User clicks "Register on Blockchain"
   - Wallet confirmation banner appears
   - Transaction overlay shows "Confirming..."
   - User approves transaction in wallet

4. **Processing:**
   - "Updating..." state on submit button
   - Transaction overlay shows "Processing..."
   - WebSocket event watcher detects `NameUpdated` event

5. **Success:**
   - Success overlay appears with checkmark
   - Cache invalidated, data refetched
   - Edit mode exits, new name displayed
   - Success overlay dismissible

6. **Error Handling:**
   - Error message displayed below input
   - Red error box with error details
   - User can retry or cancel

### Permission Checks

**Edit Capability Requires:**
1. ✅ Connected wallet
2. ✅ Correct network (chain ID match)
3. ✅ Signed constitution (`hasSigned === true`)
4. ✅ Non-empty input value

**Visual Feedback:**
- Disabled buttons when requirements not met
- Tooltip messages explaining restrictions
- Help text box when not signed

---

## Styling Guidelines

### Color Palette

**Primary Green Gradient:**
- Start: `#327045` (british-racing-green)
- End: `#338233` (rich-gold)

**Text Colors:**
- Primary text: `text-white`
- Secondary text: `text-gray-50` / `text-white/70`
- Links: `text-blue-300`, hover: `text-blue-200`
- Error: `text-red-200`

**Background Colors:**
- Card backgrounds: `bg-white/10` to `bg-white/20`
- Buttons: `bg-white/20`, hover: `bg-white/30`
- Error boxes: `bg-red-900/30` with `border-red-500/30`

### Typography

- **Headings**: `text-lg font-medium` or `text-xl font-bold`
- **Body text**: `text-base` or `text-sm`
- **Monospace**: `font-mono text-[10px]` for addresses

### Spacing

- **Section padding**: `px-[5px] py-6` (main container)
- **Field spacing**: `pb-4` between fields
- **Button gaps**: `gap-2` or `gap-3`

### Border Radius

- **Cards**: `rounded-xl`
- **Buttons**: `rounded-lg` or `rounded`
- **Inputs**: `rounded-lg`

---

## Accessibility Considerations

1. **ARIA Labels**: All interactive elements have proper labels
2. **Keyboard Navigation**: Forms support Enter to submit, Escape to cancel
3. **Focus States**: Visible focus rings on inputs and buttons
4. **Loading States**: Screen reader announcements for transaction states
5. **Error Messages**: Clear, descriptive error text
6. **Status Messages**: `aria-live="polite"` for wallet confirmation banners

---

## Real-Time Updates

### Event-Driven Cache Invalidation

The page listens for blockchain events and automatically updates:

1. **WebSocket Connection**: Established via Viem `PublicClient`
2. **Event Watchers**: Set up for `NameUpdated`, `PurposeUpdated`, `NameAndPurposeUpdated`
3. **Cache Invalidation**: Triggers refetch when events detected
4. **UI Update**: React Query automatically re-renders with new data

### Connection Health Monitoring

- **Indicator**: Bottom right corner
- **States**: Healthy / Unhealthy / Failed
- **Quality Metrics**: Excellent / Good / Poor
- **Auto-Recovery**: Automatic reconnection with exponential backoff

---

## Debugging Features

### Manual Refresh
- Invalidates all related caches
- Triggers immediate refetch
- Useful for testing or recovering from stale state

### Debug Cache Page
- Separate route: `/debug/{address}`
- Shows all query keys and cache state
- Allows manual cache invalidation
- Useful for development and troubleshooting

### Console Logging
- Transaction status updates
- Cache invalidation events
- Event watcher setup/teardown
- Connection health changes

---

## Component File Structure

```
src/
├── pages/
│   └── OrganizationDetail.tsx      # Main page component
├── components/
│   ├── DetailsTab.tsx              # Details tab content
│   ├── PartnersTab.tsx             # Partners tab content
│   ├── ConstitutionTab.tsx         # Constitution tab content
│   ├── Layout.tsx                  # Global layout wrapper
│   └── ui/
│       ├── TransactionOverlay.tsx  # Transaction status overlay
│       └── WalletConfirmationBanner.tsx
├── hooks/
│   ├── useOrganizationQueries.ts  # Data fetching hooks
│   └── useOrganizationMutations.ts # Mutation hooks
└── config/
    └── contracts.ts                # Contract ABIs and addresses
```

---

## Key Design Principles

1. **Inline Editing**: No separate edit pages - edit directly in context
2. **Progressive Disclosure**: Show edit controls only when needed
3. **Real-Time Updates**: WebSocket-driven updates without page refresh
4. **Clear Feedback**: Visual and textual feedback for all user actions
5. **Permission-Aware**: UI adapts based on user's permissions
6. **Developer-Friendly**: Built-in debugging tools and cache management
7. **Accessible**: Proper ARIA labels and keyboard navigation
8. **Responsive**: Works on desktop and mobile devices

---

## Implementation Checklist

- [ ] Set up two-column layout with fixed sidebar
- [ ] Create organization overview card component
- [ ] Implement navigation menu with active state
- [ ] Build editable name field with inline editing
- [ ] Build editable purpose field with inline editing
- [ ] Add read-only creator and contract fields
- [ ] Implement permission checks and validation
- [ ] Set up WebSocket event watchers
- [ ] Configure cache invalidation strategy
- [ ] Add transaction overlays and success states
- [ ] Create debug & refresh functionality
- [ ] Add WebSocket health indicator
- [ ] Implement error handling and user feedback
- [ ] Add accessibility features (ARIA, keyboard nav)
- [ ] Style with green gradient theme
- [ ] Test real-time updates and cache invalidation

---

## Notes for Implementation

1. **Smart Contract Requirements**: The organization contract must emit `NameUpdated`, `PurposeUpdated`, and `NameAndPurposeUpdated` events
2. **RPC Provider**: WebSocket support required for real-time event watching
3. **Cache Strategy**: Use TanStack Query with scope-based invalidation for efficient updates
4. **Transaction Handling**: Implement proper pending states and error recovery
5. **Network Detection**: Always check if user is on correct network before allowing edits

---

This specification provides a complete blueprint for recreating the Organization Details Page in another project. The design emphasizes user experience, real-time updates, and developer-friendly debugging tools while maintaining a clean, professional appearance.
