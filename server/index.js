require('dotenv').config(); //підключаємо файл параметрів оточення
const express = require('express'); //імпорт модуля у файл
const sequelize = require('./db.js'); //імпорт налаштувань зв'язку з БД
const models = require('./models/models.js'); //імпорт модулей для БД
const cors = require('cors'); // імпорт модулей для зв'язку сайту з сервером
const fileUpload = require ('express-fileupload'); //імпорт модуля для роботи з файлами
const router = require ('./routes/index.js'); // імпорт роутінгу
const errorHandler = require ('./middleware/ErrorHandlingMiddleware.js') // імпорт мідлевеєру обробки помилок
const path = require('path');

const PORT = process.env.PORT || 5000; //Використовуємо змінну з файлу параметрів оточення, вираз "|| 5000" означає, що якщо змінна не знайдеться - буде дефолтне значення 5000 

const app = express(); // створюємо об'єкт визиваючи функцію express
app.use(cors()); // передаємо в app  cors
app.use(express.json()); // для можливості парсингу JSON формату
app.use(fileUpload({}));  // передаємо в програму можливість завантаження файлів
app.use(express.static(path.resolve(__dirname, 'static')))  // робимо так, щоб наші картинки відображалися в браузері
app.use('/api', router); // передаємо в программу таблицю роутерів

//last middleware


app.get('/', (req,res) => {                        // тестер для відповіді серверу
    res.status(200).json({message: 'Working!!!'})
});

app.use(errorHandler); // це фінальний мідлвейр, тому що він оброблює помилки, тому ми в ньому не використовували функціона next
const start = async () => {
    try {
        await sequelize.authenticate()       //функція що встановлює пидключення до БД, функція асінхронна, тому використовуємо  ! await !
        await sequelize.sync()               //поривнює стан БД зі схемою данних
        app.listen(PORT, () => console.log("Server started on port "+ PORT)) //викликаємо у app функцію listen () =>console.log - колбек, який відпряцює після успішного запуску сервера
    }
    catch(e) {
        console.log(e);
    }
}


start();
