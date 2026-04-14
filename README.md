# Employee Management System

A full-stack employee management system built with NestJS (backend) and Next.js (frontend).

## Tech Stack

- **Backend**: NestJS, TypeScript, Node.js
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Testing**: Jest
- **Linting**: ESLint, Prettier

## Features

- RESTful API for employee management
- Modern React frontend with TypeScript
- Responsive UI with Tailwind CSS
- Unit and e2e testing

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/usman1121/Employee-Management-System.git
   cd Employee-Management-System
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

### Backend (API Server)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the development server:
   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000` (or the port specified in your environment).

### Frontend (Web App)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

**Note**: If both servers try to use port 3000, you can change the backend port by setting the `PORT` environment variable:
```bash
PORT=4000 npm run start:dev
```

Then access the frontend at `http://localhost:3000` and API at `http://localhost:4000`.

### Running Both Services Concurrently

You can use a tool like `concurrently` or run them in separate terminals.

## Testing

### Backend Tests

```bash
cd backend
npm run test          # Run unit tests
npm run test:e2e      # Run e2e tests
npm run test:cov      # Run tests with coverage
```

### Frontend Tests

The frontend currently doesn't have tests configured, but you can add them using Jest and React Testing Library.

## Building for Production

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build
npm run start
```

## Project Structure

```
Employee-Management-System/
├── backend/              # NestJS API server
│   ├── src/
│   │   ├── app.controller.spec.ts
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/             # Next.js web application
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   └── components/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## API Endpoints

- `GET /` - Returns "Hello World!" (basic health check)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License.