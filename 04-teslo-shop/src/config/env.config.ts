export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  application: {
    name: process.env.APP_NAME || 'Teslo Shop',
    version: process.env.APP_VERSION || '1.0.0',
    port: process.env.PORT || 3000,
    host: process.env.HOST_API || 'http://localhost:3000'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default',
    expiresIn: process.env.JWT_EXPIRES_IN || '60s'
  },
  postgreSQL: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pagination: {
    limit: process.env.PAGINATION_DEFAULT_LIMIT || 10,
    offset: process.env.PAGINATION_DEFAULT_OFFSET || 0,
  }

});

