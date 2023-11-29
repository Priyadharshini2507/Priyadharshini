const express = require('express');
const router = express.Router();
const taskController = require('../controller/controller');
const userServices=require('../controller/user');
const isAuth=require('../middleware/is-user')
router.post("/login", userServices.login);
router.post("/register", userServices.register);
router.get("/register",taskController.getUsers);
router.get("/auth-user", isAuth, userServices.getAuthUser);
router.delete('/register/:id',  taskController.deleteUser);
router.delete('/task/:id',  taskController.deletetask);
router.post("/task",taskController.createtask);
router.get("/task",taskController.gettask);
router.get("/task/:id",taskController.gettaskbyid);
router.put("/task/:id",taskController.updatetask);
router.get("/taskFind/:id", taskController.getStatus)
module.exports=router;