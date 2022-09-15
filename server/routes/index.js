const Router = require('express'); // експортуємо Router із express
const router = new Router();         // створюємо класс router
const deviceRouter = require('./deviceRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const userRouter = require ('./userRouter');


router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

module.exports = router;           // робимо експорт роутера