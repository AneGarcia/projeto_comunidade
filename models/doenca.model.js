module.exports = (sequelize, Sequelize) => {
    const Doenca = sequelize.define(
        "doenca",
        {
            nome: { type: Sequelize.STRING},
            descricao: {type: Sequelize.STRING},
        },
        {freezeTableName: true}
    );
    return Doenca;
};