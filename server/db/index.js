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

// Open bucket 
// const bucket = cluster.openBucket(couchbaseBucket, function(err){
//     if (err){
//         console.error(err);
//     }
// });
const myOpts =  {
    authType: 'sasl',
    bucketType: 'couchbase',
    ramQuotaMB: 100,
    replicaNumber: 1,
    saslPassword: null,
    flushEnabled: null
  };
const manager = cluster.manager(username, couchbasePassword);
const bucket = manager.createBucket(couchbaseBucket, myOpts, (err)=>{
    console.log(`Could not create bucket, ${err}`)
})

// exports
module.exports = { 
    bucket,
    myOpts,
    cluster,
    query: N1qlQuery
}