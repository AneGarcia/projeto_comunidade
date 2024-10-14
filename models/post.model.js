module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define(
        "post",
        {
            titulo: {type: Sequelize.STRING},
            conteudo: {type: Sequelize.STRING},
            dataCriacao: {type: Sequelize.DATE},
            categoria: {type: Sequelize.STRING},
            imagem: {type: Sequelize.STRING},
        },
        {freezeTableName: true}
    );
    return Post;
};