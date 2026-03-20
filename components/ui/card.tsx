import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
  as?: "div" | "article" | "section" | "aside";
}>;

export function Card({ children, className = "", as = "div" }: CardProps) {
  const Component = as;

  return <Component className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft ${className}`}>{children}</Component>;
}
