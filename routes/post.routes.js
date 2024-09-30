module.exports = (app) => {
    const multer = require("multer");
    const fs = require("fs");
    var path = require("path");

    const posts = require("../controllers/post.controller");
    var router = require("express").Router();

     var storage = multer.diskStorage({
        destinatio: function (req, file, cb){
            cb(null, "uploads/post");
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
            path.dirname(__dirname) + `/uploads/post/${req.params.arquivo}`;
        console.log("dir: " + arquivo);
        fs.readFile(arquivo, function (err, data) {
            res.contentType("png");
            res.send(data);
        });
     });

     router.post("/", posts.create);
     router.get("/", posts.findAll);
     router.get("/:id", posts.findOne);
     router.put("/:id", posts.update);
     router.delete("/:id", posts.delete);

     app.use("/posts", router);
};