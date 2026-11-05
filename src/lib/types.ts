export const STATUSES = [
  "Idea",
  "Scripting",
  "Voiceover",
  "Animation",
  "Editing",
  "Scheduled",
  "Published",
] as const;
export type Status = (typeof STATUSES)[number];

export const PRIORITIES = ["Low", "Medium", "High"] as const;
export type Priority = (typeof PRIORITIES)[number];

export const PLATFORMS = ["YouTube", "Instagram", "Both"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const CHECKLIST_ITEMS = [
  { key: "thumbnail", label: "Thumbnail", hint: "Cover image / thumbnail designed (1280×720 YouTube, 1080×1920 Reels)" },
  { key: "title", label: "Title", hint: "Final title written (under ~60 chars, keyword up front)" },
  { key: "description", label: "Description", hint: "Description with keywords, links and timestamps" },
  { key: "hashtags", label: "Hashtags", hint: "3–5 YouTube tags / 5–10 Instagram hashtags" },
  { key: "captions", label: "Captions", hint: "Burned-in or uploaded captions reviewed" },
] as const;
export type ChecklistKey = (typeof CHECKLIST_ITEMS)[number]["key"];

export interface Channel {
  name: string;
  platforms: { youtube: boolean; instagram: boolean };
  niche: string;
  audience: string;
  postsPerWeek: number;
  notes: string;
}

export interface Script {
  hook: string;
  body: string;
  cta: string;
}

export interface ChecklistEntry {
  done: boolean;
  text: string;
}

export interface Performance {
  views: number;
  likes: number;
  comments: number;
  loggedAt: string; // YYYY-MM-DD
}

export interface Video {
  id: string;
  title: string;
  notes: string;
  tags: string[];
  priority: Priority;
  status: Status;
  platform: Platform;
  scheduledDate: string | null; // YYYY-MM-DD
  script: Script;
  checklist: Record<ChecklistKey, ChecklistEntry>;
  performance: Performance | null;
  createdAt: string;
}

export interface AppData {
  version: 1;
  channel: Channel;
  videos: Video[];
}
