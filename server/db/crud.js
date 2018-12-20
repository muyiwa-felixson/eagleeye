/**
 * @file represent the setup params for cloudant
 */
const Cloudant = require('@cloudant/cloudant');
const constants = require('./constants');
const Log = require('../utils/log');
const tables = require('../config/table');
const uploadAttachment = require('../aws/s3Credentials');

const Couch = require('couch-db').CouchDB;
// GLOBAL VARIABLES TYPE
const G = {
    databases: [],
    tablseNames: []
};

// Initialize cloudant object
const {
    dbhost,
    dbusername,
    dbpassword,
    dbname,
    dburl
} = constants();
const couch = new Couch(dburl);
couch.auth(dbusername, dbpassword);
// const cloudant = Cloudant(constants().dburl);
// cloudant.set_cors({
//     enable_cors: true,
//     allow_credentials: true
// });
// Specify db to use 
// const db = cloudant.db.use(constants().dbname);
const nano = require('nano')(dburl);
// nano.set_cors({
//     enable_cors: true,
//     allow_credentials: true
// });
// --------------------------------------------------------------------


// --------------------------------------------------------------------
/**
 *       CRUD OPERATIONS
 */
// --------------------------------------------------------------------
// Insert a document
/**
 * @const defines methods to insert items into the
 * database
 * @param {any} documentObject - the document to insert
 * @param { dname: string, docName: string } docParams -
 * parameters for insert
 */
const insertDocument = (documentObject, docParams) => {
    return new Promise((resolve, reject) => {
        const {
            dbname,
            docName
        } = docParams;
        const db = nano.db.use(dbname);
        db.insert(documentObject, (err, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
};
// Insert a document with attachment
/**
 * @const defines methods to insert items into the
 * database
 * @param {any} documentObject - the document to insert
 * @param { dname: string, docName: string } docParams -
 * parameters for insert
 */
const insertDocumentAndAttach = (docParams) => {
    return new Promise((resolve, reject) => {
        const {
            dbname,
            docName,
            image,
            valueId,
            _id
        } = docParams;
        const db = nano.db.use(dbname);
        retrieveAdocument({
            dbname,
            docFind: {
                userId: _id
            }
        }).then(({
            docs
        }) => {
            let documentObject = null;
            if (valueId) documentObject = docs.filter(v => v._id === valueId)[0];
            else documentObject = docs[0];
            if (!documentObject) reject('No document found');
            uploadAttachment(image, documentObject._id).then((items) => {
                let updateDocs = documentObject;
                items.map((data) => {
                    updateDocs = { ...updateDocs,
                        [data.id]: data.location
                    };
                });
                db.insert(updateDocs, docName, (err, body) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(body);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    });
};

const mapReturnType =(result, all=false)=>{
    const document = { docs:[] };
    result.rows.map((item)=>{
        document.docs.push(item.doc);
    });
    return document;
};
// Retrieve a document
const retrieveAdocument = (docParams) => {
    return new Promise((resolve, reject) => {
        const {
            dbname,
            docFind
        } = docParams;
        const db = nano.db.use(dbname);
        if (docFind && typeof (docFind) !== 'string') {
            const tableItemIndex = Object.keys(tables[dbname].feilds).indexOf(Object.keys(docFind)[0]);
            if (tableItemIndex > -1) {
                db.fetch( docFind,
                    (err, result) => {
                        if (err) {
                            reject(`Find  could not find the item -${err}`);
                        }
                        resolve(mapReturnType(result));
                    });
            } else {
                reject(`The field '${Object.keys(docFind)[0]}' you provided does not exist on type ${dbname}`);
            }

        } else {
            db.get(docFind, {include_docs: true}, (err, result) => {
                if (err) {
                    reject(` get could not find the item -${err}`);
                }
                resolve(result);
            });
        }
    });

};

// retrievAllDocuments

const retrieveAlldocuments = (docParams) => {
    return new Promise((resolve, reject) => {
        const {
            dbname
        } = docParams;
        const db = nano.db.use(dbname); 
        db.list({
                include_docs: true
            },
            (err, result) => {
                if (err) {
                    reject(`could not find the item -${err}`);
                }
                resolve(mapReturnType(result));
            });

    });

};

// Retrieve a document
const searchForDocuments = (docParams) => {
    return new Promise((resolve, reject) => {
        const {
            dbname,
            docFind
        } = docParams;
        const db = nano.db.use(dbname);
        db.fetch(docFind, {
            revs_info: true
        }, (err, result) => {
            if (err) {
                reject(`could not find the item -${err}`);
            }

            resolve(mapReturnType(result));
        });

    });

};
// Delete a document


module.exports = {
    insertDocument,
    insertDocumentAndAttach,
    retrieveAdocument,
    retrieveAlldocuments,
    searchForDocuments
};