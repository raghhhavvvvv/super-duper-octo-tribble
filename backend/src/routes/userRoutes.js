import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getUser } from "../controller/userController.js";

const router = express.Router();

router.get("/user", verifyToken, getUser);

export default router;