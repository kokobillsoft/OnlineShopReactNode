const Router = require('express'); // експортуємо Router із express
const router = new Router();         // створюємо класс router
const typeController = require ('../controllers/typeController') // експортуємо контроллер 

router.post('/', typeController.create);  // в кожен виклик ми передаємо необхідний метод з контроллера, а не у вигляді виклику, а у вигляді передачі об'єкту
router.get('/', typeController.getAll);

module.exports = router;           // робимо експорт роутера