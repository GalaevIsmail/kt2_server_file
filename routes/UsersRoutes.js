import { Router } from "express";
import UsersController from "../controllers/UsersController.js";

const router = new Router();


router.get("/user",UsersController.getUser)
router.get("/user/:id", UsersController.getOneUser)
router.post("/user", UsersController.addUser)
router.patch("/user/:id", UsersController.updateUser)
router.delete("user/:id", UsersController.deleteUser)

export default router