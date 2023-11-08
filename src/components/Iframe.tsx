import { IframeHTMLAttributes, useState } from "react";
import { cn } from "../lib/utils";

export default function Iframe({
  className,
  ...props
}: IframeHTMLAttributes<HTMLIFrameElement>) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full">
      <iframe
        className={cn(
          "w-full h-full",
          {
            hidden: isLoading,
          },
          className
        )}
        onLoad={() => {
          setIsLoading(false);
        }}
        {...props}
      />
      {isLoading && <div className="animate-pulse w-full h-full bg-zinc-300" />}
    </div>
  );
}
