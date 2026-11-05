"use client";

import { actions } from "@/lib/store";
import { todayISO } from "@/lib/dates";
import type { Video } from "@/lib/types";

const KEYS = ["views", "likes", "comments"] as const;

/** Number inputs for a video's performance numbers. `asCells` wraps each in a <td>. */
export default function PerfInputs({ v, asCells = false }: { v: Video; asCells?: boolean }) {
  const p = v.performance ?? { views: 0, likes: 0, comments: 0, loggedAt: todayISO() };
  const set = (k: (typeof KEYS)[number], val: string) =>
    actions.updateVideo(v.id, {
      performance: { ...p, [k]: Math.max(0, Math.floor(Number(val) || 0)), loggedAt: todayISO() },
    });
  return (
    <>
      {KEYS.map((k) => {
        const input = (
          <label key={k} className={asCells ? "" : "block text-sm"}>
            {!asCells && <span className="mb-1 block font-medium capitalize text-slate-700">{k}</span>}
            <input
              type="number"
              min={0}
              aria-label={`${k} for ${v.title}`}
              className={`rounded-lg border border-slate-300 px-2 py-1 text-sm ${asCells ? "w-24" : "w-full"}`}
              value={p[k]}
              onChange={(e) => set(k, e.target.value)}
            />
          </label>
        );
        return asCells ? <td key={k} className="pr-2">{input}</td> : input;
      })}
    </>
  );
}
