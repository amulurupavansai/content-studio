"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { actions, useData } from "@/lib/store";
import { PRIORITIES, STATUSES, type Priority, type Status } from "@/lib/types";
import { Button, Card, inputCls, Loading, PageHeader, PriorityLabel, StatusBadge } from "@/components/ui";

const PRIORITY_RANK: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };

export default function IdeasPage() {
  const { data, ready } = useData();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [q, setQ] = useState("");
  const [fStatus, setFStatus] = useState<"" | Status>("");
  const [fPriority, setFPriority] = useState<"" | Priority>("");
  const [fTag, setFTag] = useState("");

  const allTags = useMemo(
    () => Array.from(new Set(data.videos.flatMap((v) => v.tags))).sort(),
    [data.videos],
  );
  const list = useMemo(
    () =>
      data.videos
        .filter((v) => (!fStatus || v.status === fStatus) && (!fPriority || v.priority === fPriority) && (!fTag || v.tags.includes(fTag)))
        .filter((v) => !q || (v.title + " " + v.notes).toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || b.createdAt.localeCompare(a.createdAt)),
    [data.videos, q, fStatus, fPriority, fTag],
  );

  if (!ready) return <Loading />;

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    actions.addVideo({
      title: title.trim(),
      priority,
      tags: tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
    });
    setTitle("");
    setTags("");
  }

  return (
    <div>
      <PageHeader title="Idea bank" />
      <Card className="mb-4">
        <form onSubmit={add} className="grid gap-2 md:grid-cols-[2fr_1.5fr_auto_auto]">
          <input aria-label="Idea title" className={inputCls} placeholder="New idea title…" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input aria-label="Tags" className={inputCls} placeholder="tags, comma separated" value={tags} onChange={(e) => setTags(e.target.value)} />
          <select aria-label="Priority" className={inputCls} value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
          </select>
          <Button type="submit">Add idea</Button>
        </form>
      </Card>
      <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <input aria-label="Search" className={inputCls} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="Filter by status" className={inputCls} value={fStatus} onChange={(e) => setFStatus(e.target.value as Status | "")}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select aria-label="Filter by priority" className={inputCls} value={fPriority} onChange={(e) => setFPriority(e.target.value as Priority | "")}>
          <option value="">All priorities</option>
          {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select aria-label="Filter by tag" className={inputCls} value={fTag} onChange={(e) => setFTag(e.target.value)}>
          <option value="">All tags</option>
          {allTags.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-slate-500">No ideas match. Add one above or pick from the niche list in the Guide.</p>
      ) : (
        <ul className="space-y-2">
          {list.map((v) => (
            <li key={v.id}>
              <Card className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <Link href={`/video/?id=${v.id}`} className="font-medium text-indigo-700 hover:underline">{v.title}</Link>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <PriorityLabel priority={v.priority} />
                    {v.tags.map((t) => (
                      <span key={t} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">#{t}</span>
                    ))}
                    {v.scheduledDate && <span className="text-xs text-slate-500">📅 {v.scheduledDate}</span>}
                  </div>
                </div>
                <StatusBadge status={v.status} />
                <select aria-label={`Status for ${v.title}`} className="rounded-lg border border-slate-300 px-2 py-1 text-sm" value={v.status}
                  onChange={(e) => actions.updateVideo(v.id, { status: e.target.value as Status })}>
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
                <select aria-label={`Priority for ${v.title}`} className="rounded-lg border border-slate-300 px-2 py-1 text-sm" value={v.priority}
                  onChange={(e) => actions.updateVideo(v.id, { priority: e.target.value as Priority })}>
                  {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
                </select>
                <Button variant="danger" onClick={() => confirm(`Delete "${v.title}"?`) && actions.deleteVideo(v.id)}>Delete</Button>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
