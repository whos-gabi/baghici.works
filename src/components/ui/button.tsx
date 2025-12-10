import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "default" | "outline" | "ghost";

const variants: Record<ButtonVariant, string> = {
  default:
    "bg-white text-black hover:bg-white/90 shadow-sm border border-white/10",
  outline:
    "border border-white/20 text-white hover:bg-white/10 hover:border-white/40",
  ghost:
    "text-white hover:bg-white/10 border border-transparent hover:border-white/10",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          variants[variant],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

