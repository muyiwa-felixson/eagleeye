/**
 * @file handles user auth and permissions
 */
const { hashPassword, comparePassword } = require("../utils/password");
const { createToken, verifyToken } = require("../utils/token");
const { createDoc, updateDoc, getDoc } = require("../db/crud");
const { groups } = require("../config/table");
/**
 * @function signup
 * @param { UserObject}
 */
const signup = ({ username, password, firstname, lastname }) => {
  return new Promise((resolve, reject) => {
    if (!username || !password || !firstname || !lastname) {
      reject("400");
    }
    let hashed = "";
    username = username.trim().toLowerCase();
    firstname = firstname.trim().toLowerCase();
    lastname = lastname.trim().toLowercase();
    const group = "officer";
    createdOn = new Date();
    hashPassword(password)
      .then(hashedPassword => {
        hashed = hashedPassword;
        const doc = {
          username,
          firstname,
          lastname,
          password,
          group,
          createdOn
        };
        createDoc("user", doc)
          .then(obj => {
            const { _id, _rev } = obj;
            createToken({ username, password: hashed, _id, group }).then(
              token => {
                updateDoc(
                  "user",
                  { ...doc, updatedOn: new Date(), token },
                  _id,
                  _rev
                )
                  .then(() => {
                    resolve(token);
                  })
                  .catch(err => reject("500"));
              }
            );
          })
          .catch(err => {
            console.error(err);
            reject("500");
          });
      })
      .catch(err => {
        console.error(err);
        reject("500");
      });
  });
};

/**
 * @function signin
 * ### Update requirement not scalable this is pulling all datasets
 * create indecis on the data base to pull by field
 */
const signin = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    getDoc("user")
      .then(preDOc => {
        const { doc } = preDoc;
        const user = doc
          .filter(d => {
            return d.username === username;
          })
          .map(user => {
            comparePassword(user.password, password)
              .then(compare => {
                if (compare) return { token: user.token, group: user.group };
              })
              .catch(err => {
                reject("500");
              });
          });
        if (user.length < 1) reject("404");
        else resolve(user[0]);
      })
      .catch(err => {
        reject("500");
      });
  });
};

/**
 * @function assign to group
 */
const assignGroup = ({group, token}) => {
  return new Promise((resolve, reject) => {
    if (groups.findIndex(group) < 0) {
      reject("500");
    } else {
      verifyToken(token)
        .then(user => {
          getDoc("user", user._id).then(item => {
            item = { ...item, group };
            updateDoc("user", user, item.id, item.rev)
              .then(res => resolve(res))
              .catch(err => {
                reject("500");
              });
          });
        })
        .catch(err => {
          reject("404");
        });
    }
  });
};

module.exports = {
  signup,
  signin,
  assignGroup
};
