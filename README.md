# NoryxUI

A borderless, cyber-glass UI framework built with pure CSS and vanilla JavaScript. Designed with a 3-tier surface contrast system, native Dark/Light themes with View Transitions radial ripple animation, a 12-column responsive grid, and 50+ interactive components and utilities.

- **Website:** https://x2nios.com
- **Documentation:** https://x2niosvn.github.io/NoryxUI/
- **Repository:** https://github.com/x2niosvn/NoryxUI

---

## Table of Contents

- [Quick Start](#quick-start)
- [CDN Links (GitHub)](#cdn-links-github)
- [Project Structure](#project-structure)
- [Features](#features)
- [JavaScript API](#javascript-api)
- [Browser Support](#browser-support)
- [License](#license)
- [Author](#author)

---

## Quick Start

Include the NoryxUI stylesheet and script in your HTML document. NoryxUI works seamlessly with FontAwesome 6 or Google Material Symbols for icons.

```html
<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>NoryxUI App</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/x2niosvn/NoryxUI@main/dist/noryxui.min.css" />
</head>
<body class="nx-grid">
  <div class="nx-ambient-glow"></div>

  <main class="nx-z1 nx-container nx-mt-4">
    <div class="nx-card nx-p-4">
      <h1 class="nx-h2">Hello, NoryxUI</h1>
      <button type="button" class="nx-btn nx-btn-primary" onclick="NoryxUI.toast({ title: 'Ready', type: 'success' })">
        Show Toast
      </button>
    </div>
  </main>

  <script src="https://cdn.jsdelivr.net/gh/x2niosvn/NoryxUI@main/dist/noryxui.min.js" defer></script>
</body>
</html>
```

---

## CDN Links (GitHub)

### jsDelivr (Recommended for Production)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/x2niosvn/NoryxUI@main/dist/noryxui.min.css" />
<script src="https://cdn.jsdelivr.net/gh/x2niosvn/NoryxUI@main/dist/noryxui.min.js" defer></script>
```

### GitHub Pages Direct

```html
<link rel="stylesheet" href="https://x2niosvn.github.io/NoryxUI/dist/noryxui.min.css" />
<script src="https://x2niosvn.github.io/NoryxUI/dist/noryxui.min.js" defer></script>
```

---

## Project Structure

```text
NoryxUI/
├── dist/
│   ├── noryxui.css          # Full unminified CSS framework
│   ├── noryxui.min.css      # Minified production CSS
│   ├── noryxui.js           # Full unminified JS runtime
│   └── noryxui.min.js       # Minified production JS
├── assets/
│   ├── fonts/               # Self-hosted Inter & JetBrains Mono woff2 fonts
│   ├── docs.css             # Documentation site layout styles
│   └── docs.js              # Documentation search, scrollspy & syntax highlighter
├── index.html               # Landing page & interactive playground
├── docs.html                # Full component & utility documentation (52 sections)
├── icons.html               # FontAwesome & Google Material Symbols integration guide
├── examples.html            # Pre-built dashboard, auth & sidebar templates
├── LICENSE
└── README.md
```

---

## Features

- **Zero Dependencies:** Pure CSS3 and Vanilla ES6+ JavaScript. No jQuery or build tooling required.
- **Borderless Surface System:** 3-tier background hierarchy (`--nx-bg`, `--nx-panel-bg`, `--nx-card-bg`) with soft elevation shadows instead of harsh borders.
- **Dark & Light Themes:** Built-in `[data-theme="dark"]` and `[data-theme="light"]` tokens with View Transitions API radial ripple switching.
- **Layout & Grid:** 12-column responsive Flexbox grid (`.nx-row`, `.nx-col-*`), CSS Grid utilities (`.nx-grid-cols-*`), Stacks, and Aspect Ratios.
- **Forms:** Text inputs, custom select dropdowns, custom datepicker portal, floating labels, input groups, adornments, searchable combobox, 6-digit OTP input, and live password strength meter.
- **Components:** Accordion, Alerts, Avatars, Badges, Banners, Breadcrumbs, Buttons, Cards, KPI Cards, Carousel, Filter Chips, Collapse, Dropdowns, Empty States, List Groups, Modals, Navbar, Offcanvas Drawers, Pagination, Popovers, Progress Bars, Scrollspy, Sidebar, Spinners, Skeletons, Steppers, Tabs, Toasts, and Portal Tooltips.

---

## JavaScript API

```js
// Theme management (supports View Transitions radial ripple from click event)
NoryxUI.theme.set("dark", event);
NoryxUI.theme.set("light", event);
NoryxUI.theme.toggle(event);

// Modals & Offcanvas
NoryxUI.modal.open("#myModal");
NoryxUI.modal.close("#myModal");
NoryxUI.offcanvas.open("#myDrawer");
NoryxUI.offcanvas.closeAll();

// Toast notifications
NoryxUI.toast({
  title: "Saved",
  message: "Your configuration has been updated.",
  type: "success", // "info" | "success" | "warning" | "danger"
  duration: 3500
});
```

---

## Browser Support

Supports all modern evergreen browsers (Chrome, Edge, Firefox, Safari) with graceful fallback where `document.startViewTransition` is unavailable.

---

## License

Released under the [MIT License](LICENSE).

---

## Author

Developed by **Nguyen Xuan Nam (X2NIOS)**

- Website: https://x2nios.com
- GitHub: https://github.com/x2niosvn
