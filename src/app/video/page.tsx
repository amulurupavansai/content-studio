"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { actions, useData } from "@/lib/store";
import {
  CHECKLIST_ITEMS, PLATFORMS, PRIORITIES, STATUSES,
  type Platform, type Priority, type Status, type Video,
} from "@/lib/types";
import { countWords, formatDuration, HOOK_MAX_SECONDS, secondsFor, WORDS_PER_MINUTE } from "@/lib/script";
import { Button, Card, Field, inputCls, Loading, PageHeader, StatusBadge } from "@/components/ui";
import PerfInputs from "@/components/PerfInputs";

const TABS = ["Details", "Script", "Checklist", "Performance"] as const;
type Tab = (typeof TABS)[number];

function VideoEditor() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const { data, ready } = useData();
  const [tab, setTab] = useState<Tab>("Details");
  if (!ready) return <Loading />;
  const v = data.videos.find((x) => x.id === id);
  if (!v) {
    return (
      <div>
        <PageHeader title="Video not found" />
        <Link href="/ideas/" className="text-indigo-700 underline">Back to the Idea Bank</Link>
      </div>
    );
  }
  const patch = (p: Partial<Video>) => actions.updateVideo(v.id, p);
  const doneCount = CHECKLIST_ITEMS.filter((i) => v.checklist[i.key].done).length;

  return (
    <div className="max-w-3xl">
      <PageHeader title={v.title || "Untitled"}>
        <StatusBadge status={v.status} />
        <Button variant="danger" onClick={() => { if (confirm("Delete this video?")) { actions.deleteVideo(v.id); router.push("/ideas/"); } }}>
          Delete
        </Button>
      </PageHeader>

      <div role="tablist" className="mb-4 flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium ${tab === t ? "border-indigo-600 text-indigo-700" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
            {t}{t === "Checklist" ? ` (${doneCount}/${CHECKLIST_ITEMS.length})` : ""}
          </button>
        ))}
      </div>

      {tab === "Details" && (
        <Card className="space-y-4">
          <Field label="Working title">
            <input className={inputCls} value={v.title} onChange={(e) => patch({ title: e.target.value })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Status">
              <select className={inputCls} value={v.status} onChange={(e) => patch({ status: e.target.value as Status })}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Priority">
              <select className={inputCls} value={v.priority} onChange={(e) => patch({ priority: e.target.value as Priority })}>
                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Platform">
              <select className={inputCls} value={v.platform} onChange={(e) => patch({ platform: e.target.value as Platform })}>
                {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Publish date" hint="Or drag it on the Calendar">
              <div className="flex gap-2">
                <input type="date" className={inputCls} value={v.scheduledDate ?? ""} onChange={(e) => actions.schedule(v.id, e.target.value || null)} />
              </div>
            </Field>
            <Field label="Tags" hint="Comma separated">
              <input className={inputCls} defaultValue={v.tags.join(", ")} key={v.id}
                onBlur={(e) => patch({ tags: e.target.value.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean) })} />
            </Field>
          </div>
          <Field label="Notes / sources">
            <textarea rows={4} className={inputCls} value={v.notes} onChange={(e) => patch({ notes: e.target.value })} />
          </Field>
        </Card>
      )}

      {tab === "Script" && <ScriptTab v={v} patch={patch} />}

      {tab === "Checklist" && (
        <Card className="space-y-4">
          {CHECKLIST_ITEMS.map((i) => {
            const e = v.checklist[i.key];
            const set = (p: Partial<typeof e>) => patch({ checklist: { ...v.checklist, [i.key]: { ...e, ...p } } });
            return (
              <div key={i.key} className="rounded-lg border border-slate-200 p-3">
                <label className="flex items-center gap-2 font-medium">
                  <input type="checkbox" checked={e.done} onChange={(ev) => set({ done: ev.target.checked })} />
                  {i.label}
                </label>
                <p className="mb-2 ml-6 text-xs text-slate-500">{i.hint}</p>
                <textarea rows={i.key === "description" ? 4 : 2} aria-label={`${i.label} notes`} className={inputCls}
                  placeholder={`${i.label} text or notes…`} value={e.text} onChange={(ev) => set({ text: ev.target.value })} />
              </div>
            );
          })}
        </Card>
      )}

      {tab === "Performance" && (
        <Card>
          {v.status !== "Published" ? (
            <div className="space-y-3 text-sm">
              <p>Performance can be logged once the video is published.</p>
              <Button onClick={() => patch({ status: "Published" })}>Mark as Published</Button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-3 gap-3"><PerfInputs v={v} /></div>
              <p className="mt-3 text-xs text-slate-500">Last updated {v.performance?.loggedAt ?? "never"}. See all videos on the Performance page.</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

function ScriptTab({ v, patch }: { v: Video; patch: (p: Partial<Video>) => void }) {
  const s = v.script;
  const hookWords = countWords(s.hook);
  const hookSecs = secondsFor(hookWords);
  const total = hookWords + countWords(s.body) + countWords(s.cta);
  const set = (k: keyof typeof s, val: string) => patch({ script: { ...s, [k]: val } });
  const hookLong = hookSecs > HOOK_MAX_SECONDS;

  const section = (k: keyof typeof s, label: string, hint: string, rows: number) => {
    const w = countWords(s[k]);
    return (
      <Field label={label} hint={hint}>
        <textarea rows={rows} className={inputCls} value={s[k]} onChange={(e) => set(k, e.target.value)} />
        <span className="mt-1 block text-xs text-slate-500" data-testid={`wc-${k}`}>
          {w} words · ~{formatDuration(secondsFor(w))}
        </span>
      </Field>
    );
  };

  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap gap-6">
        <div><p className="text-xs text-slate-500">Total words</p><p className="text-2xl font-bold" data-testid="total-words">{total}</p></div>
        <div><p className="text-xs text-slate-500">Estimated length</p><p className="text-2xl font-bold" data-testid="total-length">{formatDuration(secondsFor(total))}</p></div>
        <p className="self-end text-xs text-slate-500">Based on {WORDS_PER_MINUTE} words/minute.</p>
      </Card>
      <Card className="space-y-4">
        {section("hook", "Hook (first 3 seconds)", "Aim for ~8 words that promise or provoke.", 2)}
        {hookLong && (
          <p role="alert" className="text-sm text-amber-700">
            Hook runs ~{hookSecs}s — trim it to {HOOK_MAX_SECONDS}s (about {Math.round((HOOK_MAX_SECONDS * WORDS_PER_MINUTE) / 60)} words).
          </p>
        )}
        {section("body", "Body", "Deliver the story/facts, one idea per sentence.", 10)}
        {section("cta", "Call to action", "One clear ask: follow, comment, watch next.", 2)}
      </Card>
    </div>
  );
}

export default function VideoPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VideoEditor />
    </Suspense>
  );
}
