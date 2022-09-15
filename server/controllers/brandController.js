const { Brand } = require("../models/models");     // імпортуємо модель типів використовуючи деструктиризацію
const ApiError = require ('../error/ApiError.js'); // імпортуємо обробку помилок

class BrandController {
    async create(req, res) {      
        const {name} = req.body;                   // використовуючи диструктиризацію витягуємо з тіла запиту name
        const brand = await Brand.create({name});  // використовуючи Brand.create (create метод sequelize), створюємо даний тип
        return res.json(brand);                    // повертаємо створений тип у форматі JSON, id буде присвоєно автоматично
    };

    async getAll(req, res) {
        const brands = await Brand.findAll();      // використовуючи Brand.findAll (findAll метод sequelize), знаходимо всі дані такого типу
        return res.json(brands)                    // повертаємо знайдені типи у відповідь на запит
    }; 
}

module.exports = new BrandController();