const ApiError = require('../error/ApiError.js');  //імпортуємо класс обробки помилок

module.exports = function (err, req, res, next) {  //експортуємо функцію, що фактично є мідлвейр (помилка, запит, відповідь, наступна функція для мідлвеєра)
    if (err instanceof ApiError) {                 //робимо перевірку, якщо клас помилки відповідає ApiError
       return res.status(err.status).json({message: err.message})  //повертаємо на клієнт віпдовідь зі статус кодом, який будемо отримувати з помилки 
    }                                                              //і з повідомленням, яке ми помістимо у дану помилку і одразу завершуємо виконання, тому
                                                                   //використовуємо return
    return res.status(500).json({message: 'unregisterd error!'})   //якщо помилка потрапила така, яку ми не описали в ApiError, то повертаємо статус "500"
};                                 
