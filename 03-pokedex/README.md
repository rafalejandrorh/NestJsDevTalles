<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en Desarrollo

1. Instalar NestJs CLI
```
npm i -g @nestjs/cli
```
2. Clonar el repositorio
3. Ejecutar 
```
npm i / yarn install
```
4. Iniciar Base de Datos
```
docker compose up -d
```

5. Clonar el archivo __.env.example__ y renombrar a __.env__
6. Completar las variables de entorno definidas en el archivo ```.env```
7. Ejecutar la Aplicación en Dev;
```
npm run start:dev
```

8. Insertar Semillas en la Base de Datos
```
http://localhost:3000/api/seed
```

# Ejecutar en Producción

1. Crear el archivo ```.env.prod```
2. Completar las variables de entorno de producción
3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yml --env-file .env.prod up 
--build
```


## Stack Utilizado
* Docker
* MongoDB
* NestJs