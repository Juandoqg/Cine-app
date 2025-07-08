
export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
   mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  jwt :{
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN
  }
});
