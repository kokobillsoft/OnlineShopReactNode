const Router = require('express'); // експортуємо Router із express
const router = new Router();         // створюємо класс router
const brandController = require ('../controllers/brandController'); // експортуємо контроллер 

router.post('/', brandController.create);  // в кожен виклик ми передаємо необхідний метод з контроллера, а не у вигляді виклику, а у вигляді передачі об'єкту
router.get('/', brandController.getAll);

module.exports = router;           // робимо експорт роутера