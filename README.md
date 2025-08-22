# Superhero Database Web App

This project is a full-stack web application for managing a superhero database.  
You can create, edit, delete, and view superheroes, each with multiple images.

---

## Live Preview

  [Live Demo](https://superhero-delta.vercel.app/)

---

## Superhero Model

Each superhero has the following properties:

- **nickname**: e.g. "Superman"  
- **real_name**: e.g. "Clark Kent"  
- **origin_description**: Short story of the superhero’s origin  
- **superpowers**: List of abilities  
- **catch_phrase**: Memorable quote  
- **images**: Collection of images representing the superhero  

---

## Features

- **CRUD operations**: Create, edit, and remove superheroes  
- **Image management**: Upload multiple images, assign/remove images during create/edit  
- **Superhero listing**: Show nickname and one image per superhero with pagination (5 per page)  
- **Detailed view**: See full information and all images for a superhero  
- **Responsive layout**: Works well on desktop and mobile  
- **Smooth transitions**: For hover effects and UI interactions  

---

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL (managed with Prisma ORM)  
- **Build Tools:** Vite  
- **Other:** Lucide Icons for UI, Zustand for state management  

---

## Project Structure

```
root/
├─ backend/ # Express API, Prisma models, image uploads
├─ frontend/ # React components, forms, pages
└─ README.md # This file
```

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/koliiis/superhero
cd root
```

2. Set up environment variables:

  - Copy .env.example to .env

  - Configure database connection and other secrets

3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

5. Start backend server:

```bash
cd ../backend
npm run start
```

6. Start frontend:

```bash
cd ../frontend
npm run dev
```


- Backend default: http://localhost:3000

- Frontend default: http://localhost:5173

Both frontend and backend must be running simultaneously.