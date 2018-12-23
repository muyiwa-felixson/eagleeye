/**
 * @file define controlers for deleting documents
 */

// third party imports
// NA

// Local imports
const {
  deleteDoc
} = require("../db/crud");

async function deleteDocument (dbname, id , rev) { 
  return await deleteDoc(dbname, id, rev);

}
module.exports = { 
    deleteDocument
}