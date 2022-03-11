const { Router } = require("express");
const router = Router();
const homeController = require("../controllers/HomeController.ts");
const avatarController = require("../controllers/AvatarController.ts");



router.get('/home/test', homeController.test)
router.get('/home/test-db', homeController.testDb)
router.get('/avatar/test', avatarController.testAvatar)
router.post('/avatar/save', avatarController.saveAvatar)
router.post('/avatar/fetch/:user_id', avatarController.fetchAvatar)


module.exports = router;
    