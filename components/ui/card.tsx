import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
  as?: "div" | "article" | "section" | "aside";
}>;

export function Card({ children, className = "", as = "div" }: CardProps) {
  const Component = as;

  return <Component className={`surface-panel p-4 lg:p-5 ${className}`}>{children}</Component>;
}
