class ApiError extends Error {                     // створюємо клас обробки помилок, даний клас буде розшірювати Error, тому виконаємо наслідування
    constructor(status, message){    // створюємо конструктор классу, який буде отримувати статус та повідомлення яке будемо повертати на клієнт
        super();                     // визиваємо батьківський контруктор
        this.status = status;        // присвоюємо те, що отримаємо параметрами
        this.message = message;
    }    
    
    static badRequest(message){
        return new ApiError(404, message);
    }                                // створюємо статичні методи(їх можна викликати без створення нового об'єкту)

    static internal(message){
        return new ApiError(500, message);
    }

    static forbiden(message){
        return new ApiError(403, message);
    }
}

module.exports = ApiError;