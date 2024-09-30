const db = require("../models");
const Resposta = db.respostas;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.conteudo) {
    res.status(400).send({
      message: "O conteúdo da resposta não pode estar vazio",
    });
    return;
  }

  const resposta = {
    conteudo: req.body.conteudo,
    data_criacao: req.body.data,
    imagem: req.body.imagem,
    id_usuario: req.body.usuarioId,
    id_post: req.body.postId,
  };

  Resposta.create(resposta)
  .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erro ao criar resposta",
      });
    });
};

exports.findAll = (req, res) => {
    Resposta.findAll()
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send({ message: err.message || "Erro ao buscar respostas" })
      );
 };

 exports.update = (req, res) => {
    const _id = req.params.id;
    Resposta.update(req.body, { where: { id: _id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Resposta atualizada com sucesso" });
        } else {
          res.status(404).send({
            message:
              "Não foi possível atualizar. Req.body vazio ou resposta não encontrada.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message || "Erro ao atualizar" });
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Resposta.destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Resposta excluída com sucesso" });
        } else {
          res.send({ message: "Resposta não encontrada. Id: " + id });
        }
      })
      .catch((err) =>
        res.status(500).send({ message: err.message || "Erro ao excluir resposta" })
      );
};