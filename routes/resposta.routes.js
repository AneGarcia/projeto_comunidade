module.exports = (app) => {
    const multer = require("multer");
    const fs = require("fs");
    var path = require("path");

    const respostas = require("../controllers/resposta.controller");
    var router = require("express").Router();

     var storage = multer.diskStorage({
        destinatio: function (req, file, cb){
            cb(null, "uploads/resposta");
        },
     });

     const upload = multer({
        storage: storage,
     });

     router.post("/upload/", upload.single("file"), async (req, res) =>{
        res.send({
            upload: true,
            file: req.file,
        });
     });

     router.get("/upload/:arquivo", (req, res) => {
        const arquivo = 
            path.dirname(__dirname) + `/uploads/resposta/${req.params.arquivo}`;
        console.log("dir: " + arquivo);
        fs.readFile(arquivo, function (err, data) {
            res.contentType("png");
            res.send(data);
        });
     });

     router.post("/", respostas.create);
     router.get("/", respostas.findAll);
     router.put("/:id", respostas.update);
     router.delete("/:id", respostas.delete);

     app.use("/respostas", router);
};