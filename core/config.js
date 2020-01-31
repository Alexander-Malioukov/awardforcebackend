require('dotenv').config();

export const server = {
  isDev: !process.env.NODE_ENV || process.env.NODE_ENV === 'production',
  port: process.env.SERVER_PORT,
  portSsl: process.env.SERVER_PORT_SSL,
  baseUrl: process.env.SERVER_BASE_URL,
  name: process.env.SERVER_NAME,
  secret: process.env.SERVER_SECRET,
  sslKey: process.env.SERVER_SSL_KEY,
  sslCert: process.env.SERVER_SSL_CERT,
  sslCA: process.env.SERVER_SSL_CA,
};
export const mysql = {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    multipleStatements: true,
};
export const session = {
    name: process.env.SESSION_NAME,
    key: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
};
export const smtp = {
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    userinquilinos: process.env.SMTP_EMAILADDRESS,
    pass: process.env.SMTP_PASS,
};
export const dbTblName = {
    admins: process.env.DBTBLNAME_ADMINS,
    users: process.env.DBTBLNAME_USERS,
    seasons: process.env.DBTBLNAME_SEASONS,
    categories: process.env.DBTBLNAME_CATEGORIES,
    tabs: process.env.DBTBLNAME_TABS,
    fields: process.env.DBTBLNAME_FIELDS,
    content_blocks: process.env.DBTBLNAME_CONTENT_BLOCKS
};

export default {
    server,
    mysql,
    session,
    smtp,
    dbTblName
};