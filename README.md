# 🧘‍♂️ Monktra – Personalized Content Dashboard

🚀 **Live Demo**: [https://monktra.netlify.app](https://monktra.netlify.app)  
📦 **Repository**: [TanmaySingh007/Monktra](https://github.com/TanmaySingh007/Monktra)

---

## 🌟 Overview

**Monktra** is a next-gen personalized content dashboard built with **React**, **Next.js**, and **TypeScript**. It aggregates news, entertainment, and social updates into a customizable, user-friendly interface. With features like dark mode, drag-and-drop layout, and persistent user preferences, Monktra redefines how you consume information — calm, clean, and in control.

---

## 🔧 Tech Stack

- ⚛️ **React 18**, **Next.js 14**, **TypeScript**
- 🎨 **Tailwind CSS**, **Framer Motion**, **ShadCN UI**
- 🗂 **Redux Toolkit**, **RTK Query**
- 🔍 **NewsAPI**, **TMDB (or mock)**, **Local Storage**
- 🧪 **Jest**, **React Testing Library**, **Cypress**
- 🌐 **Netlify** for deployment

---

## 🧩 Features

- 📰 Personalized content feed from multiple APIs
- 🎥 Movie/music recommendations from TMDB/Spotify
- 📱 Social post simulation (mock API support)
- 🌗 Dark mode with local preference saving
- 🖱️ Drag-and-drop content reordering
- 💾 User favorites & persistent settings
- 🔍 Debounced global search functionality
- 🔄 Infinite scrolling for dynamic content loading
- ✅ Modular component structure for scalability
- 🔐 (Optional) NextAuth.js for user auth

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/          # Layout, Header, Sidebar
│   ├── Feed/               # ContentCard, FeedControls, PersonalizedFeed
│   ├── Favorites/          # Favorite section
│   ├── Search/             # SearchResults
│   ├── Settings/           # User Preferences
│   ├── Trending/           # Trending content
│   ├── ui/                 # Reusable UI components
│   └── ...
├── hooks/                  # Custom hooks (debounce, toast, etc.)
├── lib/                    # Utility functions
├── pages/                  # Next.js routes (HomePage, NotFound)
├── store/                  # Redux Toolkit slices and API logic
└── public/                 # Static assets
```

---

## 🛠️ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/TanmaySingh007/Monktra.git
cd Monktra

# 2. Install dependencies
npm install

# 3. Set up environment variables
touch .env.local
# Add your API keys in this file

# 4. Run locally
npm run dev
```

---

## 🔑 .env.local (Example)

```
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

---

## 🧪 Run Tests

```bash
# Unit and integration tests
npm run test

# End-to-end tests (Cypress)
npm run cypress:open
```

---

## 🧠 Inspiration

> “Monktra” is derived from *Monk* + *Mantra* — symbolizing a serene, focused space for mindful content consumption. It’s a dashboard that aligns with your curiosity without overwhelming your mind.

---

## 🌍 Deployment

This project is live on **Netlify**  
🔗 [https://monktra.netlify.app](https://monktra.netlify.app)

---

## 📌 Roadmap

- [ ] Real-time social feed with WebSockets
- [ ] Full authentication with user profiles
- [ ] Multi-language i18n support
- [ ] Enhanced accessibility (WCAG compliance)

---

## 🙌 Acknowledgements

- [NewsAPI](https://newsapi.org/)
- [TMDB API](https://www.themoviedb.org/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

Licensed under the MIT License © 2025 [Tanmay Singh](https://github.com/TanmaySingh007)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repo and submit a pull request. 🛠️
