const Sequelize=require('sequelize');

const sequelize=new Sequelize('nodecomplete','root','password',{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;