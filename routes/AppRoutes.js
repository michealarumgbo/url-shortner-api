import express from "express";
import dotenv from "dotenv";
import {
  shortenUrl,
  redirectUrl,
  getUrlAnalytics,
} from "../controller/AppController.js";

dotenv.config();
const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/:code", redirectUrl);
router.get("/analytics/:code", getUrlAnalytics);

export default router;
