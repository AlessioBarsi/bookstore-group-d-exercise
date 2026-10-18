# The Quiet Page

A landing page for an independent bookstore built with React + Vite + Tailwind CSS v4. This project was built as an exercise for Mayerfeld Consulting Frontend Developer Practicum.

## Features

- Responsive navbar with mobile hamburger menu
- Split hero section with background image and overlay
- Product card grid with category filter dropdown
- Events section with book club and author meetup cards
- Favorite button (heart toggle) using inline SVG
- Footer with quick links, store info, and copyright

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4 (with `@tailwindcss/vite`)
- Custom CSS variables mapped to Tailwind via `@theme`

## Color Palette

| Variable | Hex | Usage |
| :--- | :---: | :--- |
| `--bg` | `#FCF0DA` | Main background (off-white) |
| `--ink` | `#000000` | Main text |
| `--primary` | `#769452` | Section backgrounds, accents |
| `--secondary` | `#EDC77B` | Buttons, events |
| `--dark` | `#4C4541` | Navbar, buttons |

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── ProductCard.jsx
│   ├── FavoriteButton.jsx
│   ├── Events.jsx
│   └── Footer.jsx
├── App.jsx
└── index.css
public/
├── images/
└── data/
    └── books.json
```