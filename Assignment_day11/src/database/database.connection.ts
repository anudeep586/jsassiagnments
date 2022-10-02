

import { Knex } from 'knex';


interface IKnexConfig {
  [key: string]: Knex.Config;
}

const configs: IKnexConfig = {
  development: {
    client:"postgres",
    connection: async () => {
        return {
          host : 'localhost',
          port : 5432,
          user : 'postgres',
          password : "1",
          database : 'koa',
          
        };
      },
    debug:true,
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'koa',
      user: 'postgres',
      password: '1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'users',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'koa',
      user: 'username',
      password: '1',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'users',
    },
  },
};

export default configs;