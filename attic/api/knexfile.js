module.exports = {
    development: {
      client: 'mysql',
      useNullAsDefault: true,
      connection: {
        host: 'localhost',
        user: 'cb_user',
        password: 'password',
        database: 'culture_blog_db'
      },
    },
  
    production: { //todo: make a real production env
      client: 'postgresql',
      connection: {
        database: 'example'
      },
      pool: {
        min: 2,
        max: 10
      }
    }
  };