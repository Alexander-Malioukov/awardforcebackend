import mysql from 'mysql2';
import config from './config';

export default mysql.createPool(config.mysql);
