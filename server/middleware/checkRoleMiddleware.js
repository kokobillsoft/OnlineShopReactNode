const jwt = require('jsonwebtoken');

module.exports = (role) => {    //експортуємо функцію, що параметром приймає роль і повертає мідлвейр
    return function (req, res, next){
        if (req.method === "OPTIONS") {                 // перевіряємо, якщо метод строго дорівнює OPTIONS то 
            next();                                     // даний мідлвейр пропускається (цікавить лише POST, GET, PUT, DELETE)
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Витягуємо токен з хедеру (його тип Bearer(цей тип вказується в хедері і після нього через пробіл токен))
            if (!token){
                res.status(401).json({message: "Користувач не авторизований"}); // Коли токен не пройшов перевірку - відсилаємо помилку 401
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY); // декодуємо токен, використовуючи пароль
            if(decoded.role !== role){                                 // 
                return res.status(403).json({message: "Немає доступу "+role});
            }
            req.user = decoded // змінюємо для всіх операцій в даному ланцюгу інформацію про користувача, щоб працювати не з токеном, а з декодованими даними
            next(); // викликаємо наступний мідлвейр у ланцюжку.
    
        } catch(e) {
            res.status(401).json({message: "Користувач не авторизований"}); // Коли токен не пройшов перевірку - відсилаємо помилку 401
        }
    }
}