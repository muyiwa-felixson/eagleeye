/**
 * Constants and params for cloudant DB
 */

const COUCHDB_USERNAME = process.env.COUCHDB_USERNAME;
const COUCHDB_PASSWORD = process.env.COUCHDB_PASSWORD;
const COUCHDB_HOST = process.env.COUCHBASE_HOST;
const COUCHDB_URL = process.env.HOSTEDCOUCHURL;
const SECRET_KEY = process.env.SECRET_KEY;
const constants = {
  dburl: COUCHDB_URL || 'http://Administrator:password@localhost:5984',
  dbpassword: COUCHDB_PASSWORD,
  dbhost: COUCHDB_HOST,
  dbusername: COUCHDB_USERNAME,
  dbname: COUCHDB_HOST,
  secretKey: SECRET_KEY
};
module.exports = constants;
