const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user");

router.get("/", controller.get);
router.post("/",controller.post)
router.delete('/:id',controller.delete)
router.patch('/:id',controller.patch)
// router
//   .route("/:userId")
//   .all(checkAuth.user)
//   .put(userController.update)
//   .get(userController.userProfile);

module.exports = router;
