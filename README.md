# Todo Manager

A modern, full-stack todo application built with React, TypeScript, Node.js, and MongoDB.

## Features

- Create, read, update, and delete todos
- Dark/Light mode toggle
- Responsive design for all devices
- Real-time updates
- Mark todos as complete/incomplete
- Toast notifications for actions
- Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [<repository-url>](https://github.com/phonethantzaw/todo-manager.git)
cd todo-test
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
Create a `.env` file in the backend directory with the following:
```env
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
PORT=5001
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

3. (Optional) Seed the database with sample todos
```bash
cd backend
npm run seed
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5001

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Project Structure

```
todo-test/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   └── server.ts
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── types/
    │   └── App.tsx
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
