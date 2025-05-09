<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en Dev

1. Clonar el Repositorio
2. Instalar Dependencias `npm install`
3. Clonar el `.env.template`, renombrar a `.env` y completar las variables de entorno
4. Iniciar la Base de Datos `docker compose up -d`
5. Generar el Prisma Client `npx prisma generate`
6. Ejecutar el proyecto `npm run start:dev`