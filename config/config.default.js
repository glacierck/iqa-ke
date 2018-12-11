'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // 用于cookie签名密钥，应该改为私有的并保证安全
  config.keys = appInfo.name + '_1234567890123_4567';

  // 加载 errorHandler，notfoundHandler 中间件
  config.middleware = [ 'errorHandler', 'notfoundHandler' ];

  config.jwt = {
    secret: '123456',
    getToken(ctx) {
      if (
        ctx.headers.authorization &&
        (ctx.headers.authorization.split(' ')[0] === 'Bearer' ||
        ctx.headers.authorization.split(' ')[0] === 'Token')
      ) {
        return ctx.headers.authorization.split(' ')[1];
      } else if (ctx.query && ctx.query.token) {
        return ctx.query.token;
      }
      return null;
    },
  };

  exports.sequelize = {
    dialect: 'mysql',
    database: process.env.DB_DATABASE || 'iqadb',
    host: process.env.DB_HOST || '192.168.1.201',
    port: process.env.DB_PORT || '3306',
    username: process.env.DB_USER || 'nextai',
    password: process.env.DB_PASSWORD || 'zhiyan.580',
    timezone: '+08:00', // 东八时区
  };

  exports.security = {
    csrf: {
      enable: false,
    },
  };

  exports.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return config;
};
