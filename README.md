<div align="center">

<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />

# KHUBO

**Accommodation & Roommate Finder Platform**

A modern, full-featured web application designed to help users find short-term accommodations, long-term rentals, and compatible roommates.

Built with React, TypeScript, and Tailwind CSS.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

</div>

---

## Features

### For Travelers & Renters
- **Browse Listings** - Explore accommodations categorized by type (apartments, houses, condos, etc.)
- **Interactive Maps** - View property locations on an interactive map with MapTiler integration
- **Advanced Filtering** - Filter listings by price, date, amenities, and location
- **Detailed Property Views** - Access comprehensive property information including photo galleries, amenities, host details, and reviews
- **Secure Booking Flow** - Streamlined modal-based booking interface
- **Search History** - Track your recent searches for quick access

### For Roommate Seekers
- **Smart Matching** - Find compatible roommates based on university, budget, location preferences, and lifestyle tags
- **Detailed Profiles** - View potential roommates' bios, preferences, and compatibility factors
- **Direct Communication** - Integrated messaging system to connect with potential roommates or hosts

### For Hosts
- **Listing Management** - Create, edit, and manage your property listings through an intuitive dashboard
- **Profile Customization** - Showcase your hosting experience, work background, and property details
- **Review System** - Build trust through authentic guest reviews and ratings

### User Experience
- **Authentication** - Secure sign-up and login functionality via Supabase
- **Dark/Light Mode** - Toggle between themes for comfortable viewing in any environment
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
- **Smooth Animations** - Polished UI transitions using Motion library with accessibility-conscious reduced motion support
- **Toast Notifications** - Real-time feedback for user actions

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn
- A [Gemini API key](https://ai.google.dev/) (for AI features)
- A [Supabase](https://supabase.com/) project (for authentication and database)
- A [MapTiler](https://www.maptiler.com/) API key (for maps functionality)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd khubo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with the following:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_MAPTILER_API_KEY=your_maptiler_api_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:3000`

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured listings and categories |
| `/listing/:id` | Detailed view of a specific property |
| `/category/:categoryId` | Browse listings by category |
| `/maps` | Interactive map view of all listings |
| `/messages` | User messaging inbox |
| `/roommate` | Roommate finder and matching interface |
| `/profile` | User profile and settings |
| `/manage-listings` | Host dashboard for managing properties |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint and TypeScript checks |
| `npm run lint:eslint` | Run only ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run clean` | Remove build artifacts |

---

## Tech Stack

### Frontend
- **React 19** - Latest version with concurrent features and improved hooks
- **React Router DOM 7** - Client-side routing with hash-based navigation
- **TypeScript 5.8** - Static typing for enhanced developer experience

### Build & Development
- **Vite 6.2** - Next-generation frontend build tool with HMR
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **ESLint 9** - JavaScript/TypeScript linting
- **Prettier 3.8** - Code formatting

### UI & Animation
- **Motion (Framer Motion)** - Production-ready animation library
- **Lucide React** - Beautiful, consistent icon set
- **clsx & tailwind-merge** - Conditional className utilities

### Backend & Services
- **Supabase** - Backend-as-a-Service for authentication and database
- **MapTiler SDK 4.0** - Interactive maps and geolocation services
- **Google Generative AI** - AI-powered features and recommendations

---

## Project Structure

```
khubo/
├── public/                    # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI components
│   │   ├── errors/          # Error boundary components
│   │   └── *.tsx            # Feature components
│   ├── pages/               # Route-level components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Core libraries and contexts
│   │   ├── api/             # API integration layer
│   │   ├── AuthContext.tsx   # Authentication provider
│   │   └── ThemeContext.tsx  # Theme provider
│   ├── mocks/               # Mock data for development
│   ├── data/                # Static data files
│   ├── types.ts             # TypeScript type definitions
│   ├── App.tsx              # Root component with routing
│   └── main.tsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── eslint.config.js         # ESLint configuration
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting, etc.)
refactor: Code refactoring
test:     Adding or updating tests
chore:    Maintenance tasks
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with AI Studio**

</div>
