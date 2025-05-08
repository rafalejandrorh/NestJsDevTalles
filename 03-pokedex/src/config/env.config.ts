export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  application: {
    name: process.env.APP_NAME || 'Nest Pokedex API',
    version: process.env.APP_VERSION || '1.0.0',
    port: process.env.PORT || 3000,
  },
  mongoDB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo',
  },
  pagination: {
    limit: process.env.PAGINATION_DEFAULT_LIMIT || 10,
    offset: process.env.PAGINATION_DEFAULT_OFFSET || 0,
  }

});

