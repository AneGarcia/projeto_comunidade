module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define(
        "usuario",
        {
            nome: {type: Sequelize.STRING},
            email: {type: Sequelize.STRING},
            senha: {type: Sequelize.STRING},
            tipo_usuario: {type: Sequelize.STRING},
            data_nascimento: {type: Sequelize.DATE},
            foto_perfil: {type: Sequelize.STRING},
        },
        {freezeTableName: true}
    );
    return Usuario;
};