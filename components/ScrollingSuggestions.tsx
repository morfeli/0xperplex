"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/Button";

type ScrollingSuggestionsProps = {
  suggestions: string[];
  onSuggestionClickAction: (promptText: string) => void;
};

export function ScrollingSuggestions({
  suggestions,
  onSuggestionClickAction,
}: ScrollingSuggestionsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollerInnerRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollerRef}
        className="maskEffect overflow-hidden whitespace-nowrap fade-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ul
          ref={scrollerInnerRef}
          className={`inline-flex space-x-2 animate-scroll ${
            isPaused ? "paused" : ""
          }`}
        >
          {suggestions.map((suggestion, index) => (
            <li key={index} className="inline-block">
              <Button
                onClick={() => onSuggestionClickAction(suggestion)}
                variant="secondary"
                className="bg-white hover:bg-opacity-30 text-black text-[10px] border-white border-opacity-20 py-0 px-2 h-6 rounded-full shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
              >
                <p>{suggestion}</p>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
