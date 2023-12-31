import express from "express";
import {getAllUsers} from "../controller/User.controller";
import {verifyToken} from "../middlewares/VerifyToken";

const router = express.Router();
router.get("",verifyToken, getAllUsers);
export default router;
