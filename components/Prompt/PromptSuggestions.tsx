"use client";
import { useState, useEffect, useRef } from "react";
import { PromptSuggestionSkeletons } from "./PromptSuggestionSkeletons";
import { ScrollingSuggestions } from "./ScrollingSuggestions";

type PromptSuggestionsProps = {
  onSuggestionClickAction: (promptText: string) => void;
};

export function PromptSuggestions({
  onSuggestionClickAction,
}: PromptSuggestionsProps) {
  const [dynamicSuggestions, setDynamicSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollerInnerRef = useRef<HTMLUListElement>(null);

  const fetchSuggestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/prompt-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: "Outer Space" }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setDynamicSuggestions(data.suggestions || []);
    } catch (error) {
      setError("Error fetching suggestions. Please try again.");
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const duplicateItemsForScroller = () => {
    if (scrollerInnerRef.current) {
      const scrollerInner = scrollerInnerRef.current;
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    if (dynamicSuggestions.length > 0) {
      duplicateItemsForScroller();
    }
  }, [dynamicSuggestions]);

  if (isLoading) {
    return <PromptSuggestionSkeletons />;
  }

  if (error) {
    return (
      <div className="text-red-300 text-[10px] bg-red-900 p-1 rounded">
        {error}
      </div>
    );
  }

  return (
    <ScrollingSuggestions
      suggestions={dynamicSuggestions}
      onSuggestionClickAction={onSuggestionClickAction}
    />
  );
}
