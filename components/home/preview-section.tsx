import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type PreviewSectionProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
  eyebrow?: string;
  muted?: boolean;
};

export function PreviewSection({ title, subtitle, actionLabel, actionHref, children, eyebrow, muted = false }: PreviewSectionProps) {
  return (
    <Card as="section" className={`space-y-4 ${muted ? "bg-white/80" : ""}`}>
      <SectionHeading title={title} subtitle={subtitle} actionLabel={actionLabel} actionHref={actionHref} eyebrow={eyebrow} />
      {children}
    </Card>
  );
}
