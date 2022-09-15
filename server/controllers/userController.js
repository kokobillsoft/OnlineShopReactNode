require('dotenv').config(); //підключаємо файл параметрів оточення
const ApiError = require("../error/ApiError");  //імпортуємо класс ApiError
const bcrypt = require('bcrypt');               //підключаємо модуль для хешування паролей
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');  // підключаємо моделі користувача та корзини

const generateJwt = (id, email, role) => {
    return jwt.sign(                            // генеруємо JWT токен. Використовуючи метод sign. 
    {id, email, role},                        // Передаємо першим параметром Payload (id, email, role)
    process.env.SECRET_KEY,                            // Передаємо другим параметром секретний ключ з env файла
    {expiresIn: '24h'},                                // вказуємо час життя токену
    )                               
}

class UserController {                  // створюємо класс для корістувача
    async registration(req, res, next) {       // метод реєстрації
        const {email, password, role} = req.body // отримуємо з запиту значення імейла, пароля та ролі

        if (!email || !password) // робимо перевірку на наявність логіна та пароля
        {
            return next(ApiError.badRequest('Не вистачає емейлу чи паролю'));  // Надсилаємо в алгоритм обробки помилок тип помилки та повідомлення
        }
        
        const candidate = await User.findOne ({where:{email}}); // виконуємо перевірку на наявність введеної пошти в БД
        
        if (candidate){                                         // Якщо в базі було знайдено користувача з таким емейлом, то знов виводимо помилку
            return next(ApiError.badRequest('Даний користувач Email вже зареєстровано'));
        }
        const hashPassword = await bcrypt.hash(password, 5); //якщо користувача знайдено не було, то виконуємо хешування паролю. 
                                                             //Передаємо пароль та кількість разів хешування.
        const user = await User.create({email, role, password: hashPassword}); // створюємо в БД користувача
        const basket = await Basket.create({userId: user.id}); // створюємо корзину для користувача, передавши id користувача
        const token = generateJwt(user.id, user.email, user.role); // викликаємо функцію генерації токена

        return res.json({token});                              // повертаємо токен на клієнта
    }

    async login (req, res, next) {             // метод логіювання (входу)
        const {email, password} = req.body;    // отримуємо з запиту значення імейла, пароля
        const user = await User.findOne({where: {email}}); // шукаємо в базі запис з таким імейлом
        if (!user){                                        
            return next(ApiError.internal('Даний користувач не зареєстрований')); 
        }
        let comparePassword = bcrypt.compareSync(password, user.password);     //  виконуємо порівняння пароля з хешем пароля в БД
        if (!comparePassword) {
            return next(ApiError.internal('Введено не вірний пароль'));
        }
        const token = generateJwt (user.id, user.email, user.role); // викликаємо функцію генерації токена
        return res.json({token});                              // повертаємо токен на клієнта
    }

    async check(req, res, next) {       // метод перевірки входу
        const {id} = req.query          // використовуємо диструктизатор {}, щоб витягнути з запиту лише id
        if(!id){                        // якщо в запиті немає id
           return next(ApiError.badRequest('id not specified'))  // активуємо виконання методу badRequest, і передаємо причину в повідомленні
        }
        res.json(id);
    }
}

module.exports = new UserController();  // даний клас повертає новий об'єкт створений з цього классу