const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.ts");
const homeController = require("../controllers/HomeController.ts");
const avatarController = require("../controllers/AvatarController.ts");



router.get('/home/test', homeController.test)
router.get('/home/test-db', homeController.testDb)
router.post('/avatar/save', avatarController.saveAvatar)
router.get('/avatar/fetch/:user_id', avatarController.fetchAvatar)
router.get("/home/test-jwt", auth, homeController.authenticateToken)


module.exports = router;
    