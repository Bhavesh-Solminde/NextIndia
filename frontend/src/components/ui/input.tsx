import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0f0f0f] px-3 py-2 text-sm text-slate-900 dark:text-slate-50 shadow-sm shadow-black/5 transition-shadow placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:border-slate-300 dark:focus-visible:border-slate-600 focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-slate-300 dark:focus-visible:ring-slate-600 disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-slate-400 dark:text-slate-500 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-slate-200 dark:file:border-white/5 file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-slate-900 dark:file:text-slate-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
