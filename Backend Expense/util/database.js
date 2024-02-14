const Sequelize =require('sequelize')

const sequelize= new Sequelize('college', 'root','15046@har', {
    dialect: 'mysql',
    host: 'localhost',

});
module.exports= sequelize;
