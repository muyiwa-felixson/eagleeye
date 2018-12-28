/**
 * @file define controlers for updating documents
 */

// third party imports
// NA

// Local imports
const { updateDoc, getDoc } = require("../db/crud");
const { getExtension } = require("../utils/index");
const fetch = require("node-fetch");

const host = process.env.COUCHBASE_HOST;
const port = process.env.SERVER_PORT;
const uploadFile = (dbname, document, id, rev, reportId, file) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:${process.env.SERVER_PORT}/${
        process.env.APP_NAME
      }/api/item?dbname=project&id=${id}`
    )
      .then(item => {
        item
          .json()
          .then(doc => {
            const report = doc.reports.filter(doc => doc.id === reportId)[0];
            const media = report.media || [];
            if (!file.length) {
              media.push(`http://${host}:${port}/static/${file.filename}`);
            } else {
              file.map(f =>
                media.push(`http://${host}:${port}/static/${f.filename}`)
              );
            }
            report.media = media;
            let newdoc = doc.reports.filter(rep => rep.id !== report.id);
            newdoc = [...newdoc, report];
            doc.reports = newdoc;
            updateDoc("project", doc, id, rev)
              .then(val => resolve(val))
              .catch(err => reject(err));
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  uploadFile
};
