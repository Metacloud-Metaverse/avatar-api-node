const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.ts");
const avatarController = require("../controllers/AvatarController.ts");


router.post('/avatar/save', avatarController.saveAvatar)
router.get('/avatar/fetch/:user_id', avatarController.fetchAvatar)


module.exports = router;
    