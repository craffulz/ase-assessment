# ASE Athletics - Football Analysis Platform
## Live Demo
- **Frontend Application:** [\[Your deployed frontend URL\]](https://ase-assessment.vercel.app/)
- **Backend API:** [\[Your deployed backend URL\]](https://mi-app-7069258062.europe-southwest1.run.app/)
- **API Documentation:** [\[Swagger UI or documentation URL\]](https://mi-app-7069258062.europe-southwest1.run.app/api-docs/) Must be authenticated

## Project Overview
[A brief description of your implementation and key features]

## Technology Stack
### Frontend
- Framework: React.js
- State Management: Redux 
- Styling: Tailwind CSS / CSS
- Charts: Recharts
- Additional Libraries: Vite, Zod
### Backend
- Runtime: Node.js
- Framework: Express 
- Database: PostgreSQL 
- Authentication: JWT with bcrypt
- Validation: express-validator 
- Documentation: Swagger
### DevOps and Deployment
- Frontend Hosting: Vercel
- Backend Hosting: Google Cloud
- Database Hosting: Google Cloud
- Version Control: Git with GitHub
## Local Development Setup
### Prerequisites
```bash
Node.js (v16 or higher)
PostgreSQL
Git

# Clone and navigate
git clone https://github.com/craffulz/ase-assessment

cd backend

# Install dependencies
pnpm install

# Environment setup
cp .env.example .env

# Edit .env with your database credentials

# Database setup
pnpm run db:create
pnpm run db:migrate
pnpm run db:seed

# Start development server
pnpm run dev

# Server runs at
http://localhost:8080

# Navigate to frontend
cd frontend

# Install dependencies
pnpm install

# Environment setup
cp .env.example .env

# Set
REACT_APP_API_URL=http://localhost:3000

# Start development server
pnpm start

# App runs at
http://localhost:5173