# Design Guidelines: Live Cricket Score Platform

## Design Approach

**System:** Material Design with inspiration from Cricbuzz and ESPN Cricinfo
**Rationale:** Information-dense sports application requiring efficient data display, real-time updates, and familiar patterns for quick comprehension. Material Design provides robust components for data-heavy interfaces while Cricbuzz's patterns inform cricket-specific layouts.

**Core Principles:**
- Information hierarchy over visual flair
- Speed and scannability prioritized
- Real-time data prominence
- Familiar sports UI patterns
- Green cricket heritage colors

---

## Color Palette

### Light Mode
- **Primary:** 139 65% 45% (Cricket green - headers, CTAs, live indicators)
- **Secondary:** 210 20% 30% (Slate - text, secondary elements)
- **Background:** 0 0% 98% (Off-white)
- **Surface:** 0 0% 100% (White cards)
- **Success:** 142 71% 45% (Winning team, positive stats)
- **Danger:** 0 84% 60% (Losing team, negative stats)
- **Live Accent:** 0 84% 60% (Pulsing red for live matches)

### Dark Mode
- **Primary:** 139 55% 55% (Lighter cricket green)
- **Secondary:** 210 15% 70% (Light slate)
- **Background:** 220 15% 10% (Deep charcoal)
- **Surface:** 220 13% 15% (Elevated cards)
- **Success:** 142 60% 50%
- **Danger:** 0 70% 60%
- **Live Accent:** 0 75% 55%

---

## Typography

**Families:**
- Primary: 'Inter' (Google Fonts) - body text, stats, commentary
- Display: 'Rajdhani' (Google Fonts) - scores, headlines, numbers

**Scale:**
- Hero Numbers: text-6xl font-bold (Live scores)
- Headlines: text-3xl font-semibold (Section headers)
- Subheadings: text-xl font-medium (Match titles)
- Body: text-base (Commentary, descriptions)
- Stats/Labels: text-sm font-medium uppercase tracking-wide
- Captions: text-xs (Timestamps, meta info)

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section gaps: space-y-6 to space-y-8
- Card margins: m-4
- Grid gaps: gap-4 to gap-6

**Container Strategy:**
- Max-width: max-w-7xl (Main content)
- Sidebar width: w-80 (Match list, rankings)
- Card padding: p-6
- Mobile padding: px-4

**Grid Layouts:**
- Match cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Player stats: grid-cols-2 md:grid-cols-4
- Tournament standings: Full-width table with sticky headers

---

## Component Library

### Navigation
- Sticky top navbar with green background
- Logo left, main nav center, auth/profile right
- Mobile: Hamburger menu
- Tabs for Live, Matches, Rankings, News sections

### Match Cards
- Compact card design (Cricbuzz-style)
- Team names and flags
- Large score display (Rajdhani font)
- Live indicator: Pulsing red dot + "LIVE" badge
- Match status: Upcoming (date/time), Recent (result summary)
- Quick stats: Overs, run rate, required run rate
- Card hover: Subtle shadow elevation

### Live Score Section
- Full-width hero-style scoreboard
- Team scores side-by-side
- Current batsmen with runs/balls
- Current bowler with figures
- Partnership info
- Ball-by-ball timeline below

### Commentary Feed
- Timeline layout with ball-by-ball entries
- Over numbers as separators
- Icon indicators: 4 (boundary), 6 (six), W (wicket)
- Commentary text in readable chunks
- Timestamp for each entry
- Auto-scroll to latest (with pause control)

### Player Dashboard
- Header with player photo, name, country flag
- Stats grid: Matches, Runs, Wickets, Average, Strike Rate
- Career timeline graph
- Recent form section (last 5 matches)
- Detailed statistics table (sortable)

### Tournament Section
- Tournament banner with logo
- Points table with sticky header
- Columns: Team, Played, Won, Lost, NRR, Points
- Color-coded positions (top 4 green tint)
- Schedule section with match cards
- Knockout bracket visualization (for playoffs)

### Polls
- Card with question
- Radio options with percentage bars
- Vote count display
- Results revealed after voting
- "Poll of the Day" highlight

### Forms (Auth)
- Clean, centered modal or page
- Input fields with labels above
- Primary green button
- "Login with Google/GitHub" social buttons
- Form validation with inline error messages

### Data Display
- Tables with alternating row colors
- Sticky headers on scroll
- Sortable columns (header click)
- Responsive: Stack on mobile
- Scorecard format: Partnership tables, fall of wickets

---

## Animations

**Minimal & Purposeful:**
- Live indicator: Gentle pulse animation (animate-pulse)
- Score updates: Brief highlight flash (green glow)
- Card hover: transition-shadow duration-200
- Tab switching: Subtle slide transition
- NO scroll-triggered animations
- NO parallax effects

---

## Images

**Hero Section:** No large hero image - prioritize live match scoreboard
**Player Profiles:** Circular headshots (w-24 h-24)
**Team Logos:** Small icons (w-8 h-8) next to team names
**Tournament Banners:** Wide format (16:4 ratio) at section tops
**Placeholder:** Use cricket-related stock photos or icon placeholders

---

## Key Patterns

**Information Density:** Pack more data intelligently - users want comprehensive stats at a glance
**Real-time Emphasis:** Live matches always prominent with pulsing indicators
**Scannability:** Strong typography hierarchy, color-coded data (wins green, losses red)
**Responsive Data:** Tables collapse to cards on mobile with key stats visible
**Consistent Padding:** Everything breathes with p-4 to p-6 standard spacing
**Match Status Colors:** Live (red), Upcoming (blue/gray), Recent (green/red based on result)