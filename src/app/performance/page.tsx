"use client";

import Link from "next/link";
import { useData } from "@/lib/store";
import PerfInputs from "@/components/PerfInputs";
import { Card, Loading, PageHeader } from "@/components/ui";

export default function PerformancePage() {
  const { data, ready } = useData();
  if (!ready) return <Loading />;
  const pub = data.videos.filter((v) => v.status === "Published");
  const tot = pub.reduce(
    (a, v) => ({ views: a.views + (v.performance?.views ?? 0), likes: a.likes + (v.performance?.likes ?? 0), comments: a.comments + (v.performance?.comments ?? 0) }),
    { views: 0, likes: 0, comments: 0 },
  );
  return (
    <div>
      <PageHeader title="Performance log" />
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card><p className="text-xs text-slate-500">Published</p><p className="text-2xl font-bold">{pub.length}</p></Card>
        <Card><p className="text-xs text-slate-500">Total views</p><p className="text-2xl font-bold">{tot.views.toLocaleString()}</p></Card>
        <Card><p className="text-xs text-slate-500">Total likes</p><p className="text-2xl font-bold">{tot.likes.toLocaleString()}</p></Card>
        <Card><p className="text-xs text-slate-500">Total comments</p><p className="text-2xl font-bold">{tot.comments.toLocaleString()}</p></Card>
      </div>
      {pub.length === 0 ? (
        <p className="text-sm text-slate-500">No published videos yet. Set a video&apos;s status to Published to log its numbers here.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr><th className="py-2">Video</th><th>Views</th><th>Likes</th><th>Comments</th><th>Like rate</th><th>Logged</th></tr>
            </thead>
            <tbody>
              {pub.map((v) => {
                const views = v.performance?.views ?? 0;
                const rate = views ? (((v.performance?.likes ?? 0) / views) * 100).toFixed(1) + "%" : "—";
                return (
                  <tr key={v.id} className="border-t border-slate-200">
                    <td className="py-2 pr-2"><Link href={`/video/?id=${v.id}`} className="text-indigo-700 hover:underline">{v.title}</Link></td>
                    <PerfInputs v={v} asCells />
                    <td>{rate}</td>
                    <td className="text-slate-500">{v.performance?.loggedAt ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
