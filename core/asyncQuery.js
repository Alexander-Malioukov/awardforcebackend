import dbConn from './dbConn';

const util = require('util');
require('util.promisify').shim();

const query = util.promisify(dbConn.query).bind(dbConn);

export default query;