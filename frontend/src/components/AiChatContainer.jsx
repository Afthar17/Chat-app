import React, { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useAiStore } from "../store/useAiStore";
import { Loader, Sparkles } from "lucide-react";
import AiChatInput from "./AiChatInput";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TypingIndicator from "./TypingIndicator";

const AiChatContainer = () => {
  const messageEndRef = useRef(null);
  const [tempPrompt, setTempPrompt] = useState(null);
  const { getAiResponses, aiMessages, isLoading, isThinking } = useAiStore();
  useEffect(() => {
    getAiResponses();
  }, []);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-black">
        <Loader size={50} className="animate-spin" />
        <p className="text-xl font-semibold mt-3 animate-bounce transition duration-300">
          Loading...
        </p>
      </div>
    );
  console.log(isLoading);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="flex-1 overflow-y-auto p-0 md:p-4 space-y-4 mb-30">
        {aiMessages.length === 0 && !isLoading && !isThinking ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-black">
            <Sparkles size={50} className="animate-bounce text-[#219ebc]" />
            <p className="text-xl font-semibold mt-3 animate-bounce transition duration-300">
              Ask anything
            </p>
          </div>
        ) : (
          <>
            {aiMessages.map((message, idx) => (
              <AiMessage message={message} key={idx} />
            ))}
            {isThinking && tempPrompt && (
              <AiMessage
                message={{ prompt: tempPrompt, response: "" }}
                isThinking
              />
            )}
            <div className="h-10" ref={messageEndRef} />
          </>
        )}
      </div>
      <AiChatInput setTempPrompt={setTempPrompt} />
    </div>
  );
};

export default AiChatContainer;

function AiMessage({ message, isThinking }) {
  const { authUser } = useAuthStore();

  return (
    <>
      {/* User bubble */}
      <div className="chat chat-end">
        <div className="chat-image">
          <div className="size-10 rounded-full border-2 border-[#219ebc] relative">
            <img
              src={authUser.profilePic || "/avatar.png"}
              className="w-9 h-9 absolute rounded-full"
              alt=""
            />
          </div>
        </div>
        <div className="chat-header mb-1">
          {message.createdAt && (
            <time className="text-xs opacity-50">
              {message.createdAt.split("T")[1].split(".")[0]}
            </time>
          )}
        </div>
        <div className="chat-bubble flex flex-col bg-[#baf8de]">
          <p className="text-sm text-[#14241d]">{message.prompt}</p>
        </div>
      </div>

      {/* AI bubble */}
      <div className="chat chat-start">
        <div className="chat-image">
          <div className="size-10 rounded-full border-2 flex items-center justify-center border-[#219ebc] relative">
            <Sparkles className="w-6 h-6 absolute rounded-full text-[#219ebc]" />
          </div>
        </div>
        <div className="chat-bubble flex flex-col bg-[#baf8de] overflow-x-scroll md:overflow-x-hidden">
          {isThinking ? (
            <TypingIndicator />
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.response}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </>
  );
}
