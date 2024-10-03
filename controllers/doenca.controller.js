const db = require("../models");
const Doenca = db.doencas;
const Op = db.sequelize.Op;

exports.create = (req, res) =>{
    const doenca = {
        nome: req.body.nome,
        descricao: req.body.descricao,
    };

    Doenca.create(doenca)
        .then((data) => res.send(data))
        .catch((err) =>
            res.status(500).send({ message: err.message || "Erro ao criar doença" })
        );
};

exports.findAll = (req, res) => {
    Doenca.findAll()
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send({ message: err.message || "Erro ao buscar doenças" })
      );
  };
  
exports.findOne = (req, res) => {
    const id = req.params.id;
    Doenca.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res
            .status(404)
            .send({ message: "Não possível encontrar uma doença com o id" + id });
        }
      })
      .catch((err) =>
        res
          .status(500)
          .send({ message: err.message || "Erro ao buscar doença" })
      );
};
  
exports.update = (req, res) => {
    const _id = req.params.id;
    Doenca.update(req.body, { where: { id: _id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Doença atualizada com sucesso" });
        } else {
          res.status(404).send({
            message:
              "Não foi possível atualizar. Req.body vazio ou doença não encontrada.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message || "Erro ao atualizar" });
      });
};
  
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Doenca.destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Doença excluída com sucesso" });
        } else {
          res.send({ message: "Doença não encontrada. Id: " + id });
        }
      })
      .catch((err) =>
        res.status(500).send({ message: err.message || "Erro ao excluir doença" })
      );
};

exports.deleteAll = (req, res) => {
  Doenca.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} doenças foram excluídas` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Erro ao excluir doenças" });
    });
};