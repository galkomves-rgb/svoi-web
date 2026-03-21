"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

type HeaderMenuItem = {
  href: string;
  label: string;
};

type HeaderMenuProps = {
  label: string;
  items: HeaderMenuItem[];
};

export function HeaderMenu({ label, items }: HeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const menuId = useId();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className="nav-chip gap-2"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="menu"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span>{label}</span>
        <span aria-hidden="true" className={`text-xs text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className="absolute right-0 mt-3 grid min-w-[220px] gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.1)]"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
