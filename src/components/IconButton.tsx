import { ButtonHTMLAttributes, ComponentProps } from "react";
import { TypedIcon } from "typed-design-system";
import { cn } from "../lib/utils";

interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: ComponentProps<typeof TypedIcon>["icon"];
}

export default function IconButton({
  icon,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn("p-1 rounded hover:bg-zinc-100", className)}
      {...props}
    >
      <TypedIcon icon={icon} />
    </button>
  );
}
