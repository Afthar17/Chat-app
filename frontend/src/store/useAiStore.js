import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";

export const useAiStore = create((set, get) => ({
  aiMessages: [],
  isLoading: false,
  isThinking: false,
  isError: false,
  errorMessage: "",
  getAiResponses: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/chatbot/get-responses");
      set({ aiMessages: res.data });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      set({ isError: true });
      set({ errorMessage: error.message });
    }
  },
  sendPrompt: async (data) => {
    set({ isThinking: true });
    try {
      const { aiMessages } = get();
      const res = await axiosInstance.post("/chatbot/generate", data);
      set({ aiMessages: [...aiMessages, res.data.aiChat] });
      set({ isThinking: false });
    } catch (error) {
      set({ isThinking: false });
      set({ isError: true });
      set({ errorMessage: error.message });
    }
  },
}));
