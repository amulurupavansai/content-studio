"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { actions, exportJSON, importFile } from "@/lib/store";
import { Button } from "./ui";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/channel/", label: "Channel" },
  { href: "/ideas/", label: "Idea Bank" },
  { href: "/calendar/", label: "Calendar" },
  { href: "/performance/", label: "Performance" },
  { href: "/guide/", label: "Guide" },
];

export default function Nav() {
  const path = usePathname();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState("");

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, ""));

  async function onImport(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!confirm("Importing replaces all current data in this browser. Continue?")) return;
    try {
      await importFile(f);
      setMsg("Import successful.");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Import failed.");
    }
  }

  return (
    <nav className="border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-56 md:shrink-0 md:border-b-0 md:border-r">
      <div className="flex flex-col gap-3 p-4">
        <Link href="/" className="text-lg font-bold text-indigo-700">
          🎬 Content Studio
        </Link>
        <ul className="flex flex-wrap gap-1 md:flex-col">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`block rounded-lg px-3 py-1.5 text-sm font-medium ${
                  isActive(l.href) ? "bg-indigo-100 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 md:mt-4 md:flex-col">
          <Button variant="ghost" onClick={exportJSON}>
            Export JSON
          </Button>
          <Button variant="ghost" onClick={() => fileRef.current?.click()}>
            Import JSON
          </Button>
          <Button
            variant="danger"
            onClick={() => confirm("Delete ALL data in this browser?") && actions.reset()}
          >
            Reset data
          </Button>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={onImport} />
        </div>
        {msg && (
          <p role="status" className="text-xs text-slate-600">
            {msg}
          </p>
        )}
        <p className="text-xs text-slate-400">Data is stored only in this browser. Export to back up.</p>
      </div>
    </nav>
  );
}
