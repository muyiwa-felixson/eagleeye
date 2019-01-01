/**
 * @file handles user auth and permissions
 */
const { hashPassword, comparePassword } = require("../utils/password");
const { createToken, verifyToken } = require("../utils/token");
const { createDoc, updateDoc, getDoc } = require("../db/crud");
const { getDocument } = require("../controllers/getDocument");
const { groups } = require("../config/table");
/**
 * @function signup
 * @param { UserObject}
 */
let id = "";
let rev = "";
const signup = ({ username, password, firstname, lastname }) => {
  return new Promise((resolve, reject) => {
    if (!username || !password || !firstname || !lastname) {
      reject({
        reason:
          "Unsupported sign up information please update the information parse",
        code: 400,
        further: "Incomplete parameter"
      });
    }
    let hashed = "";
    username = username.trim().toLowerCase();
    firstname = firstname.trim().toLowerCase();
    lastname = lastname.trim().toLowerCase();
    const group = "projectCreator";
    createdOn = new Date();
    hashPassword(password)
      .then(hashedPassword => {
        hashed = hashedPassword;
        const doc = {
          username,
          firstname,
          lastname,
          password: hashed,
          group,
          createdOn
        };
        getDoc("user")
          .then(users => {
            const exists = () =>
              new Promise((resolve, reject) => {
                users.filter(item => {
                  if (item.doc.username === username) resolve(true);
                });
                resolve(false);
              });
            exists().then(value => {
              if (value) {
                reject({
                  reason: "Sorry this account already exists on our data base",
                  code: 422,
                  further: "Unprocessible Entity"
                });
              } else {
                createDoc("user", doc)
                  .then(obj => {
                    id = obj.id;
                    rev = obj.rev;
                    const token =
                      createToken({ username, password: hashed, id, group }) ||
                      "";
                    if (!token)
                      deleteDoc("user", id, rev).then(doc => {
                        reject({
                          reason: "Could not create token for this user",
                          code: 500,
                          further: err
                        });
                      });
                    updateDoc(
                      "user",
                      { ...doc, updatedOn: new Date(), token },
                      id,
                      rev
                    )
                      .then(() => {
                        resolve(token);
                      })
                      .catch(err =>
                        reject({
                          reason:
                            "Could not update the created token for this user",
                          code: 500,
                          furthe: err
                        })
                      );
                  })
                  .catch(err => {
                    reject({
                      reason: "Could not create this user",
                      code: 500,
                      further: err
                    });
                  });
              }
            });
          })
          .catch(err => {
            reject({
              reason: "Could not get a list of users",
              code: 500,
              further: err
            });
          });
      })
      .catch(err => {
        console.error(err);
        reject({
          reason: "Could not hash this user's password",
          code: 500,
          further: err
        });
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
      .then(doc => {
        const users = doc
          .filter(d => {
            return d.doc.username === username;
          })
          .map(user => {
            comparePassword(user.doc.password, password)
              .then(compare => {
                if (compare)
                  resolve({
                    token: user.doc.token,
                    group: user.doc.group,
                    firstname: user.doc.firstname,
                    lastname: user.doc.lastname
                  });
                else {
                  reject({
                    reason: "User not found",
                    code: 404,
                    further: "Not Found"
                  });
                }
              })
              .catch(err => {
                reject({
                  reason: "Could not compare password",
                  code: 500,
                  further: err
                });
              });
          });
      })
      .catch(err => {
        reject({
          reason: "Could not find a list of all users",
          code: 500,
          further: err
        });
      });
  });
};

/**
 * @function assign to group
 */
const assignGroup = ({ group, token }) => {
  return new Promise((resolve, reject) => {
    if (groups.findIndex(group) < 0) {
      reject({
        reason: "Wrong group passed",
        code: 404,
        further: "Could not find the group info passed"
      });
    } else {
      verifyToken(token)
        .then(user => {
          getDoc("user", user._id).then(item => {
            item = { ...item, group };
            updateDoc("user", user, item.id, item.rev)
              .then(res => resolve(res))
              .catch(err => {
                reject({
                  reason: "Could not update the users group",
                  code: 500,
                  further: err
                });
              });
          });
        })
        .catch(err => {
          reject({
            reason: "Wrong token passed",
            code: 404,
            further: err
          });
        });
    }
  });
};

module.exports = {
  signup,
  signin,
  assignGroup
};
