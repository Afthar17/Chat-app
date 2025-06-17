import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);
      toast.error("Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
      toast.error("Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Error sending message");
      console.log(error);
    }
  },
  subscribeToMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessages", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unSubscribeToMessages: async () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessages");
  },
  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
  },
}));
