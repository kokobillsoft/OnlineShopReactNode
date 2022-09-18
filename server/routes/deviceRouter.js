const Router = require('express'); // експортуємо Router із express
const router = new Router();         // створюємо класс router
const deviceController = require('../controllers/deviceController'); // експортуємо контроллер 
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware'); 

router.post('/', checkRoleMiddleware('ADMIN'), deviceController.create);  // в кожен виклик ми передаємо необхідний метод з контроллера, а не у вигляді виклику, а у вигляді передачі об'єкту
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;           // робимо експорт роутера