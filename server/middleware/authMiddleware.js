//мідлвейр в якому ми будемо кодувати токен та перевіряти його валідність
const jwt = require('jsonwebtoken');
require('dotenv').config(); //підключаємо файл параметрів оточення

module.exports = function (req, res, next){
    if (req.method === "OPTIONS") {                 // перевіряємо, якщо метод строго дорівнює OPTIONS то 
        next();                                     // даний мідлвейр пропускається (цікавить лише POST, GET, PUT, DELETE)
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Витягуємо токен з хедеру
        if (!token){
            res.status(401).json({message: "Користувач не авторизований"}); // Коли токен не пройшов перевірку - відсилаємо помилку 401
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // декодуємо токен, використовуючи пароль
        req.user = decoded // змінюємо для всіх операцій в даному ланцюгу інформацію про користувача, щоб працювати не з токеном, а з декодованими даними
        next(); // викликаємо наступний мідлвейр у ланцюжку.

    } catch(e) {
        res.status(401).json({message: "Користувач не авторизований"}); // Коли токен не пройшов перевірку - відсилаємо помилку 401
    }
}