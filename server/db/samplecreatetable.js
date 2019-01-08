/**
 * @file represent the setup params for cloudant
 * create tables from config
 */
const Log = require("../utils/log");
const { tables, fields } = require("../config/table");
const constants = require("./constants");
// CouchDB version
const Couch = require("couch-db").CouchDB;
const { dburl, dbhost, dbusername, dbpassword } = constants;
console.log(dburl, "=================================================> dburl");
const nano = require("nano")({
  url: dburl,
  requestDefaults: {
    pool: {
      maxSockets: Infinity
    }
  }
});

// GLOBAL VARIABLES TYPE
const G = {
  databases: [],
  tableNames: tables
};

const createTables = () => {
  const couch = new Couch(dburl);
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
      const dbPromise = G.tableNames.map((table, counter) => {
        const indexPosition = G.databases.indexOf(table);
        if (indexPosition < 0) {
          const db = couch.database(table);
          db.destroy(err => {
            if (err) {
              console.log(
                "could not destroy db this is just a statement not an error "
              );
              db.create((err, success) => {
                if (err) {
                  return Promise.reject(false);
                } else {
                  console.log(`Created Table ${table} successfully`);
                  const dbc = couch.database(table);
                  const indexPar = fields[table];
                  if (indexPar) {
                    dbc.searchByKeys(Object.keys(indexPar), (err, created) => {
                      if (err) {
                        return Promise.reject(false);
                      } else {
                        console.log(
                          indexPar,
                          "index par and par at oldy created"
                        );
                        const nanoDb = nano.db.use(table);
                        const indexDef = {
                          index: { [table]: Object.keys(indexPar) },
                          name: table
                        };
                        nanoDb.createIndex(indexDef, (err, result) => {
                          if (err) {
                            console.error(err);
                            return promise.reject(false);
                          } else {
                            console.log(
                              `Created Index ${result} for table ${table}`
                            );
                            return Promise.resolve(true);
                          }
                        });
                      }
                    });
                  }
                  G.databases.push(table);
                  console.log(
                    G.databases.length,
                    G.tableNames.length,
                    " length of the two"
                  );
                  //   if (G.databases.length >= G.tableNames.length) {
                  //     Log.info("Created all indexes and tables");
                  //     resolve(true);
                  //   }
                }
              });
            }
          });
        }
      });
      Promise.all(dbPromise)
        .then(values => {
          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};
module.exports = { createTables };
