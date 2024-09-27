const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin:
      " ",
  };

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({extend: true}));

  const db = require("./models");
  db.sequelize
    .sync({alter: true})
    .then(()=>{
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
