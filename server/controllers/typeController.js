const {Type} = require ('../models/models.js');  // імпортуємо модель типів використовуючи деструктиризацію
const ApiError = require ('../error/ApiError.js'); // імпортуємо обробку помилок
class TypeRouter{
    async create (req,res) {
        const {name} = req.body;                  // використовуючи диструктиризацію витягуємо з тіла запиту name
        const type = await Type.create ({name})   // використовуючи Type.create (create метод sequelize), створюємо даний тип
        return res.json(type);                    // повертаємо створений тип у форматі JSON, id буде присвоєно автоматично
    };
    async getAll (req,res) {                      
        const types = await Type.findAll();       // використовуючи Type.findAll (findAll метод sequelize), знаходимо всі дані такого типу
        return res.json(types);                   // повертаємо знайдені типи у відповідь на запит
    };
}

module.exports = new TypeRouter();