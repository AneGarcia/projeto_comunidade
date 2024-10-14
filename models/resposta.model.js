module.exports = (sequelize, Sequelize) => {
    const Resposta = sequelize.define(
        "resposta",
        {
            conteudo: {type: Sequelize.STRING},
            dataCriacao: {type: Sequelize.DATE},
            imagem: {type: Sequelize.STRING},
        },
        {freezeTableName: true}
    );
    return Resposta;
};