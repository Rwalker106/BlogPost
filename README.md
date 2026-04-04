# Capstone Blog Platform

A lightweight, server-side rendered CRUD (Create, Read, Update, Delete) blog application built with Node.js, Express, and EJS. 

## Features
- **Create & Edit Posts:** Easily add new blog posts and modify existing ones with titles, content, authors, and cover image URLs.
- **Read & Pagination:** View truncated snippets of recent posts on the homepage or browse all posts with built-in pagination.
- **Delete Posts:** Effortlessly remove old or unwanted content.
- **Dynamic Routing:** Built with Express for lightweight and robust server-side API routing.
- **Local JSON Storage:** Data is persisted locally in `posts.json` for easy access and manipulation without requiring a complex database setup.
- **Responsive UI:** Styled with a blend of EJS layouts and Bootstrap for a clean and consistent user experience.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14 or higher recommended)

## Installation

1. Extract or clone this repository to your local machine.
2. Open your terminal and navigate to the project directory.
3. Install the necessary dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   node index.js
   ```
2. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```

## Technologies Used
- **Backend Environment:** Node.js, Express.js
- **Templating Engine:** EJS, express-ejs-layouts
- **Data Persistence:** Built-in File System (`fs`) to `posts.json`
- **Frontend Architecture:** HTML5, CSS3, Bootstrap

## Project Structure
- `index.js` - The main Express server establishing routes and app configuration.
- `posts.json` - The local mock database storing all your blog posts.
- `package.json` - Defines project metadata and lists required npm dependencies.
- `/views/` - Contains all EJS templates for rendering the HTML views (e.g., `index.ejs`, `edit.ejs`, `add.ejs`).
- `/public/` - Stores statically hosted files such as custom CSS styles, images, and client-side JavaScript.
