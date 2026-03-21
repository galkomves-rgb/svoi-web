import Link from "next/link";
import { Card } from "@/components/ui/card";

type CatalogEmptyStateProps = {
  title: string;
  description: string;
  clearHref?: string;
};

export function CatalogEmptyState({ title, description, clearHref }: CatalogEmptyStateProps) {
  return (
    <Card as="section" className="space-y-3 border-dashed border-slate-300 bg-white/78 text-center">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 lg:text-2xl">{title}</h2>
      <p className="mx-auto max-w-xl text-sm leading-7 text-slate-600">{description}</p>
      {clearHref ? (
        <div className="pt-1">
          <Link href={clearHref} className="cta-secondary">
            Очистити фільтри
          </Link>
        </div>
      ) : null}
    </Card>
  );
}
