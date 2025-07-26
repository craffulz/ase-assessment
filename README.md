# ASE Athletics - Plataforma de Análisis de Fútbol
## Demostración en Vivo
- **Aplicación Frontend:** [Tu URL de frontend desplegado]
- **API Backend:** [Tu URL de backend desplegado]
- **Documentación de API:** [Swagger UI o URL de documentación]
## Resumen del Proyecto
[Breve descripción de tu implementación y características clave]
## Stack Tecnológico
### Frontend
- Framework: React.js
- Gestión de Estado: Redux 
- Estilos: Tailwind CSS / CSS
- Gráficos: Recharts
- Librerías adicionales: Vite, Zod
### Backend
- Runtime: Node.js
- Framework: Express 
- Base de Datos: PostgreSQL 
- Autenticación: JWT con bcrypt
- Validación: express-validator 
- Documentación: Swagger
### DevOps y Despliegue
- Host Frontend:  Vercel
- Host Backend: Google Cloud
- Host Base de Datos: Google Cloud
- Control de Versiones: Git con GitHub
## Configuración de Desarrollo Local
### Prerequisitos
```bash
Node.js (v16 o superior)
PostgreSQL
Git

# Clonar y navegar
git clone https://github.com/craffulz/ase-assessment

cd backend

# Instalar dependencias
pnpm install

# Configuración de entorno
cp .env.example .env

# Editar .env con tus credenciales de base de datos

# Configuración de base de datos
pnpm run db:create
pnpm run db:migrate
pnpm run db:seed

# Iniciar servidor de desarrollo
pnpm run dev

# Servidor corre en http://localhost:8080

# Navegar a frontend
cd frontend

# Instalar dependencias
pnpm install

# Configuración de entorno
cp .env.example .env

# Establecer REACT_APP_API_URL=http://localhost:5000

# Iniciar servidor de desarrollo
pnpm start

# Aplicación corre en http://localhost:5173

### Backend
- Runtime: Node.js
- Framework: Express
- Database: PostgreSQL
- Authentication: JWT with bcrypt
- Validation: express-validator 
- Documentation: Swagger 

### DevOps & Deployment
- Frontend Host: Vercel
- Backend Host: Google Cloud
- Database Host: Google Cloud
- Version Control: Git with GitHub