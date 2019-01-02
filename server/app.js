const express = require("express");

const app = express();

const PORT = process.env.SERVER_PORT;

const bodyParser = require("body-parser");

const cors = require("cors");

const path = require("path");

const multer = require("multer");

const Log = require("./utils/log");

const fs = require("fs");

const { getDoc, createDoc, updateDoc } = require("./db/crud");

const { createTables } = require("./db/createTables");

const { hashPassword } = require("./utils/password");

const { createToken } = require("./utils/token");

app.use(
  bodyParser.urlencoded({
    limit: "2000mb",
    extended: true,
    parameterLimit: 1000000
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "2000mb",
    extended: true,
    parameterLimit: 1000000
  })
);
app.use(bodyParser.json({ limit: "2000mb" }));
app.use(bodyParser.json({ limit: "2000mb" }));
app.use(bodyParser({ limit: "1000mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // TODO: We need to restrict this to just the client.
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const currentDir = process.cwd();
fs.open(path.join(currentDir, "media"), "wx", (err, fd) => {
  if (err) {
    try {
      fs.mkdirSync(path.join(currentDir, "server", "media"));
    } catch (err) {
      // do nothing
    }
  } else {
    console.log(fd);
    return fd;
  }
});
app.use(cors());
app.use("/static", express.static(__dirname + "/media"));
require("./routes").routes(app);
process.on("uncaughtException", function(err) {
  console.error(err);
});
createTables()
  .then(() => {
    getDoc("user").then(doc => {
      const auth = doc.filter(item => {
        return item.doc.username === "administrator";
      });
      if (auth.length < 1) {
        hashPassword("password").then(hashed => {
          const document = {
            username: "administrator",
            password: hashed,
            group: "superuser",
            firstname: "administrator",
            lastname: "user"
          };
          createDoc("user", {
            username: "administrator",
            password: hashed,
            group: "superuser",
            firstname: "administrator",
            lastname: "user"
          }).then(obj => {
            const token = createToken({
              username: document.username,
              password: hashed,
              id: obj.id,
              group: document.group
            });
            updateDoc(
              "user",
              {
                ...document,
                token
              },
              obj.id,
              obj.rev
            ).then(() => {
              app.listen(PORT, err => {
                if (err) console.log(err);
                console.log(`eagle eye Server listening on ${PORT}!`);
              });
            });
          });
        });
      } else {
        app.listen(PORT, err => {
          if (err) console.log(err);
          console.log(`eagle eye Server listening on ${PORT}!`);
        });
      }
    });
  })
  .catch(err => console.error(err));
