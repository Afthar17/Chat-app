import { SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useAiStore } from "../store/useAiStore";

const AiChatInput = ({ setTempPrompt }) => {
  const [text, setText] = useState("");
  const { sendPrompt, isThinking } = useAiStore();
  const handlePrompt = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const currentText = text.trim();
    setText("");
    setTempPrompt(currentText);
    try {
      await sendPrompt({ prompt: currentText });
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full px-4 pb-2 bg-white border-t flex  justify-center fixed bottom-0">
      <form
        onSubmit={handlePrompt}
        className="flex items-center justify-center w-[90%] md:w-[70%] gap-4 mt-2"
      >
        <div className="flex-1 flex gap-2 justify-center items-center">
          <input
            type="text"
            className="w-full py-6 px-2 rounded-3xl input-sm sm:input-lg text-[#403233] bg-[#EFEFF0] shadow-xl border border-[#403233]/50 focus:outline-none "
            placeholder="    Ask anything..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="disabled:text-[#5c6162] text-black"
          disabled={!text.trim() || isThinking}
        >
          <SendHorizontal size={20} className={` `} />
        </button>
      </form>
    </div>
  );
};

export default AiChatInput;
