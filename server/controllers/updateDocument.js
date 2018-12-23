/**
 * @file define controlers for updating documents
 */

// third party imports
// NA

// Local imports
const { updateDoc } = require("../db/crud");

async function updateDocument(dbname, doc, id, rev) {
  return await updateDoc(dbname, doc, id, rev);
}
module.exports = {
  updateDocument
};
