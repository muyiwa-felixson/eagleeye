/**
 * @file - set up couchbase cluster 
 */

// third party imports 
const Couchbase = require('couchbase');

// local imports 
// N/A

// constants
const N1qlQuery = Couchbase.N1qlQuery;
const couchbaseHost = process.env.COUCHBASE_HOST;
const username = process.env.COUCHBASE_ADMINISTRATOR_USERNAME;
const couchbaseBucket = process.env.COUCHBASE_BUCKET;
const couchbasePassword = process.env.COUCHBASE_BUCKET_PASSWORD;
const couchbase = 'couchbase';
const bucket = (new Couchbase.Cluster( `${couchbase}://${couchbaseHost}`))
bucket.authenticate(username, couchbasePassword)
// Open bucket 
bucket.openBucket(couchbaseBucket);


// exports
module.exports = { 
    bucket,
    query: N1qlQuery
}