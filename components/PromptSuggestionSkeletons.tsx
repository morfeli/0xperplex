import { useRef, useEffect } from "react";
import { Skeleton } from "./ui/Skeletons";

export function PromptSuggestionSkeletons() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollerInnerRef = useRef<HTMLDivElement>(null);

  const duplicateItemsForScroller = () => {
    if (scrollerRef.current && scrollerInnerRef.current) {
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
    duplicateItemsForScroller();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollerRef}
        className="maskEffect overflow-hidden whitespace-nowrap fade-in"
      >
        <div
          ref={scrollerInnerRef}
          className="inline-flex space-x-2 animate-scroll"
        >
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-28 rounded-full bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}
