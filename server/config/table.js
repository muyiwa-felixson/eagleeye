/**
 * Define tables needed by the app
 * used to create tables if they dont exist
 */
module.exports = {
  tables: ["project", "contractor", "user", "permissions"],
  fields: {
    user: {
      id: "_id",
      rev: "_rev",
      createdOn: "createdOn",
      firstname: "firstname",
      lastname: "lastname",
      group: "group",
      password: "password",
      token: "token",
      updatedOn: "updatedOn",
      username: "username"
    },
    project: {
      id: "_id",
      rev: "_rev",
      completed: "completed",
      contractor: "contractor",
      cost: "cost",
      dateOfAward: "dateOfAward",
      description: "description",
      duration: "dureation",
      durationType: "dureationType",
      fileNumber: "fileNumber",
      funding: "funding",
      name: "name",
      nature: "nature",
      paid: "paid",
      type: "type",
      unit: "unit"
    }
  },
  groups: ["superuser", "adminstrator", "projectCreator", "paymentCreator"],
  permissions: {
    officer: [
      "Can create users",
      "Can edit users",
      "Can delete users",
      "Can create projects",
      "Can edit projects",
      "Can delete projects",
      "Can create reports",
      "Can edit reports",
      "Can delete reports",
      "Can approve reports",
      "Can initiate payments"
    ],
    superuser: [
      "Can create users",
      "Can edit users",
      "Can delete users",
      "Can create projects",
      "Can edit projects",
      "Can delete projects",
      "Can create reports",
      "Can edit reports",
      "Can delete reports",
      "Can approve reports",
      "Can initiate payments"
    ],
    administrator: [
      "Can create projects",
      "Can edit projects",
      "Can delete projects",
      "Can create reports",
      "Can edit reports",
      "Can delete reports",
      "Can approve reports",
      "Can initiate payments"
    ],
    projectCreator: [
      "Can create projects",
      "Can edit projects",
      "Can create reports"
    ],
    paymentCreator: ["Can initiate payments"]
  }
};
