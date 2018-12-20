/**
 * @file represent the setup params for cloudant
 * create tables from config 
 */
const Cloudant = require('@cloudant/cloudant');
const Log = require('../utils/log');
const tables = require('../config/table');
const constants = require('./constants');
// CouchDB version 
const Couch = require('couch-db').CouchDB;

// GLOBAL VARIABLES TYPE
const G = {
    databases: [],
    tableNames: Object.keys(tables)
};

// Initialize cloudant object
// --------------------------------------------------------------------
/**
 *       Database OPERATIONS
 */
// --------------------------------------------------------------------
// Get all existing DB
const createTables = () => {
    // const cloudant = Cloudant(url);
    /** ***********************
     * COUCHDB IMPLEMENTATION
     *************************/
    const {
        dbhost,
        dbusername,
        dbpassword,
        dbname,
        dburl
    } = constants();
    const couch = new Couch(dburl);
    const nano = require('nano')(dburl);
    couch.auth(dbusername, dbpassword);



    return new Promise((resolve, reject) => {
        // cloudant.db.list((err, allDbs) => {

        /** ***********************
         * COUCHDB IMPLEMENTATION
         *************************/
        couch.allDbs((err, allDbs) => {
            if (err) {
                reject(err);
                throw new Error(` Error Could not get a list of database ${err}`);
            }
            G.databases = allDbs;
            G.tableNames.map((table, counter) => {
                const indexPosition = G.databases.indexOf(table);
                if (indexPosition < 0) {
                    const db = couch.database(table);
                    db.destroy((err) => {
                        if (err) {
                            Log.message('could not destroy db this is just a statement not an error ');
                            db.create((err, success) => {
                                if (err) {
                                    reject(`Could not create DB ${table}`);
                                } else {
                                    Log.message(`Created Table ${table} successfully`);
                                    const dataset = tables[table];
                                    const dbc = couch.database(table);
                                    dbc.searchByKeys(Object.keys(dataset.feilds), (err, created) => {
                                        if (err) {
                                            reject(`${err} - Could not created the index for table ${table}`);
                                        } else {
                                            Log.message(`Created searchByKeys  for table ${table}`);
                                            const nanoDb = nano.db.use(table);
                                                const indexDef = {
                                                    index: { [table]: Object.keys(dataset.feilds) },
                                                    name: table
                                                  };
                                                  nanoDb.createIndex(indexDef, (err, result) => {
                                                    Log.message(`Created index ${result} for table ${table}`);          
                                            });

                                            if (G.databases.length >= G.tableNames.length) {
                                                Log.info('Created all indexes and tables');
                                                resolve(true);
                                            }

                                        }
                                    });
                                }
                            });
                        }

                    });
                    if (G.databases.length >= G.tableNames.length) {
                        Log.info('Created all indexes and tables');
                        resolve(true);
                    }
                }
                if (G.databases.length >= G.tableNames.length) {
                    Log.info('All tables and index are already created');
                    resolve(true);
                }
            });

        });
    });
};
module.exports = createTables;