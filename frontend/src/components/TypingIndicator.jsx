import React from "react";

const TypingIndicator = () => {
  return (
    <div className="flex space-x-1 items-center">
      <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
      <span
        className="w-2 h-2 bg-black rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></span>
      <span
        className="w-2 h-2 bg-black rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></span>
    </div>
  );
};

export default TypingIndicator;
