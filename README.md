# 3D Pizza Visualizer

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

Welcome to the **3D Pizza Visualizer**! This is a completely standalone frontend module originally extracted from the Pizza-Planet project. It provides a real-time, interactive 3D pizza building experience right in the browser.

When you select different crusts, sauces, cheeses, and toppings, the 3D pizza dynamically updates, creating a beautiful and appetizing visual experience for users!

## Features

- **Real-time 3D Rendering**: Built with `@react-three/fiber` and `@react-three/drei` for highly performant and stunning 3D graphics.
- **Interactive Scene**: You can drag the floating 3D window around the screen, zoom in to inspect the delicious toppings, and spin the pizza around!
- **State Management**: Uses **Zustand** for lightweight and incredibly fast reactive state management.
- **Beautiful UI**: Styled beautifully with the sleek new **Tailwind CSS v4** engine and animated with **Framer Motion**.
- **Deploy-Ready**: Absolutely zero backend dependencies. Everything is mock-data driven and ready to deploy straight to Vercel, Netlify, or GitHub Pages.

---

## Getting Started

Want to run this locally on your own machine? It takes less than 2 minutes!

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shadow-sama287/3js-3d-pizza-visualize.git
   cd 3js-3d-pizza-visualize
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser and start building your dream pizza!

---

## Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **3D Engine:** [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

---

## 💡 About this module

This repository was specifically modularized to highlight the intricacies and fun of **Three.js** inside React. It serves as an exact 1-to-1 clone of the Pizza Ordering Menu inside the fully stacked MERN application, allowing developers and designers to easily view the visualization code without navigating server logic, databases, or payment gateways.

Built with love by [Shadow-sama287](https://github.com/Shadow-sama287).
