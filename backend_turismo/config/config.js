const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

module.exports = {
  port: process.env.PORT || 3000,
db: {
  name: process.env.DB_NAME || 'ciudad_monumento',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'test',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
},
secretKey: process.env.SECRET_KEY || "default_secret"

};
