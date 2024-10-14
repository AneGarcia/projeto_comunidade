const config = require("../config/db.config.js");

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    config
);
const db = {};

db.sequelize = Sequelize;
db.sequelize = sequelize;

db.doencas = require("./doenca.model.js")(sequelize, Sequelize);
db.posts = require("./post.model.js")(sequelize, Sequelize);
db.respostas = require("./resposta.model.js")(sequelize, Sequelize);
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);

//Relacionamento 1:* entre usuario e post
db.usuarios.hasMany(db.posts);
db.posts.belongsTo(db.usuarios);

//Relacionamento 1:* entre usuario e post
db.usuarios.hasMany(db.respostas);
db.respostas.belongsTo(db.usuarios);

//Relacionamento *:* entre post e doenca
db.posts.belongsToMany(db.doencas, {through: "postDoenca"});
db.doencas.belongsToMany(db.posts, {through: "postDoenca"});

//Relacionamento 1:* entre post e resposta
db.posts.hasMany(db.respostas);
db.respostas.belongsTo(db.posts);

module.exports = db;