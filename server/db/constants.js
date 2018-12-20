/**
 * Constants and params for cloudant DB 
 */

const CLOUDANTUSERNAME = process.env.CLOUDANTUSERNAME;
const COUCHDBPORT = process.env.COUCHDBPORT;
const CLOUDANTPASSWORD = process.env.CLOUDANTPASSWORD;
const CLOUDANTHOST = process.env.CLOUDANTHOST;
const CLOUDANTDBNAME = process.env.CLOUDANTDBNAME;
const COUCHDBHOST = process.env.COUCHDBHOST;
const COUCHDBUSERNAME= process.env.COUCHDBUSERNAME;
const COUCHDBPASSWORD = process.env.COUCHDBPASSWORD;
const COUCHDBNAME = process.env.COUCHDBNAME;

const constants =() => ({
    dburl: `http://${COUCHDBUSERNAME}:${COUCHDBPASSWORD}@${COUCHDBHOST}`,
   // dburl: `http://${COUCHDBHOST}`,
    dbpassword: COUCHDBPASSWORD,
    dbhost: COUCHDBHOST,
    dbusername:  COUCHDBUSERNAME,
    dbport: COUCHDBPORT,
    dbname: COUCHDBNAME
    // dburl: `https://${CLOUDANTUSERNAME}:${CLOUDANTPASSWORD}@${CLOUDANTHOST}`,
    // dbpassword: CLOUDANTPASSWORD,
    // dbhost: CLOUDANTHOST,
    // dbusername:  CLOUDANTUSERNAME,
    // dbport: CLOUDANTPORT,
    // dbname: CLOUDANTDBNAME
});
module.exports = constants;

