# Postly – Social Media Dashboard

Postly is a responsive social media dashboard built using React. It allows users to explore posts, view post details, manage posts, and browse albums and photos through the JSONPlaceholder API.

## Features

- Dashboard to view posts and authors.
- Search posts by title and content.
- Filter posts by author.
- View complete post details and comments.
- Create and delete posts.
- Browse albums and photos.
- View photos in an image lightbox.
- Pagination for posts.
- Light and dark themes.
- Responsive design for different screen sizes.

## Tech Stack

- React
- Vite
- Tailwind CSS v4
- Axios
- React Router
- Lucide React
- JSONPlaceholder API

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/JaskaranCreator
```

### 2. Open the project folder

```bash
cd jassTalocity
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Build the project

```bash
npm run build
```

## API Used

Postly uses the JSONPlaceholder REST API.

Website: https://jsonplaceholder.typicode.com

Main API endpoints:

|        Endpoint       |        Purpose       |
|-----------------------|----------------------|
|       `/posts`        |       Get posts      |
|       `/users`        |       Get users      |
| `/posts/{id}/comments`|      Get comments    |
|      `/albums`        |       Get albums     |
| `/albums/{id}/photos` |       Get photos     |

Note: JSONPlaceholder is a testing API. Create and delete requests are simulated and are not permanently saved on the server.

## Project Structure

```text
src/
├── components/
│   ├── common/
│   ├── gallery/
│   ├── layout/
│   └── posts/
├── pages/
├── services/
├── App.jsx
├── main.jsx
└── index.css
```

## Design

Postly uses a soft Fairycore-inspired theme with lavender, pink, sage, and cream colors. It also supports dark mode.

## Future Improvements

- User authentication
- Permanent data storage
- Real-time notifications
- Advanced post management

## Author

**Jaskaran Singh**

B.Tech – Information Technology
