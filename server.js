const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize } = require('sequelize');


const app = express();

var corsOptions = {
    origin:
      " ",
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize
  .sync({alter: true})
  .then(()=>{
    console.log("Synced db.");
})
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

require("./routes/doenca.routes")(app);
require("./routes/post.routes")(app);
require("./routes/resposta.routes")(app);
require("./routes/usuario.routes")(app);

app.listen(8000, function (req, res) {
  console.log("App rodando na porta 8000");
});
