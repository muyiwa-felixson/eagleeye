const moment = require("moment");
const jwt = require("jsonwebtoken");
const JWTSECRET = process.env.JWTSECRET;
const { retrieveAdocument, retrieveAlldocuments } = require("../db/crud");
const Log = require("../utils/log");

const dateFormat = "DD-MM-YYYY";
const verboseDateFormat = "dddd D MMMM YYYY LT";
const createToken = (userId, duration) => {
  return jwt.sign(
    {
      _id: userId
    },
    JWTSECRET,
    {
      expiresIn: duration
    }
  );
};
/**
 * Function to read a token a token and associate it with a user object
 * @param { string } token
 * @return { Promise<string|boolean> } userId or error
 */
const verifyToken = userId => {
  return new Promise((resolve, reject) => {
    return jwt.verify(userId, JWTSECRET, (err, success) => {
      if (err) {
        Log.message(err);
        reject(false);
      } else {
        retrieveAlldocuments({
          dbname: "user",
          docFind: success._id
        }).then(userList => {
          const user = userList.docs.filter(item => {
            return item.token === userId;
          });
          if (user.length > 0) {
            resolve(user[0]);
          } else {
            reject("");
          }
        });
      }
    });
  });
};
const generateRandom = len => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

const summarise = (len, body) => {
  return body.replace(/(([^\s]+\s\s*){15})(.*)/, "$1…");
};
/**
 * Convert from a JS date object to moment locale day format
 * @param { Date } - date Js date object
 * @return { String  } - returns a locale date object
 */
const convertToLocale = date => {
  return moment(date).format(verboseDateFormat);
};

/**
 * Convert from a string date in format DD/MM/YYY to moment date type
 * @param {string } - dateString
 */
const convertToDateString = dateString => {
  return moment(dateString).format(dateFormat);
};

/**
 * @function getExtension
 */
const getExtension = filename => {
  return filename.split(".").pop();
};

/**
 * @function fileFilter
 */
const fileFilter = (req, file, cb) => { 
    const fileExtension = getExtension(file.filename);
    const acceptedExtensions = ['png', 'svg', 'jpeg', 'jpg', 'tiff', 'mp4', 'ogx', '3gp', 'ogg', 'flv', 'avi', 'quicktime', 'mpeg-4', 'xdcam', 'dnxhd','vob']
    if (acceptedExtensions.indexOf(fileExtension)  < 0 ) { 
        cb(null, false)
    } else { 
        cb(null, true)
    }
}
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
module.exports = {
  createToken,
  verifyToken,
  generateRandom,
  getExtension,
  dateFormat,
  guid,
  convertToLocale,
  convertToDateString,
  summarise,
  fileFilter
};


