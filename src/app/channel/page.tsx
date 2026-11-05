"use client";

import { actions, useData } from "@/lib/store";
import { Card, Field, inputCls, Loading, PageHeader } from "@/components/ui";

export default function ChannelPage() {
  const { data, ready } = useData();
  if (!ready) return <Loading />;
  const c = data.channel;
  return (
    <div className="max-w-2xl">
      <PageHeader title="Channel setup" />
      <Card className="space-y-4">
        <Field label="Channel name">
          <input className={inputCls} value={c.name} onChange={(e) => actions.updateChannel({ name: e.target.value })} />
        </Field>
        <fieldset>
          <legend className="mb-1 text-sm font-medium text-slate-700">Platforms</legend>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={c.platforms.youtube}
                onChange={(e) => actions.updateChannel({ platforms: { ...c.platforms, youtube: e.target.checked } })} />
              YouTube
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={c.platforms.instagram}
                onChange={(e) => actions.updateChannel({ platforms: { ...c.platforms, instagram: e.target.checked } })} />
              Instagram
            </label>
          </div>
        </fieldset>
        <Field label="Niche" hint="e.g. Animated history stories — see the Guide for 30 ideas">
          <input className={inputCls} value={c.niche} onChange={(e) => actions.updateChannel({ niche: e.target.value })} />
        </Field>
        <Field label="Target audience" hint="Age range, interests, problems you solve">
          <textarea rows={3} className={inputCls} value={c.audience} onChange={(e) => actions.updateChannel({ audience: e.target.value })} />
        </Field>
        <Field label="Posting frequency (videos per week)">
          <input type="number" min={0} max={21} className={inputCls} value={c.postsPerWeek}
            onChange={(e) => actions.updateChannel({ postsPerWeek: Math.max(0, Number(e.target.value) || 0) })} />
        </Field>
        <Field label="Notes">
          <textarea rows={3} className={inputCls} value={c.notes} onChange={(e) => actions.updateChannel({ notes: e.target.value })} />
        </Field>
        <p className="text-xs text-slate-500">Changes save automatically to this browser.</p>
      </Card>
    </div>
  );
}
