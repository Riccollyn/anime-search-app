# Anime Search App

## Overview

The Anime Search App is a React-based application that allows users to search for anime and view detailed information about selected titles. It utilizes the Jikan API to fetch anime data and provides a user-friendly interface for browsing and discovering new anime.

## Features

- **Instant Search**: Users can search for anime titles without needing to press Enter or click a button. The search bar implements debouncing to optimize API calls.
- **Detailed View**: Users can click on an anime title to view detailed information on a separate page.
- **Pagination**: The search results are paginated, allowing users to navigate through multiple pages of results.
- **Responsive Design**: The application is designed to be mobile-friendly, ensuring a good user experience across devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Redux**: A state management library for managing application state.
- **React Router**: A library for routing in React applications.
- **Jikan API**: A free API for accessing anime data.

## Setup Instructions

To run the Anime Search App locally, follow these steps:

1. Clone the repository:
   
   git clone <repository-url>
   

2. Navigate to the project directory:
   
   cd anime-search-app
   

3. Install the dependencies:
   
   npm install
   

4. Start the development server:
   
   npm run dev
   

5. Open your browser and go to `http://localhost:4000` to view the application.

## Project Structure

anime-search-app
├── public
│   └── index.html
├── src
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── pages
│   │   ├── SearchPage.tsx
│   │   └── DetailPage.tsx
│   ├── components
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── AnimeCard.tsx
│   │   └── Pagination.tsx
│   ├── store
│   │   ├── index.ts
│   │   └── slices
│   │       └── searchSlice.ts
│   ├── services
│   │   └── api.ts
│   ├── hooks
│   │   ├── useDebouncedValue.ts
│   │   └── useAbortableFetch.ts
│   ├── routes
│   │   └── AppRoutes.tsx
│   ├── types
│   │   └── anime.ts
│   └── utils
│       └── debounce.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
├── PROMPTS.md
└── README.md


## Live Demo

You can view the live version of the Anime Search App at: [Live Demo URL]

## Bonus Implementation

This submission includes a few bonus improvements beyond the core requirements:

- UI library: integrated Bootstrap for consistent, responsive components and layout.
- Loading placeholders: added simple card placeholders while search results load.
- Empty states: helpful messages for initial state and no-results state.
- Responsive grid: results use a responsive Bootstrap grid that adapts to mobile and desktop.
- UX polish: clickable cards, improved header styling, and clearer pagination controls.

Additional implemented bonuses in this repo:

- Responsive, centered search bar and filter controls that adapt across screen sizes.
- Client-side "Type" filter (All / TV / Movie / OVA / Special) applied to current results page.
- Input persistence when navigating back: search query is restored from Redux so results persist when returning from the detail page.
- Documented AI prompts used in `PROMPTS.md`.