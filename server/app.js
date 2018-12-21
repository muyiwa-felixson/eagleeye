const express = require("express");

const app = express();

const PORT = process.env.SERVER_PORT;

const bodyParser = require("body-parser");

const cors = require("cors");

const path = require("path");

const multer = require("multer");

const Log = require("./utils/log");

const createTables = require("./db/createTables");

const constants = require("./db/constants");

const { query, bucket } = require("./db/index");

app.use(
  bodyParser.urlencoded({
    limit: "2000mb",
    extended: true,
    parameterLimit: 1000000
  })
);
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
app.use(cors());

// require('./routes')(app);
process.on("uncaughtException", function(err) {
  Log.error(err);
});

app.listen(PORT, () => console.log(`eagle eye Server listening on ${PORT}!`));
