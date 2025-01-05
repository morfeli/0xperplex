"use client";

import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Message, useChat } from "ai/react";
import { Computer, Loader2, Send, User } from "lucide-react";
import { cn } from "../lib/utils";
import { PromptSuggestions } from "./PromptSuggestions";
import { useEffect, useState } from "react";

export function SearchBar() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    data,
  } = useChat();

  useEffect(() => {
    console.log(messages, data);
  }, [messages, data]);

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
    <section className="w-full mx-auto  h-[800px] flex flex-col">
      <h2 className="text-white text-[12px] leading-3">
        Your journey through the cosmos begins here. Ask a question to explore
        the wonders of space.
      </h2>
      <div className="my-4 flex-shrink-0">
        <PromptSuggestions onSuggestionClickAction={handlePrompt} />
      </div>
      <div className="flex-1 overflow-y-auto border-2 border-white mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-none bg-gradient-to-r from-slate-900 to-slate-700 rounded-3xl p-4">
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
      {/* <SearchHistory onHistoryItemClick={handleHistoryItemClick} /> */}
    </section>
  );
}
