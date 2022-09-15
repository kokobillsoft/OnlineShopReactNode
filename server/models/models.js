const sequelize = require('../db.js');   //імпортуємо модуль, що ми створили
const {DataTypes} = require('sequelize');  // імпортуємо клас DataTypes, за допомогою нього описуються типи того чи іншого поля БД

const User = sequelize.define('user', {    // в параметрах ми вказуємо назву моделі, а далі в об'єкті вказуємо її параметри
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},          //Вказуємо тип має бути інтежер, і автоматично призначується
    email: {type: DataTypes.STRING, unique: true},                                  //Вказуємо тип стрінг, unique - вказує шо це поле має бути уникальним
    password: {type: DataTypes.STRING}, 
    role: {type: DataTypes.STRING, defaultValue: "USER"}, 
});

const Basket = sequelize.define ('basket' ,{                                       // В цих описах не використовуються зв'язки (user_id, device_id та подібні)
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
});

const BasketDevice = sequelize.define ('basket_device' ,{                                       // В цих описах не використовуються зв'язки (user_id, device_id та подібні)
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
});

const Device = sequelize.define ('device' ,{                                       // В цих описах не використовуються зв'язки (user_id, device_id та подібні)
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    price: {type: DataTypes.INTEGER, allowNull: false},                            // allowNull, вказуємо, що дане поле не може бути NULL
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
});

const Type = sequelize.define ('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
});

const Brand = sequelize.define ('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    name: {type: DataTypes.STRING, unique: true},
})

const Rating = sequelize.define ('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {                          //для створення зв'язкив між елементами у форматі manyToMany, необхідно створювати проміжну властивість
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
})

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo, {as: 'info'}); // позначаємо що параметри відповідності позначаються як info
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, {through: TypeBrand});    //для створення зв'язкив між елементами у форматі manyToMany, необхідно створювати проміжну властивість
Brand.belongsToMany(Type, {through: TypeBrand});     //створюємо її вище

module.exports = {                             
    User, Basket, BasketDevice, Device, Type, Brand, Rating, DeviceInfo, TypeBrand    //робімо експорт для можлівості користування у інших місцях
}

