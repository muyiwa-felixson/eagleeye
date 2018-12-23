/**
 * @file represent the setup params for cloudant
 * create tables from config 
 */
const Log = require('../utils/log');
const { tables } = require('../config/table');
// CouchDB version 
const Couch = require('couch-db').CouchDB;

// GLOBAL VARIABLES TYPE
const G = {
    databases: [],
    tableNames: tables
};

const dbusername = process.env.HOSTEDCOUCH;
const dbpassword =  process.env.HOSTEDCOUCHPASSWORD;
const dburl = process.env.HOSTEDCOUCHURL;

// Initialize cloudant object
// --------------------------------------------------------------------
/**
 *       Database OPERATIONS
 */
// --------------------------------------------------------------------
// Get all existing DB
const createTables = () => {

    const couch = new Couch(dburl);
    const nano = require('nano')(dburl);
    couch.auth(dbusername, dbpassword);

    return new Promise((resolve, reject) => {
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
module.exports = { createTables };