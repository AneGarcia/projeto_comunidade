module.exports = (sequelize, Sequelize) => {
    const Resposta = sequelize.define(
        "resposta",
        {
            conteudo: {type: Sequelize.STRING},
            data_criacao: {type: Sequelize.DATE},
            imagem: {type: Sequelize.STRING},
        },
        {freezeTableName: true}
    );
    return Resposta;
};