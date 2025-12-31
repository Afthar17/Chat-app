import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const serverUrl =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : "https://chat-app-uz18.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Error signing up:", error);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successful");
      get().connectSocket();
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login failed");
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null, onlineUsers: [] });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket) return;

    const newSocket = io(serverUrl, {
      query: { userId: authUser._id },
      transports: ["websocket"],
      withCredentials: true,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));
