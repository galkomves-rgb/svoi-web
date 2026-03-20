import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type PreviewSectionProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
};

export function PreviewSection({ title, subtitle, actionLabel, actionHref, children }: PreviewSectionProps) {
  return (
    <Card as="section" className="space-y-6 rounded-3xl">
      <SectionHeading title={title} subtitle={subtitle} actionLabel={actionLabel} actionHref={actionHref} />
      {children}
    </Card>
  );
}
