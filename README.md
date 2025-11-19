# StratEdge - Multi-Page Site

A modern, high-performance website built with Astro, React, and Tailwind CSS.

## 🚀 Tech Stack

- **Astro** - Fast, modern static site builder
- **React** - Component library for interactive UI
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development

## 📁 Project Structure

```
src/
├── pages/           # Astro pages (auto-routed)
│   └── index.astro  # Landing page
├── components/      # Reusable components
│   ├── Navigation.astro
│   └── Hero.astro
├── layouts/         # Page layouts
│   └── Layout.astro
└── styles/          # Global styles
    └── global.css
```

## 🎨 Pages

- `/` - Landing page with hero section

## 🛠️ Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Adding New Pages

Create new `.astro` files in `src/pages/` directory. They will automatically be routed based on file name.

Example: `src/pages/about.astro` → `/about`

## 📦 Components

### Navigation
Fixed navigation bar with links to all main pages.

### Hero
Full-screen hero section with background image, heading, and CTA button.

## 🎯 Next Steps

- [ ] Create Service page
- [ ] Create Project showcase page
- [ ] Create Pricing page
- [ ] Create Career page
- [ ] Create About page
- [ ] Create Contact page
- [ ] Add footer component
- [ ] Implement contact form

## 📄 License

MIT
