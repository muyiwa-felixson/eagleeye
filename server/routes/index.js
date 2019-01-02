/**
 * @file define routes
 */

// local imports
const { getDocument } = require("../controllers/getDocument");
const { updateDocument } = require("../controllers/updateDocument");
const { createDocument } = require("../controllers/createDocument");
const { deleteDocument } = require("../controllers/deleteDocument");
const { uploadFile } = require("../controllers/uploadFIle");
const {
  signup,
  signin,
  assignGroup,
  readToken
} = require("../controllers/users");
const { getPermissions } = require("../utils/token");
const crypto = require("crypto");
const mime = require("mime");
const fs = require("fs");
// Multer is for uploadig images
const multer = require("multer");
const reportMedia = "reports";

const checkPerm = (permList, toCheck) => {
  return permList.findIndex(toChecki => toChecki === toCheck) > -1;
};
const unauth = {
  reason: "you are not authorised to perform this action",
  code: 401,
  further: "Unauthorised"
};
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

  app.get(`/${appName}/api/verify`, (req, res) => {
    const { token } = req.query;
    try {
      readToken({ token })
        .then(user => res.status(200).json(user))
        .catch(err => res.states(err.code).json(err));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // POST
  app.post(`/${appName}/api/item`, (req, res) => {
    const { doc, isSafe, dbname, token, intent } = req.body;
    getPermissions(token).then(permissionList => {
      if (intent === "createProject") {
        if (!checkPerm(permissionList, "Can create projects")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "intiatePayment") {
        if (!checkPerm(permissionList, "Can initiate payments")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "createReport") {
        if (!checkPerm(permissionList, "Can create reports")) {
          res.status(401).json(unauth);
          return;
        }
      }
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
  });

  // PATCH
  app.patch(`/${appName}/api/item`, (req, res) => {
    const { id, doc, dbname, rev, token, intent } = req.body;
    console.log(intent, token, id, dbname, " and all is here and here ");
    getPermissions(token).then(permissionList => {
      if (intent === "editProject") {
        if (!checkPerm(permissionList, "Can edit projects")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "editReport") {
        if (!checkPerm(permissionList, "Can edit reports")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "createProject") {
        if (!checkPerm(permissionList, "Can create projects")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "intiatePayment") {
        if (!checkPerm(permissionList, "Can initiate payments")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "createReport") {
        if (!checkPerm(permissionList, "Can create reports")) {
          res.status(401).json(unauth);
          return;
        }
      }
      try {
        updateDocument(dbname, doc, id, rev)
          .then(retVal => res.status(200).json(retVal))
          .catch(err => res.status(500).json(err));
      } catch (err) {
        res.status(500).json(err);
      }
    });
  });
  // DELETE
  app.delete(`/${appName}/api/item`, (req, res) => {
    const { id, dbname, rev, token, intnent } = req.body;
    getPermissions(token).then(permissionList => {
      if (intent === "editProject") {
        if (!checkPerm(permissionList, "Can edit projects")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "editReport") {
        if (!checkPerm(permissionList, "Can edit reports")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "createProject") {
        if (!checkPerm(permissionList, "Can create projects")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "intiatePayment") {
        if (!checkPerm(permissionList, "Can initiate payments")) {
          res.status(401).json(unauth);
          return;
        }
      }
      if (intent === "createReport") {
        if (!checkPerm(permissionList, "Can create reports")) {
          res.status(401).json(unauth);
          return;
        }
      }
      try {
        deleteDocument(dbname, id, rev)
          .then(retVal => res.status(200).json(retVal))
          .catch(err => res.status(500).json(err));
      } catch (err) {
        res.status(500).json(err);
      }
    });
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

  // Auth
  app.post(`/${appName}/api/auth/signup`, (req, res) => {
    const { firstname, lastname, username, password, token, group } = req.body;
    signup({ username, password, firstname, lastname, token, group })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => res.status(err.code || 500).json(err));
  });

  // Auth
  app.post(`/${appName}/api/auth/signin`, (req, res) => {
    const { username, password } = req.body;
    signin({ username, password })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => res.status(err.code || 500).json(err));
  });

  // Auth
  app.post(`/${appName}/api/auth/group`, (req, res) => {
    const { group, username, token } = req.body;
    assignGroup({ group, username, token })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => res.status(err.code || 500).json(err));
  });

  // Default routes
  app.use((req, res) => {
    res.redirect(`${appName}`);
  });
};

module.exports = { routes };
