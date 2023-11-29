const { Router } = require("express");

const isAuth = require("../middleware/is-admin");
const adminServices = require("../controller/admin");

const router = Router({ strict: true });

router.post("/adminlogin", adminServices.login);
router.get("/auth-admin", isAuth, adminServices.getAuthAdmin);
router.get("/users", isAuth, adminServices.getUsers);
router
  .route("/users/:id")
  .patch(isAuth, adminServices.updateUser)
  .delete(isAuth, adminServices.deleteUser);

module.exports = router;
