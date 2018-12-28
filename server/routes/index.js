/**
 * @file define routes
 */

// local imports
const { getDocument } = require("../controllers/getDocument");
const { updateDocument } = require("../controllers/updateDocument");
const { createDocument } = require("../controllers/createDocument");
const { deleteDocument } = require("../controllers/deleteDocument");
const { uploadFile } = require("../controllers/uploadFIle");
const { fileFilter } = require("../utils/index");
const crypto = require("crypto");
const mime = require("mime");
const fs = require("fs");
// Multer is for uploadig images
const multer = require("multer");
const reportMedia = "reports";

// const upload = multer({ dest: "../media" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("server/media/")) {
      fs.mkdirSync("server/media/");
    }
    cb(null, "server/media/");
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(
        null,
        raw.toString("hex") +
          Date.now() +
          "." +
          mime.getExtension(file.mimetype)
      );
    });
  }
});
const upload = multer({ storage: storage });

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
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // PATCH
  app.patch(`/${appName}/api/item`, (req, res) => {
    const { id, doc, dbname, rev } = req.body;
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

  // UPLOADMEDIA
  // single upload
  app.post(
    `/${appName}/api/upload`,
    upload.single(reportMedia),
    (req, res, next) => {
      const { file, body } = req;
      const { id, doc, dbname, rev, reportId } = body;
      uploadFile(dbname, doc, id, rev, reportId, file)
        .then(retVal => res.status(200).json(retVal))
        .catch(err => res.status(500).json(err));
    }
  );

  app.post(
    `/${appName}/api/upload/media`,
    upload.array("photos[]", 30),
    (req, res, next) => {
      const { files, body } = req;
      const { id, doc, dbname, rev, reportId } = body;
      uploadFile(dbname, doc, id, rev, reportId, files)
        .then(retVal => res.status(200).json(retVal))
        .catch(err => res.status(500).json(err));
    }
  );

  // Default routes
  app.use((req, res) => {
    res.redirect(`${appName}`);
  });
};

module.exports = { routes };
