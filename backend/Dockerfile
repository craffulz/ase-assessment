# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración del paquete
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instala pnpm globalmente
RUN npm install -g pnpm

# Instala las dependencias
RUN pnpm install --frozen-lockfile

# Copia el código fuente
COPY . .



# Expone el puerto 8080
EXPOSE 8080

# Comando para iniciar la aplicación
CMD [ "node", "index.js" ]