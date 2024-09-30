module.exports = (app) => {
    const multer = require("multer");
    const fs = require("fs");
    var path = require("path");

    const usuarios = require("../controllers/usuario.controller");
    var router = require("express").Router();

     var storage = multer.diskStorage({
        destinatio: function (req, file, cb){
            cb(null, "uploads/usuario");
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
            path.dirname(__dirname) + `/uploads/usuario/${req.params.arquivo}`;
        console.log("dir: " + arquivo);
        fs.readFile(arquivo, function (err, data) {
            res.contentType("png");
            res.send(data);
        });
     });

     router.post("/login", usuarios.login);
     router.post("/", usuarios.create);
     router.get("/", usuarios.findAll);
     router.get("/:id", usuarios.findOne);
     router.put("/:id", usuarios.update);
     router.delete("/:id", usuarios.delete);
     router.delete("/", usuarios.deleteAll);

     app.use("/usuarios", router);
};