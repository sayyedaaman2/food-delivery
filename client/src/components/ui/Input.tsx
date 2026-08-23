import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-zinc-700"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 flex items-center text-zinc-400 pointer-events-none">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          {...props}
          className={[
            "w-full rounded-xl border bg-zinc-50 py-2.5 text-sm text-zinc-900",
            "placeholder:text-zinc-400",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent focus:bg-white",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-red-400 focus:ring-red-400 bg-red-50"
              : "border-zinc-200",
            leftIcon ? "pl-10 pr-4" : "px-4",
            rightIcon ? "pr-10" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {rightIcon && (
          <span className="absolute right-3 flex items-center text-zinc-400 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-zinc-400">{hint}</p>}
    </div>
  );
}
