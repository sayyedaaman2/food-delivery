import { HTMLAttributes } from "react";

type BadgeVariant =
  | "veg"
  | "nonveg"
  | "open"
  | "closed"
  | "preparing"
  | "out-for-delivery"
  | "delivered"
  | "cancelled"
  | "default";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  veg: "bg-green-50 text-green-700 border-green-200",
  nonveg: "bg-red-50 text-red-700 border-red-200",
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  closed: "bg-zinc-100 text-zinc-500 border-zinc-200",
  preparing: "bg-amber-50 text-amber-700 border-amber-200",
  "out-for-delivery": "bg-blue-50 text-blue-700 border-blue-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-500 border-red-200",
  default: "bg-zinc-100 text-zinc-600 border-zinc-200",
};

// Square dot for veg / nonveg (FSSAI convention)
const dotClasses: Partial<Record<BadgeVariant, string>> = {
  veg: "bg-green-600",
  nonveg: "bg-red-600",
};

export default function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const hasDot = variant === "veg" || variant === "nonveg";

  return (
    <span
      {...props}
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-0.5",
        "text-xs font-semibold rounded-full border",
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasDot && (
        <span
          className={[
            "w-1.5 h-1.5 rounded-sm shrink-0",
            dotClasses[variant],
          ].join(" ")}
        />
      )}
      {children}
    </span>
  );
}
