import Link from "next/link";

type AdminFilterLinksProps = {
  items: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
};

export function AdminFilterLinks({ items }: AdminFilterLinksProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={item.active ? "nav-pill-active" : "nav-pill"}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
