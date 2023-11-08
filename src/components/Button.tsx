import { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  children,
  className,
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <button className={cn("w-full border rounded", className)} {...props}>
      {children}
      {loading && "..."}
    </button>
  );
}
