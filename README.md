# 📚 Book Scribble

🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧

Warning, under construction.

👷‍♀️🧰 Expect creative chaos 🖌️👷‍♀️

🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧🚧

<div align="center">
**Your personal reading companion and journal**

[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-11.2.0-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.3-yellow?style=for-the-badge)](https://github.com/pmndrs/zustand)

</div>

## 🌟 Overview

Book Scribble is your all-in-one reading companion that helps you discover, track, and reflect on your reading journey. Search for books, maintain your personalized bookshelf, collect your favorite quotes, write reflections, and visualize your reading statistics - all in one beautiful interface.

## ✨ Features

### 📱 Core Features

-   **📖 Book Search** - Discover millions of books via Google Books API
-   **🔖 Bookshelf Management** - Organize your books into "Want to Read", "Currently Reading", and "Read" collections
-   **✏️ Reading Journal** - Save quotes, reflections, and memorable moments with page references
-   **📊 BookWrapped** - View personalized reading statistics and insights
-   **🔐 User Authentication** - Secure login with Google Authentication

### 📋 Bookshelf Organization

-   Track reading status (want to read, reading, read)
-   Add ratings and reviews
-   Mark books to read again
-   Filter and search your collection

### 📝 Writing & Reflection

-   Create and organize quotes from your books
-   Write personal reflections
-   Categorize and tag your content
-   Track page references

### 📈 Reading Statistics

-   Track books and pages read
-   See your fastest reads
-   Discover which books inspired the most reflections
-   Analyze reading trends over custom time periods

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm or yarn
-   Firebase account

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/book-scribble.git
    cd book-scribble
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:

    ```
    NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_APIKEY
    NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_AUTHDOMAIN
    NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_PROJECTID
    NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_STORAGEBUCKET
    NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_MESSAINGSENDERID
    NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_APPID
    NEXT_PUBLIC_FIREBASE_CLIENT_CONFIG_MEASUREMENTID
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    FIREBASE_ADMIN_CONFIG_PROJECT_ID
    FIREBASE_ADMIN_CONFIG_ADMIN_CLIENT_EMAIL
    FIREBASE_ADMIN_CONFIG_PRIVATE_KEY
    NEXT_PUBLIC_GOOGLE_CLIENT_ID

    ```

4. Run the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

### Frontend

-   **Next.js 15**
-   **React 19**
-   **Tailwind CSS**
-   **Shadcn/ui**
-   **Zustand**

### Backend & Services

-   **Firebase** - Authentication and database
-   **Google Books API** - Book search and metadata

## 📝 License

This project is licensed under the MIT License

## 🙏 Acknowledgements

-   Google Books API for providing book data
-   Next.js team for the amazing framework
-   Firebase for authentication and database services

<div align="center">
  <p>Made with ❤️ by Bonnie Möller</p>
</div>
