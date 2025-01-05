import { Message } from "ai/react";
import { X } from "lucide-react";

interface SearchHistoryProps {
  onHistoryItemClick: (query: string) => void;
  chatHistory: Message[];
  isOpen: boolean;
  onClose: () => void;
}

export function SearchHistory({
  onHistoryItemClick,
  chatHistory,
  isOpen,
  onClose,
}: SearchHistoryProps) {
  return (
    <div
      className={`md:w-64 bg-slate-800 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${
        isOpen
          ? "fixed inset-0 z-50 md:relative md:translate-x-0"
          : "fixed -translate-x-full md:relative md:translate-x-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h3 className="text-white text-lg font-semibold">Search History</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <h3 className="text-white text-[12px] mb-2 hidden md:block">
        Search History
      </h3>
      <div className="space-y-2">
        {chatHistory
          .filter((message) => message.role === "user")
          .slice(-10)
          .reverse()
          .map((message, index) => (
            <button
              key={message.id || index}
              onClick={() => onHistoryItemClick(message.content)}
              className="w-full text-left text-[10px] text-white bg-slate-700 hover:bg-slate-600 rounded-xl py-2 px-3 transition-colors duration-200 fade-in"
            >
              {message.content}
            </button>
          ))}
      </div>
    </div>
  );
}
