/**
 * @file represent the setup params for cloudant
 */

const constants = require("./constants");
const Log = require("../utils/log");
const schema = require("../config/table");
const Couch = require("couch-db").CouchDB;
const { dburl, dbhost, dbusername, dbpassword } = constants;
console.log(dburl, ' url is here');
const nano = require("nano")({
  url: dburl,
  requestDefaults: {
    pool: {
      maxSockets: Infinity
    }
  }
});
const couch = require("couch-db").CouchDB;

const { tables } = schema;
/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
const guid = () => {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
};

const checkDbValue = value => {
  if (tables.indexOf(value) < 0) {
    return false;
  }
  return true;
};

/**
 * @function safeCreateDoc create a doc safely if it doesnt exist in the table
 * replace if it exists
 * @param { string } dbValue the table name
 * @param { string } doc the key value pair
 * @param { string<uuid> }  id the id of the object this param is optional
 * @return { promise<Object> } the object returned
 */
async function safeCreateDoc(dbValue, doc, id = guid()) {
  dbValue = dbValue.toLowerCase();
  if (!checkDbValue(dbValue))
    throw new Error(
      `Wrong database name passed in please check the value ${dbValue}`
    );
  // const bucket = cluster.openBucket('default', process.env.COUCHBASE_BUCKET_PASSWORD);
  // console.log('Operation not supported', bucket);
  bucket.insert(dbValue, { ...doc, id }, (err, result) => {
    if (err) throw new Error(err);
    return result.result;
  });
}

/**
 * @function createDoc create a doc use this function only when sure the data does not exist in the table
 * @param { string } dbValue the table name
 * @param { string } doc the key value pair
 * @return { promise<Object> } the object returned
 */
const createDoc = (dbValue, doc) => {
  return new Promise((resolve, reject) => {
    dbValue = dbValue.toLowerCase();
    if (!checkDbValue(dbValue))
      throw new Error(
        `Wrong database name passed in please check the value ${dbValue}`
      );
    let db;
    db = nano.db.use(dbValue);
    db.insert(doc, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

/**
 * @function getDoc  get a doc from the database
 * @param { string } dbValue the table name
 * @param { string<uuid> }  id the id of the object this param is optional
 * @return { promise<Object> } the object returned
 */
const getDoc = (dbValue = "", id) => {
  return new Promise((resolve, reject) => {
    dbValue = dbValue.toLowerCase();
    if (!checkDbValue(dbValue))
      throw new Error(
        `Wrong database name passed in please check the value ${dbValue}`
      );
    const db = nano.db.use(dbValue);
    if (!id) {
      db.list({ include_docs: true })
        .then(result => {
          resolve(result.rows);
        })
        .catch(err => {
          reject(err);
        });
    } else {
      db.get(id, { include_docs: true })
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    }
  });
};
/**
 * @function getSomeDoc gets a document from the database using an abitrary key within the object
 * @param { string } dbValue the table name
 * @param { string } doc the key value pair
 * @param { string } key of the object to search
 * @param { string } val of the object to search
 * @return { promise<Object> } the object returned
 */

const getSomeDoc = (dbValue, param) => {
  return new Promise((resolve, reject) => {
    dbValue = dbValue.toLowerCase();
    if (!checkDbValue(dbValue))
      throw new Error(
        `Wrong database name passed in please check the value ${dbValue}`
      );
    let query = {
      selector: {
        [Object.keys(param)[0]]: { $eq: param[Object.keys(param)[0]] }
      }
    };
    db = nano.db.use(dbValue);
    const opt = {
      // method: "POST",
      db: dbValue,
      doc: "_find",
      body: query
    };
    db.find(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * @function updateDoc updates a document on the database
 * @param { string } dbValue the table name
 * @param { string } doc the key value pair
 * @param { string<uuid> }  id the id of the object this param is optional
 * @return { promise<Object> } the object returned
 */
const updateDoc = (dbValue, doc, id, rev) => {
  return new Promise((resolve, reject) => {
    dbValue = dbValue.toLowerCase();
    if (!checkDbValue(dbValue))
      throw new Error(
        `Wrong database name passed in please check the value ${dbValue}`
      );
    const db = nano.db.use(dbValue);
    db.insert({ ...doc, _id: id, _rev: rev })
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * @function deleteDoc deletes a document from the db
 * @param { string } dbValue the table name
 * @param { string<uuid> }  id the id of the object this param is optional
 * @return { promise<Object> } the object returned
 */

const deleteDoc = (dbValue, id, rev) => {
  return new Promise((resolve, reject) => {
    dbValue = dbValue.toLowerCase();
    if (!checkDbValue(dbValue))
      throw new Error(
        `Wrong database name passed in please check the value ${dbValue}`
      );
    const db = nano.db.use(dbValue);
    db.destroy( id, rev)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        resolve(err);
      });
  });
};
module.exports = {
  safeCreateDoc,
  createDoc,
  getDoc,
  getSomeDoc,
  updateDoc,
  deleteDoc
};
