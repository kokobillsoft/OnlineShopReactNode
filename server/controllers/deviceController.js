const uuid = require ('uuid');  // додаємо модуль створення уникального ключа
const path = require('path');   // додаємо модуль для створення шляху до файлів зображень
const { Device, DeviceInfo } = require('../models/models'); // додаємо модуль Device, та DeviceInfo
const ApiError = require('../error/ApiError.js'); // додаємо модуль обробки помилок

class DeviceController {
    async create(req, res, next) {      // так як тут може виникнути помилка, обертаємо все в обробку помилок
        try{
        let {name, price, brandId, typeId, info} = req.body; // отримуємо з тіла запиту всі зазначені параметри
        const {img} = req.files;   // отримуємо з запиту файл (зображення товару)
        let fileName = uuid.v4() + ".jpg" // створюємо рандомне ім'я для зображення за допомогою модуля uuid

        img.mv(path.resolve(__dirname, '..', 'static', fileName)) //переміщуємо файл по шляху, який адаптується у відповідності до операційної системи (це робить resolve)
                                  //першим параметром передаємо __dirname (шлях до поточної папки), '..' - повертає на директорію назад, 'static' - назва нової папки
        
            const device = await Device.create({name, price, brandId, typeId, img: fileName}); // фактично створюємо об'єкт пристрою
            if (info){
            info=JSON.parse(info) // якщо info є в запиті, то ми його розпарсимо з JSON строки
            info.forEach(element => { // проходимося по розпарсеній інформації методом forEach
                DeviceInfo.create({   // створюємо для кожного параметра з інфо свій об'єкт
                    title: element.title,
                    description: element.description,
                    deviceId: device.id
                })  
            });                      // використовуючи функцію forEach записуємо всі розпарсені параметри у базу
        }

        return res.json(device);    // повертаємо інформацію на клієнт
        } catch (e) {               // у випадку помилки виконуємо next
            next(ApiError.badRequest(e.message)); // активуємо виконання помилки через badRequest і передаємо туди повідомлення з помилки
        };
    };
    async getAll(req, res) {
       let {brandId, typeId, limit, page}=req.query; // отримуємо параметри brandId, typeId з запиту (додаємо сторінку та кількість об'єктіа на сторінку)
        page = page || 1;      // якщо сторінка не вказана, то дефолтом у нас є перша сторінка
        limit = limit || 9;    // якщо ліміт не вказаний, то дефолтом вказуєо що буде 9 елементів на сторінку
        let offset = page * limit - limit; // вказуємо відступ, з яким ми будемо отримувати дані.
        
        let devices;
        if (!brandId && !typeId) {         // робимо розгалудження типу відповіді, якщо немає brandId, typeId - повертаємо всі девайси
            devices = await Device.findAndCountAll({limit, offset}); // записуємо в devices всі девайси з бази
        }
        if (brandId && !typeId) {          // робимо розгалудження типу відповіді, якщо немає brandId - повертаємо всі девайси по бренду
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset}); // записуємо в девайси всі девайси з бази, де є зазначений brandID;
        }
        if (!brandId && typeId) {          // робимо розгалудження типу відповіді, якщо немає typeId - повертаємо всі девайси по типу
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset}); // записуємо в девайси всі девайси з бази, де є зазначений deviceId;
        }
        if (brandId && typeId) {           // робимо розгалудження типу відповіді, повертаємо всі девайси по типу тренду 
            devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset});  // записуємо в девайси всі девайси з бази, де є зазначений deviceId і brandID;
        }
        return res.json(devices);        // виконуємо відправку інформації на клієнт
    };
    async getOne(req, res) {
        const {id} = req.params;
        const device = await Device.findOne({
            where:{id},
            include:[{model: DeviceInfo, as: 'info'}]  // Використовуємо поле includ, та модель яку ми хочемо отримати DeviceInfo і назву поля , яке буде в цьому об'єкті 'info'
        });
        return res.json(device);  // виконуємо відправку інформації на клієнт
    };
};

module.exports = new DeviceController();