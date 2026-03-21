import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
  as?: "div" | "article" | "section" | "aside";
}>;

export function Card({ children, className = "", as = "div" }: CardProps) {
  const Component = as;

  return <Component className={`surface-panel p-3.5 transition duration-200 hover:border-amber-100/90 lg:p-4 ${className}`}>{children}</Component>;
}
