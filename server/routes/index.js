/**
 * @file define routes
 */

// local imports
const { getDocument } = require("../controllers/getDocument");
const { updateDocument } = require("../controllers/updateDocument");
const { createDocument } = require("../controllers/createDocument");
const { deleteDocument } = require("../controllers/deleteDocument");

const appName = process.env.APP_NAME;

const routes = app => {
  // Base
  app.get(`/${appName}`, (req, res) => {
    res.status(200).json(`Welcome to ${appName}`);
  });

  // GET
  app.get(`/${appName}/api/item`, (req, res) => {
    const { id, key, val, dbname } = req.query;
    try {
      getDocument(dbname, id, key, val)
        .then(retVal => res.status(200).json(retVal))
        .catch(err => res.status(500).json(err));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // POST
  app.post(`/${appName}/api/item`, (req, res) => {
    const { doc, isSafe, dbname } = req.body;
    try {
      createDocument(dbname, doc, isSafe)
        .then(retVal => res.status(200).json(retVal))
        .catch(err => { 
            console.log(err);
            res.status(500).json(err)
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // PATCH
  app.patch(`/${appName}/api/item`, (req, res) => {
    const { id, doc, dbname, rev } = req.body;
    console.log(doc, ' ====> doc')
    try {
      updateDocument(dbname, doc, id, rev)
        .then(retVal => res.status(200).json(retVal))
        .catch(err => res.status(500).json(err));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // DELETE
  app.delete(`/${appName}/api/item`, (req, res) => {
    const { id, dbname, rev } = req.body;
    try {
      deleteDocument(dbname, id, rev)
        .then(retVal => res.status(200).json(retVal))
        .catch(err => res.status(500).json(err));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Default routes
  app.use((req, res) => {
    res.redirect(`${appName}`);
  });
};

module.exports = { routes };
