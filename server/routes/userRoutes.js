import express from "express";
import { signin, signUp, myProfile, deleteMyAccount } from "../controllers/userFunc.js";
import wrapAsync from "../Middlewares/wrapAsync.js";
import { connectionDB } from "../dataBase/dataBase.js";
import { isLoggedIn } from "../Middlewares/isLoggedIn.js";
const router = express.Router();

router.use(async(req, res, next) => {
    req.db = await connectionDB();
    next();
});

router.route("/signup").post(wrapAsync(signUp));
router.route("/login").post(wrapAsync(signin));
router.route("/myProfile").get(wrapAsync(isLoggedIn), wrapAsync(myProfile));
router.route("/delete/account").delete(wrapAsync(isLoggedIn), wrapAsync(deleteMyAccount));

export default router;