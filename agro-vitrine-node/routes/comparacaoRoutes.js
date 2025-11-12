import express from "express";
import { getComparador, postComparar } from "../controllers/comparacaoController.js";
import { ensureAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", ensureAuth, getComparador);
router.post("/", ensureAuth, postComparar);

export default router;
