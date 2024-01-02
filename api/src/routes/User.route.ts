import express from "express";
import {getAllUsers} from "../controller/User.controller";

const router = express.Router();
router.get("", getAllUsers);
export default router;