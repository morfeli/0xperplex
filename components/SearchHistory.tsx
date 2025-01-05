"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { ScrollArea } from "./ui/ScrollArea";

interface SearchHistoryProps {
  onHistoryItemClick: (query: string) => void;
}

export function SearchHistory({ onHistoryItemClick }: SearchHistoryProps) {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load search history from localStorage on component mount
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (query: string) => {
    const updatedHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ].slice(0, 10);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <h3 className="text-lg font-semibold mb-2 text-white">Search History</h3>
      <ScrollArea className="h-40 rounded-md border border-gray-700 bg-gray-800">
        {searchHistory.length > 0 ? (
          <ul className="p-4 space-y-2">
            {searchHistory.map((query, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                  onClick={() => onHistoryItemClick(query)}
                >
                  {query}
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-4 text-sm text-gray-400">No search history yet.</p>
        )}
      </ScrollArea>
      {searchHistory.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="mt-2 text-xs"
          onClick={clearHistory}
        >
          Clear History
        </Button>
      )}
    </div>
  );
}
