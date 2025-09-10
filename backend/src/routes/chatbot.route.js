import express from "express";
import {
  aiResponseGenerator,
  generateImageController,
  getResponses,
} from "../controllers/aiChatbotController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/get-responses", protectRoute, getResponses);
router.post("/generate", protectRoute, aiResponseGenerator);
router.post("/generate-image", protectRoute, generateImageController);

export default router;
