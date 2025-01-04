"use client";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { useChat } from "ai/react";
import { useEffect } from "react";

export function SearchBar() {
  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat();

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const noMessages = !messages || messages.length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center space-x-2 mb-4"
    >
      <Input
        type="text"
        placeholder="Ask a question..."
        onChange={handleInputChange}
        value={input}
      />
      <Button
        type="submit"
        variant="secondary"
        className="rounded-xl py-0 h-10"
      >
        Search
      </Button>
    </form>
  );
}
