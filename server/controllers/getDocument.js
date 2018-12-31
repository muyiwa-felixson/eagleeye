/**
 * @file define controlers for getting documents
 */

// third party imports
// NA

// Local imports
const { getDoc, getSomeDoc } = require("../db/crud");

const getDocument = (dbname, id, key = "", val = "") => {
  return new Promise((resolve, reject) => {
    if (id && !key) {
      getDoc(dbname, id)
        .then(document => resolve(document))
        .catch(err => reject(err));
    } else if (key && id) {
      getSomeDoc(dbname, key, val)
        .then(document => resolve(document))
        .catch(err => reject(err));
    } else {
      getDoc(dbname)
        .then(document => resolve(document))
        .catch(err => reject(err));
    }
  });
};
module.exports = {
  getDocument
};
