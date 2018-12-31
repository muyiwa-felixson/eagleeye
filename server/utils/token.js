const { secretKey } = require("../db/constants");
const { getDoc } = require("../db/crud");
const jwt = require("jsonwebtoken");

/**
 * @function create a token and sign using the id , username and password 
 * @param { object { id: string, username: string , password: string }}
 * @return { string } - token 
 */
const createToken = ({id, username, password, group}) => {
    return jwt.sign({
        _id: id,
        username,
        password,
        group
    }, secretKey, {
        expiresIn: '1000h'
    });
};

/**
 * Function to read a token a token and associate it with a user object
 * @param { string } token
 * @return { Promise<string|boolean> } userId or error
 */
const verifyToken = token => {
  return new Promise((resolve, reject) => {
    return jwt.verify(token, secretKey, (err, success) => {
      if (err) {
        Log.message(err);
        reject(false);
      } else {
        getDoc("user", success._id)
          .then(user => {
            resolve(user);
          })
          .catch(err => reject("404"));
      }
    });
  });
};
module.exports = {
  verifyToken,
  createToken
};
