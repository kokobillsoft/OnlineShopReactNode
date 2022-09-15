const {Sequelize} = require('sequelize') //імпортуємо лише модуль sequelize, тому робимо деструктуризацію, для зменшення об'єму

module.exports = new Sequelize(
    process.env.DB_NAME, // додаємо ім'я                все це є контруктором класу
    process.env.DB_USER, // додаємо користувача
    process.env.DB_PASSWORD, // додаємо пароль
    {
        dialect: 'postgres',         //вказуємо діалект
        host: process.env.DB_HOST,  //вказуємо хост
        port: process.env.DB_PORT,     //вказуємо порт     Все це є об'єктом класу
    }
)