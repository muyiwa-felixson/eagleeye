/**
 * @file handles user auth and permissions
 */
const { hashPassword, comparePassword } = require("../utils/password");
const { createToken, verifyToken, getPermissions } = require("../utils/token");
const { createDoc, updateDoc, getDoc } = require("../db/crud");
const { groups } = require("../config/table");
/**
 * @function signup
 * @param { UserObject}
 */
let id = "";
let rev = "";
const signup = ({ username, password, firstname, lastname, token, group }) => {
  return new Promise((resolve, reject) => {
    if (!username || !password || !firstname || !lastname || !token || !group) {
      reject({
        reason:
          "Unsupported sign up information please update the information parse",
        code: 400,
        further: "Incomplete parameter"
      });
    }
    getPermissions(token)
      .then(permissionList => {
        const userCreate = "Can create users";
        const index = permissionList.findIndex(user => user === userCreate);
        if (index > -1) {
          let hashed = "";
          username = username.trim().toLowerCase();
          firstname = firstname.trim().toLowerCase();
          lastname = lastname.trim().toLowerCase();
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
                        reason:
                          "Sorry this account already exists on our data base",
                        code: 422,
                        further: "Unprocessible Entity"
                      });
                    } else {
                      createDoc("user", doc)
                        .then(obj => {
                          id = obj.id;
                          rev = obj.rev;
                          const usertoken =
                            createToken({
                              username,
                              password: hashed,
                              id,
                              group
                            }) || "";
                          if (!usertoken)
                            deleteDoc("user", id, rev).then(doc => {
                              reject({
                                reason: "Could not create token for this user",
                                code: 500,
                                further: err
                              });
                            });
                          updateDoc(
                            "user",
                            { ...doc, updatedOn: new Date(), token: usertoken },
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
        } else {
          reject({
            reason: "you are not authorised to perform this action",
            code: 401,
            further: "Unauthorised"
          });
        }
      })
      .catch(err => {
        reject({
          reason: "Could not get a list of permissions",
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
        doc.map((user, index) => {
          if (user.doc.username === username) {
            comparePassword(user.doc.password, password)
              .then(compare => {
                if (compare) {
                  const tok = user.doc.token || user.doc.usertoken;
                  console.log(tok, ' got here your heard ...');
                  getPermissions(tok).then(permissionList => {
                    resolve({
                      token: tok,
                      group: user.doc.group,
                      firstname: user.doc.firstname,
                      lastname: user.doc.lastname,
                      permissions: permissionList
                    });
                  });
                } else {
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
          }
          // if (index === doc.length - 1 && user.doc.username !== username) {
          //   reject({
          //     reason: "User not found",
          //     code: 404,
          //     further: "Not Found"
          //   });
          // }
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
const assignGroup = ({ group, username, token }) => {
  return new Promise((resolve, reject) => {
    if (groups.findIndex(groupFind => groupFind === group) < 0) {
      reject({
        reason: "Wrong group passed",
        code: 404,
        further: "Could not find the group info passed"
      });
    } else {
      getPermissions(token).then(permissionList => {
        const userCreate = "Can edit users";
        const index = permissionList.findIndex(user => user === userCreate);
        if (index > -1) {
          getDoc("user").then(users => {
            users.map(user => {
              if (user.doc.username === username) {
                verifyToken(user.doc.token)
                  .then(userT => {
                    getDoc("user", userT._id).then(item => {
                      item = { ...item, group };
                      updateDoc("user", item, item._id, item._rev)
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
          });
        } else {
          reject({
            reason: "you are not authorised to perform this action",
            code: 401,
            further: "Unauthorised"
          });
        }
      });
    }
  });
};
/**
 * @function verify token and return
 */
const readToken = ({ token }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
      .then(item => {
        const { username, group, firstname, lastname } = item;
        getPermissions(token).then(permissionList => {
          resolve({
            username,
            firstname,
            lastname,
            permissionList,
            token
          });
        });
      })
      .catch(err => {
        reject({
          reason: "Sorry could not find the specified token",
          code: 404,
          further: err
        });
      });
  });
};
module.exports = {
  signup,
  signin,
  assignGroup,
  readToken
};
