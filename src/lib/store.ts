"use client";

import { useSyncExternalStore } from "react";
import type { AppData, ChecklistKey, Video } from "./types";
import { CHECKLIST_ITEMS, PLATFORMS, PRIORITIES, STATUSES } from "./types";

const KEY = "content-studio:v1";

export function emptyData(): AppData {
  return {
    version: 1,
    channel: {
      name: "",
      platforms: { youtube: true, instagram: true },
      niche: "",
      audience: "",
      postsPerWeek: 3,
      notes: "",
    },
    videos: [],
  };
}

export function emptyChecklist(): Video["checklist"] {
  return Object.fromEntries(
    CHECKLIST_ITEMS.map((i) => [i.key, { done: false, text: "" }]),
  ) as Video["checklist"];
}

export function newVideo(partial: Partial<Video> = {}): Video {
  return {
    id: crypto.randomUUID(),
    title: "Untitled idea",
    notes: "",
    tags: [],
    priority: "Medium",
    status: "Idea",
    platform: "Both",
    scheduledDate: null,
    script: { hook: "", body: "", cta: "" },
    checklist: emptyChecklist(),
    performance: null,
    createdAt: new Date().toISOString(),
    ...partial,
  };
}

const SERVER_SNAPSHOT: AppData = emptyData();
let cache: AppData | null = null;
const listeners = new Set<() => void>();

function str(v: unknown, d = "") {
  return typeof v === "string" ? v : d;
}
function num(v: unknown, d = 0) {
  return typeof v === "number" && Number.isFinite(v) ? v : d;
}
function oneOf<T extends string>(v: unknown, opts: readonly T[], d: T): T {
  return opts.includes(v as T) ? (v as T) : d;
}

/** Validate/normalise unknown JSON into AppData. Throws on invalid shape. */
export function parseAppData(raw: unknown): AppData {
  if (!raw || typeof raw !== "object") throw new Error("Not a Content Studio export.");
  const r = raw as Record<string, unknown>;
  if (r.version !== 1) throw new Error("Unsupported export version.");
  if (!Array.isArray(r.videos)) throw new Error("Export has no videos list.");
  const base = emptyData();
  const c = (r.channel ?? {}) as Record<string, unknown>;
  const p = (c.platforms ?? {}) as Record<string, unknown>;
  const channel = {
    name: str(c.name),
    platforms: {
      youtube: p.youtube !== false,
      instagram: p.instagram !== false,
    },
    niche: str(c.niche),
    audience: str(c.audience),
    postsPerWeek: num(c.postsPerWeek, base.channel.postsPerWeek),
    notes: str(c.notes),
  };
  const videos: Video[] = r.videos.map((vv) => {
    const v = (vv ?? {}) as Record<string, any>;
    const cl = emptyChecklist();
    for (const k of Object.keys(cl) as ChecklistKey[]) {
      cl[k] = { done: !!v.checklist?.[k]?.done, text: str(v.checklist?.[k]?.text) };
    }
    const perf = v.performance;
    return newVideo({
      id: str(v.id) || crypto.randomUUID(),
      title: str(v.title, "Untitled idea"),
      notes: str(v.notes),
      tags: Array.isArray(v.tags) ? v.tags.filter((t: unknown) => typeof t === "string") : [],
      priority: oneOf(v.priority, PRIORITIES, "Medium"),
      status: oneOf(v.status, STATUSES, "Idea"),
      platform: oneOf(v.platform, PLATFORMS, "Both"),
      scheduledDate:
        typeof v.scheduledDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v.scheduledDate)
          ? v.scheduledDate
          : null,
      script: { hook: str(v.script?.hook), body: str(v.script?.body), cta: str(v.script?.cta) },
      checklist: cl,
      performance: perf
        ? {
            views: num(perf.views),
            likes: num(perf.likes),
            comments: num(perf.comments),
            loggedAt: str(perf.loggedAt),
          }
        : null,
      createdAt: str(v.createdAt) || new Date().toISOString(),
    });
  });
  return { version: 1, channel, videos };
}

function load(): AppData {
  try {
    const s = window.localStorage.getItem(KEY);
    if (s) return parseAppData(JSON.parse(s));
  } catch {
    /* corrupted or unavailable storage: start fresh */
  }
  return emptyData();
}

function getSnapshot(): AppData {
  if (!cache) cache = load();
  return cache;
}

function commit(next: AppData) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode: keep in memory only */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Returns [data, ready]. `ready` is false during SSR / first hydration render. */
export function useData(): { data: AppData; ready: boolean } {
  const data = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
  return { data, ready: data !== SERVER_SNAPSHOT };
}

export const actions = {
  updateChannel(patch: Partial<AppData["channel"]>) {
    const d = getSnapshot();
    commit({ ...d, channel: { ...d.channel, ...patch } });
  },
  addVideo(partial: Partial<Video> = {}): Video {
    const v = newVideo(partial);
    const d = getSnapshot();
    commit({ ...d, videos: [v, ...d.videos] });
    return v;
  },
  updateVideo(id: string, patch: Partial<Video>) {
    const d = getSnapshot();
    commit({ ...d, videos: d.videos.map((v) => (v.id === id ? { ...v, ...patch } : v)) });
  },
  deleteVideo(id: string) {
    const d = getSnapshot();
    commit({ ...d, videos: d.videos.filter((v) => v.id !== id) });
  },
  /** Schedule (or unschedule with null). Keeps status in sync for pre-publish stages. */
  schedule(id: string, date: string | null) {
    const d = getSnapshot();
    commit({
      ...d,
      videos: d.videos.map((v) => {
        if (v.id !== id) return v;
        let status = v.status;
        if (date && status !== "Published") status = "Scheduled";
        if (!date && status === "Scheduled") status = "Editing";
        return { ...v, scheduledDate: date, status };
      }),
    });
  },
  replaceAll(data: AppData) {
    commit(data);
  },
  reset() {
    commit(emptyData());
  },
};

export function exportJSON() {
  const blob = new Blob([JSON.stringify(getSnapshot(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `content-studio-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importFile(file: File) {
  const text = await file.text();
  actions.replaceAll(parseAppData(JSON.parse(text)));
}
