"use client";
import { useEffect, useState, useRef } from "react";
import { Message, useChat } from "ai/react";
import { Computer, Loader2, Send, User } from "lucide-react";

import { cn } from "../lib/utils";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { PromptSuggestions } from "./PromptSuggestions";

const HISTORY_KEY = "chat_history";
const MAX_HISTORY_LENGTH = 20; // Adjust as needed

export function SearchBar() {
  const [dots, setDots] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null); // Reference to the scrollable container

  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
  } = useChat({
    onFinish: () => {
      const userMessage = messages[messages.length - 2];
      const aiMessage = messages[messages.length - 1];

      if (userMessage && aiMessage) {
        // Parse and filter the current history to ensure uniqueness
        let storedMessages = JSON.parse(
          localStorage.getItem(HISTORY_KEY) || "[]",
        ).filter(
          (msg: Message, index: number, self: Message[]) =>
            index ===
            self.findIndex(
              (m) => m.role === msg.role && m.content === msg.content,
            ),
        );

        // Check if the message pair does not exist
        if (
          !storedMessages.some(
            (msg: Message) =>
              (msg.role === userMessage.role &&
                msg.content === userMessage.content) ||
              (msg.role === aiMessage.role &&
                msg.content === aiMessage.content),
          )
        ) {
          storedMessages.push(userMessage, aiMessage);

          // Manage history length
          if (storedMessages.length > MAX_HISTORY_LENGTH) {
            storedMessages = storedMessages.slice(-MAX_HISTORY_LENGTH);
          }

          localStorage.setItem(HISTORY_KEY, JSON.stringify(storedMessages));
          setChatHistory(storedMessages);
        }
      }
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 800);

    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      // Ensure we only set unique messages in state
      setChatHistory(
        JSON.parse(savedHistory).filter(
          (msg: Message, index: number, self: Message[]) =>
            index ===
            self.findIndex(
              (m) => m.role === msg.role && m.content === msg.content,
            ),
        ),
      );
    }

    return () => clearInterval(interval);
  }, []);

  // New useEffect for scrolling
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePrompt = (promptText: string) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      content: promptText,
      role: "user",
    };
    append(msg);
  };

  const handleHistoryItemClick = (query: string) => {
    setInput(query);
  };

  const noMessages = !messages || messages.length === 0;

  return (
    <section className="w-full mx-auto h-[800px] flex flex-col">
      <h2 className="text-white text-[12px] leading-3">
        Your journey through the cosmos begins here. Ask a question to explore
        the wonders of space.
      </h2>
      <div className="my-4 flex-shrink-0">
        <PromptSuggestions onSuggestionClickAction={handlePrompt} />
      </div>
      <div
        ref={scrollRef} // attach the ref here
        className="flex-1 overflow-y-auto hide-scroll border-2 border-white mb-4 space-y-4 scrollbar-none bg-gradient-to-r from-slate-900 to-slate-700 rounded-3xl p-4"
      >
        {noMessages ? (
          <p className="flex items-baseline gap-x-1 text-white">
            Results will be shown here <span>{dots}</span>
          </p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "p-2.5 flex items-start gap-2",
                message.role === "user"
                  ? "ml-auto flex-row-reverse"
                  : "mr-auto",
                isLoading && index === messages.length - 1 && "animate-pulse",
              )}
            >
              <div
                className={cn(
                  "rounded-full p-2 flex-shrink-0",
                  message.role === "user" ? "bg-blue-500" : "bg-gray-300",
                )}
              >
                {message.role === "user" ? (
                  <User className="w-3 h-3 text-white" />
                ) : (
                  <Computer className="w-3 h-3 text-gray-700" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-xl p-2 w-[85%]",
                  message.role === "user" ? "bg-blue-100" : "bg-gray-100",
                )}
              >
                <p
                  className={cn(
                    "text-[10px] leading-4 w-full break-words",
                    message.role === "user" ? "text-blue-800" : "text-gray-800",
                  )}
                >
                  {message.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center space-x-2 mt-4"
      >
        <Input
          type="text"
          placeholder="Ask a question about space..."
          onChange={handleInputChange}
          value={input}
          className="rounded-xl py-1 px-2 text-[10px] bg-gradient-to-r from-slate-700 to-slate-300 text-white"
        />
        <Button
          type="submit"
          variant="default"
          size="icon"
          className="rounded-full w-8 h-8 bg-white hover:bg-white/90 transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Send className="w-3 h-3" />
          )}
        </Button>
      </form>
      <SearchHistory
        onHistoryItemClick={handleHistoryItemClick}
        chatHistory={chatHistory}
      />
    </section>
  );
}

interface SearchHistoryProps {
  onHistoryItemClick: (query: string) => void;
  chatHistory: Message[];
}

function SearchHistory({
  onHistoryItemClick,
  chatHistory,
}: SearchHistoryProps) {
  return (
    <div className="mt-4">
      <h3 className="text-white text-[12px] mb-2">Search History</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 xl:flex xl:flex-wrap">
        {chatHistory
          .filter((message) => message.role === "user")
          .slice(-20)
          .reverse()
          .map((message, index) => (
            <button
              key={message.id || index}
              onClick={() => onHistoryItemClick(message.content)}
              className="w-fit text-left text-[10px] text-white bg-slate-800 hover:bg-slate-700 rounded-xl py-1 px-2 fade-in leading-4"
            >
              {message.content}
            </button>
          ))}
      </div>
    </div>
  );
}
