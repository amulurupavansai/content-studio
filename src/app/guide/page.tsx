"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { actions } from "@/lib/store";
import { GUIDE_STEPS } from "@/lib/guide";
import { NICHES } from "@/lib/niches";
import { Button, Card, PageHeader } from "@/components/ui";

export default function GuidePage() {
  const router = useRouter();
  const [added, setAdded] = useState<string | null>(null);
  return (
    <div className="max-w-4xl">
      <PageHeader title="Guide: faceless animated videos" />
      <p className="mb-6 text-sm text-slate-600">
        A repeatable workflow using free or low-cost tools. Always check each tool&apos;s current pricing and commercial-use terms.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Step-by-step workflow</h2>
      <ol className="mb-10 space-y-4">
        {GUIDE_STEPS.map((s) => (
          <li key={s.title}>
            <Card>
              <h3 className="font-semibold text-indigo-700">{s.title}</h3>
              <p className="mb-2 text-sm text-slate-600">{s.goal}</p>
              <ul className="mb-3 list-disc space-y-1 pl-5 text-sm">
                {s.actions.map((a) => <li key={a}>{a}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2">
                {s.tools.map((t) => (
                  <span key={t.name} className="rounded-lg bg-slate-100 px-2 py-1 text-xs" title={t.use}>
                    <strong>{t.name}</strong> · {t.cost} — {t.use}
                  </span>
                ))}
              </div>
            </Card>
          </li>
        ))}
      </ol>

      <h2 className="mb-1 text-xl font-semibold">30 niche ideas</h2>
      <p className="mb-3 text-sm text-slate-600">Add one as an idea to start brainstorming videos in that niche.</p>
      <div className="grid gap-3 md:grid-cols-2">
        {NICHES.map((n, i) => (
          <Card key={n.name} className="flex flex-col">
            <h3 className="font-semibold">{i + 1}. {n.name}</h3>
            <p className="mb-2 text-sm text-slate-600">{n.summary}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="font-semibold text-emerald-700">Pros</p>
                <ul className="list-disc pl-4">{n.pros.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
              <div>
                <p className="font-semibold text-red-700">Cons</p>
                <ul className="list-disc pl-4">{n.cons.map((c) => <li key={c}>{c}</li>)}</ul>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button variant="ghost" onClick={() => {
                const v = actions.addVideo({ title: `${n.name}: first video`, tags: [n.name.toLowerCase().split(/\W+/)[0]], notes: n.summary });
                setAdded(n.name);
                void v;
              }}>Add as idea</Button>
              {added === n.name && (
                <button className="text-xs text-indigo-700 underline" onClick={() => router.push("/ideas/")}>Added — view Idea Bank</button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
