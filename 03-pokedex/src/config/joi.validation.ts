import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  APP_NAME: Joi.required().default('Nest Pokedex API'),
  APP_VERSION: Joi.required().default('1.0.0'),
  APP_PORT: Joi.number().default(3000),
  APP_URL: Joi.required().default('http://localhost:3000'),
  MONGODB_URI: Joi.required().default('mongodb://localhost:27017/mongo'),
  PAGINATION_DEFAULT_LIMIT: Joi.required().default(10),
  PAGINATION_DEFAULT_OFFSET: Joi.required().default(0),
});