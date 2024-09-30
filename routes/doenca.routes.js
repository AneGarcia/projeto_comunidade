module.exports = (app) => {
    const doencas = require("../controllers/doenca.controller");
    var router = require("express").Router();
  
    router.post("/", doencas.create);
    router.get("/", doencas.findAll);
    router.get("/:id", doencas.findOne);
    router.put("/:id", doencas.update);
    router.delete("/:id", doencas.delete);
  
    app.use("/doencas", router);
  };
  