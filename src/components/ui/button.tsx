import * as React from "react";
import Link from "next/link";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", href, ...props }, ref) => {
    
    let variantClasses = "";
    if (variant === "primary") {
      variantClasses = "bg-amber-accent hover:bg-amber-hover text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm";
    } else if (variant === "secondary") {
      variantClasses = "bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm";
    } else if (variant === "outline") {
      variantClasses = "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed";
    } else if (variant === "ghost") {
      variantClasses = "bg-transparent hover:bg-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed";
    }

    let sizeClasses = "";
    if (size === "default") {
      sizeClasses = "px-8 py-3.5 text-base rounded-xl";
    } else if (size === "sm") {
      sizeClasses = "px-4 py-2 text-sm rounded-lg";
    } else if (size === "lg") {
      sizeClasses = "px-10 py-4 text-lg rounded-2xl";
    }

    const compClass = `inline-flex items-center justify-center font-bold transition-colors cursor-pointer text-center ${variantClasses} ${sizeClasses} ${className}`;

    if (href) {
      return (
        <Link href={href} className={compClass}>
          {props.children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={compClass} {...props} />
    );
  }
);
Button.displayName = "Button";
