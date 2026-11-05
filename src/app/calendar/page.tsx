"use client";

import Link from "next/link";
import { useState } from "react";
import { actions, useData } from "@/lib/store";
import { monthGrid, todayISO } from "@/lib/dates";
import type { Video } from "@/lib/types";
import { Button, Loading, PageHeader, StatusBadge } from "@/components/ui";

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Chip({ v }: { v: Video }) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", v.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      className="cursor-grab rounded-md border border-slate-200 bg-white px-2 py-1 text-xs shadow-sm active:cursor-grabbing"
    >
      <Link href={`/video/?id=${v.id}`} draggable={false} className="block truncate font-medium text-slate-800 hover:text-indigo-700">
        {v.title}
      </Link>
      <StatusBadge status={v.status} />
    </div>
  );
}

export default function CalendarPage() {
  const { data, ready } = useData();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [over, setOver] = useState<string | null>(null);
  if (!ready) return <Loading />;

  const today = todayISO();
  const days = monthGrid(year, month);
  const unscheduled = data.videos.filter((v) => !v.scheduledDate && v.status !== "Published");
  const label = new Date(year, month, 1).toLocaleString("en-US", { month: "long", year: "numeric" });

  function shift(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }
  function drop(e: React.DragEvent, date: string | null) {
    e.preventDefault();
    setOver(null);
    const id = e.dataTransfer.getData("text/plain");
    if (id) actions.schedule(id, date);
  }
  const allow = (key: string) => (e: React.DragEvent) => {
    e.preventDefault();
    setOver(key);
  };

  return (
    <div>
      <PageHeader title="Content calendar">
        <Button variant="ghost" onClick={() => shift(-1)} aria-label="Previous month">←</Button>
        <span className="self-center text-sm font-semibold" aria-live="polite">{label}</span>
        <Button variant="ghost" onClick={() => shift(1)} aria-label="Next month">→</Button>
        <Button variant="ghost" onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth()); }}>Today</Button>
      </PageHeader>

      <div
        data-testid="tray"
        onDragOver={allow("tray")}
        onDragLeave={() => setOver(null)}
        onDrop={(e) => drop(e, null)}
        className={`mb-4 rounded-xl border-2 border-dashed p-3 ${over === "tray" ? "border-indigo-400 bg-indigo-50" : "border-slate-300 bg-white"}`}
      >
        <p className="mb-2 text-sm font-semibold">Unscheduled ({unscheduled.length}) — drag onto a day; drop here to unschedule</p>
        <div className="flex flex-wrap gap-2">
          {unscheduled.length === 0 && <span className="text-xs text-slate-500">All ideas are scheduled or published.</span>}
          {unscheduled.map((v) => <div key={v.id} className="w-44"><Chip v={v} /></div>)}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[700px] grid-cols-7 gap-px rounded-xl border border-slate-200 bg-slate-200">
          {DOW.map((d) => <div key={d} className="bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">{d}</div>)}
          {days.map((date) => {
            const inMonth = Number(date.slice(5, 7)) - 1 === month;
            const items = data.videos.filter((v) => v.scheduledDate === date);
            return (
              <div
                key={date}
                data-date={date}
                onDragOver={allow(date)}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => drop(e, date)}
                className={`min-h-24 space-y-1 p-1.5 ${inMonth ? "bg-white" : "bg-slate-50"} ${over === date ? "ring-2 ring-inset ring-indigo-400" : ""}`}
              >
                <div className={`text-xs ${date === today ? "inline-block rounded-full bg-indigo-600 px-1.5 font-bold text-white" : inMonth ? "text-slate-700" : "text-slate-400"}`}>
                  {Number(date.slice(8))}
                </div>
                {items.map((v) => <Chip key={v.id} v={v} />)}
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">On touch devices where dragging is awkward, open a video and set its date in Details.</p>
    </div>
  );
}
