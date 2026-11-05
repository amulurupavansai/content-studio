"use client";

import Link from "next/link";
import { useData } from "@/lib/store";
import { STATUSES } from "@/lib/types";
import { addDaysISO, startOfWeekISO, todayISO } from "@/lib/dates";
import { Card, Loading, PageHeader, StatusBadge } from "@/components/ui";

export default function Dashboard() {
  const { data, ready } = useData();
  if (!ready) return <Loading />;
  const { videos, channel } = data;
  const today = todayISO();
  const weekStart = startOfWeekISO();
  const weekEnd = addDaysISO(weekStart, 6);
  const thisWeek = videos.filter(
    (v) => v.scheduledDate && v.scheduledDate >= weekStart && v.scheduledDate <= weekEnd,
  ).length;
  const upcoming = videos
    .filter((v) => v.scheduledDate && v.scheduledDate >= today && v.status !== "Published")
    .sort((a, b) => a.scheduledDate!.localeCompare(b.scheduledDate!))
    .slice(0, 5);
  const behind = thisWeek < channel.postsPerWeek;

  return (
    <div>
      <PageHeader title={channel.name ? `${channel.name} — Dashboard` : "Dashboard"} />
      {!channel.name && (
        <Card className="mb-6 border-indigo-200 bg-indigo-50">
          <p className="text-sm">
            Welcome! Start by <Link className="font-semibold text-indigo-700 underline" href="/channel/">setting up your channel</Link>,
            then fill the <Link className="font-semibold text-indigo-700 underline" href="/ideas/">Idea Bank</Link>. New here? Read the{" "}
            <Link className="font-semibold text-indigo-700 underline" href="/guide/">Guide</Link>.
          </p>
        </Card>
      )}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {STATUSES.map((s) => (
          <Card key={s}>
            <StatusBadge status={s} />
            <p className="mt-2 text-2xl font-bold">{videos.filter((v) => v.status === s).length}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-2 font-semibold">This week</h2>
          <p className="text-sm">
            {thisWeek} scheduled / {channel.postsPerWeek} target posts per week
          </p>
          {behind && (
            <p className="mt-1 text-sm text-amber-700">
              You are {channel.postsPerWeek - thisWeek} short of your posting goal — drag ideas onto the{" "}
              <Link href="/calendar/" className="underline">calendar</Link>.
            </p>
          )}
        </Card>
        <Card>
          <h2 className="mb-2 font-semibold">Next up</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-slate-500">Nothing scheduled yet.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {upcoming.map((v) => (
                <li key={v.id} className="flex justify-between gap-2">
                  <Link href={`/video/?id=${v.id}`} className="truncate text-indigo-700 hover:underline">
                    {v.title}
                  </Link>
                  <span className="shrink-0 text-slate-500">{v.scheduledDate}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
