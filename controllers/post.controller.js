const db = require("../models");
const Post = db.posts;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    const post = {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        data_criacao: req.body.data,
        categoria: req.body.categoria,
        imagem: req.body.imagem,
        usuario_id: req.body.usuarioId,
    };

    Post.create(post)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || "Erro ao criar post" })
    );
};

exports.findAll = (req, res) => {
    Post.findAll()
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send({ message: err.message || "Erro ao buscar posts" })
      );
  };
  
  exports.findOne = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res
            .status(404)
            .send({ message: "Não possível encontrar um post com o id" + id });
        }
      })
      .catch((err) =>
        res
          .status(500)
          .send({ message: err.message || "Erro ao buscar post" })
      );
  };
  
  exports.update = (req, res) => {
    const _id = req.params.id;
    Post.update(req.body, { where: { id: _id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Post atualizado com sucesso" });
        } else {
          res.status(404).send({
            message:
              "Não foi possível atualizar. Req.body vazio ou post não encontrado.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message || "Erro ao atualizar" });
      });
  };
  
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Post.destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Post excluído com sucesso" });
        } else {
          res.send({ message: "Post não encontrado. Id: " + id });
        }
      })
      .catch((err) =>
        res.status(500).send({ message: err.message || "Erro ao deletar post" })
      );
  };

  exports.deleteAll = (req, res) => {
    Post.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} posts foram excluídos` });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Erro ao excluir posts" });
      });
  };