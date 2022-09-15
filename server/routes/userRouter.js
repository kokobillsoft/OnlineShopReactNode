const Router = require('express'); // експортуємо Router із express
const userController = require('../controllers/userController');  // експортуємо контроллер 
const router = new Router();         // створюємо класс router

router.post('/registration', userController.registration);     // в кожен виклик ми передаємо необхідний метод з контроллера, а не у вигляді виклику, а у вигляді передачі об'єкту
router.post('/login', userController.login);
router.get('/auth', userController.check);

module.exports = router;           // робимо експорт роутера