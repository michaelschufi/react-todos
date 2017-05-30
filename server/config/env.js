'use strict';

const env = {
  PORT: process.env.PORT || 3001,
  DATABASE_STORAGE: process.env.DATABASE_STORAGE || 'db.sqlite',
  DATABASE_NAME: process.env.DATABASE_NAME || 'react-todos',
  DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'root',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'toor',
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'sqlite',

  NODE_ENV: process.env.NODE_ENV || 'development',
};

module.exports = env;