import { aiResponse } from "../lib/gemini.js";
import { checkImageStatus, generateImage } from "../lib/imageGeneration.js";
import { AIChat } from "../models/aiResponses.model.js";

export const aiResponseGenerator = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }
    const response = await aiResponse(prompt);
    if (!response) {
      return res.status(500).json({ message: "AI response generation failed" });
    }
    const aiChat = new AIChat({ userId: req.user._id, prompt, response });
    await aiChat.save();
    res.status(200).json({ aiChat });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getResponses = async (req, res) => {
  try {
    const aiChats = await AIChat.find({ userId: req.user._id }).sort({
      createdAt: 1,
    });
    res.status(200).json(aiChats);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const generateImageController = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }
    const response = await generateImage(prompt);
    const taskId = response.data.task_id;
    let result;
    let attempts = 0;
    while (attempts > 30) {
      result = await checkImageStatus(taskId);

      if (result.data.status === "COMPLETED") {
        return res.status(200).json({ images: result.data.generated });
      }

      if (result.data.status === "FAILED") {
        return res.status(500).json({ message: "Image generation failed" });
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    res.status(200).json({
      message: "Image generation still in progress",
      response: response.data.task_id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
