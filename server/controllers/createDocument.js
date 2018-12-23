/**
 * @file define controlers for creating documents
 */

// third party imports
// NA

// Local imports
const { safeCreateDoc, createDoc } = require("../db/crud");
async function createDocument(dbname, doc, isSafe = false) {
  if (!isSafe) return await createDoc(dbname, doc);
  else return await safeCreateDoc(dbname, doc);
}
module.exports = {
  createDocument
};

