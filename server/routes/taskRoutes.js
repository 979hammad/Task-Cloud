import express from "express";
import { addTask, getAllTasks, updateTask, deleteTask } from "../controllers/taskFunc.js";
import wrapAsync from "../Middlewares/wrapAsync.js";
import { isLoggedIn } from "../Middlewares/isLoggedIn.js";
import { connectionDB } from "../dataBase/dataBase.js";
const router = express.Router();

router.use(async(req, res, next) => {
    req.db = await connectionDB();
    next();
});

router.route("/add/task").post(wrapAsync(isLoggedIn), wrapAsync(addTask));
router.route("/get/tasks").get(wrapAsync(isLoggedIn), wrapAsync(getAllTasks));
router.route("/delete/:id").delete(wrapAsync(isLoggedIn), wrapAsync(deleteTask));
router.route("/update/:id").post(wrapAsync(isLoggedIn), wrapAsync(updateTask));

export default router;