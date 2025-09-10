import {
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  User,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();
  const location = useLocation();
  const { authUser } = useAuthStore();
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/signup") {
      setActiveLink("Login");
    } else if (location.pathname === "/login") {
      setActiveLink("Signup");
    } else {
      setActiveLink("");
    }
  }, [location]);
  return (
    <div className="p-4 bg-[#16324F] sticky top-0 z-50">
      <div className="hidden lg:flex justify-between items-center ">
        <div className="flex">
          <MessageSquare className=" size-6 text-[#219ebc] mt-1" />
          <Link to="/" className="text-lg text-[#E0E2DB] font-semibold ml-2">
            Sandhesham
          </Link>
        </div>
        <div className="flex gap-8 mr-10">
          <Link
            to={activeLink === "Login" ? "/login" : "/signup"}
            className="text-[#E0E2DB] font-semibold mt-1 flex"
          >
            {activeLink}
          </Link>
          {authUser && (
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center font-semibold rounded-xl text-sm px-3 py-1 gap-2 text-[#E0E2DB]"
            >
              <MessageSquare />
              Chat
            </motion.button>
          )}
          {authUser && (
            <motion.button
              onClick={() => navigate("/aichatbot")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[60%] flex items-center text-sm justify-center bg-[#98d9c2] py-2 px-3 rounded-2xl my-2 font-semibold text-[#403233] text-center"
            >
              <Sparkles className="mr-2 w-5 h-5 text-[#6B5CA5]" />
              Gemini
            </motion.button>
          )}
          {authUser && (
            <motion.button
              onClick={() => navigate("/profile")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center font-semibold rounded-xl text-sm px-3 py-1 gap-2 text-[#E0E2DB]"
            >
              <User />
              Profile
            </motion.button>
          )}
          {authUser && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => logout()}
              className="flex items-center font-semibold rounded-xl text-sm px-3 py-1 gap-2 text-[#E0E2DB]"
            >
              Logout <LogOut size={20} />
            </motion.button>
          )}
        </div>
      </div>
      <div className="flex lg:hidden justify-between items-center">
        <div className="flex">
          <MessageSquare className=" size-6 text-[#219ebc] " />
          <Link
            to="/"
            className="text-sm text-[#E0E2DB] font-semibold ml-1 mt-0.5"
          >
            Sandhesham
          </Link>
        </div>
        <div>
          {!isOpen && (
            <Menu className="text-[#E0E2DB]" onClick={() => setIsOpen(true)} />
          )}
        </div>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-[#13293D] z-10 flex flex-col items-center justify-center gap-6 "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <X
              className="text-[#E0E2DB] fixed top-4 right-4"
              onClick={() => setIsOpen(false)}
            />
            <Link
              to={activeLink === "Login" ? "/login" : "/signup"}
              className="text-[#E0E2DB] font-semibold mt-1 flex"
              onClick={() => setIsOpen(false)}
            >
              {activeLink}
            </Link>
            {authUser && (
              <motion.button
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center font-semibold rounded-xl text-sm px-3 py-1 gap-2 text-[#E0E2DB]"
              >
                <MessageSquare />
                Chat
              </motion.button>
            )}
            {authUser && (
              <motion.button
                onClick={() => navigate("/aichatbot")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-[60%] flex items-center text-sm justify-center bg-[#98d9c2] py-2 px-3 rounded-2xl my-2 font-semibold text-[#403233] text-center"
              >
                <Sparkles className="mr-2 w-5 h-5 text-[#6B5CA5]" />
                Gemini
              </motion.button>
            )}
            {authUser && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center font-semibold rounded-xl text-sm px-3 py-1 gap-2 text-[#E0E2DB]"
                onClick={() => setIsOpen(false)}
              >
                <User />
                Profile
              </motion.button>
            )}
            {authUser && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center font-semibold rounded-xl text-sm px-3 py-1 gap-2 text-[#E0E2DB]"
              >
                Logout <LogOut size={20} />
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
