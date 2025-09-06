// this is a server route that proxies api.bible
// Never call api.bible from the browser; headers would expose the key. A server route hides it and lets you add caching/error handling.

import { NextResponse } from "next/server";

/** ---------- Minimal types for api.bible ---------- */
type ApiList<T> = { data: T[] };
type Book = { id: string; name?: string };
type Chapter = { id: string; number?: string };
type VerseSummary = { id: string; reference?: string; number?: string };
type VersePayload = {
  data?: { id: string; reference?: string; content?: string };
};

/** ---------- Config ---------- */
const API_BASE = "https://api.scripture.api.bible/v1";
const BIBLE_ID = process.env.BIBLE_BIBLE_ID; // 👈 your env var
const API_KEY = process.env.BIBLE_API_KEY; // 👈 your env var

/** ---------- Helpers ---------- */
function secondsToNextMidnightNY() {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = fmt.format(now).split(/[,\s:]/);
  const [date, hh, mm, ss] = [parts[0], parts[2], parts[3], parts[4]];
  const [yyyy, MM, dd] = date.split("-").map(Number);
  const nowNY = new Date(
    yyyy,
    Number(MM) - 1,
    dd,
    Number(hh),
    Number(mm),
    Number(ss)
  );
  const nextMidnight = new Date(yyyy, Number(MM) - 1, dd + 1, 0, 0, 0);
  const diffSec = Math.floor((nextMidnight.getTime() - nowNY.getTime()) / 1000);
  return Math.max(1, diffSec);
}

function daySeedNY() {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const [yyyy, mm, dd] = fmt.format(new Date()).split("-");
  return Number(`${yyyy}${mm}${dd}`);
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: T[], rnd: () => number): T {
  return arr[Math.floor(rnd() * arr.length)];
}

async function api<T>(path: string, revalidateSec: number): Promise<T> {
  if (!API_KEY) throw new Error("Missing BIBLE_API_KEY");
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "api-key": API_KEY },
    next: { revalidate: revalidateSec },
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Upstream ${res.status}: ${detail}`);
  }
  return (await res.json()) as T;
}

/** ---------- Route ---------- */
export async function GET() {
  try {
    if (!BIBLE_ID) {
      return NextResponse.json(
        { error: "Missing BIBLE_BIBLE_ID in .env.local" },
        { status: 500 }
      );
    }

    const ttl = secondsToNextMidnightNY();
    const rnd = mulberry32(daySeedNY());

    // 1) Books
    const booksResp = await api<ApiList<Book>>(
      `/bibles/${BIBLE_ID}/books`,
      ttl
    );
    const books = Array.isArray(booksResp?.data) ? booksResp.data : [];
    if (books.length === 0)
      throw new Error("No books returned for this BIBLE_ID");
    const book = pick(books, rnd);

    // 2) Chapters
    const chaptersResp = await api<ApiList<Chapter>>(
      `/bibles/${BIBLE_ID}/books/${book.id}/chapters`,
      ttl
    );
    const chapters = Array.isArray(chaptersResp?.data) ? chaptersResp.data : [];
    if (chapters.length === 0)
      throw new Error(`No chapters for book ${book.id}`);
    const chapter = pick(chapters, rnd);

    // 3) Verses
    const versesResp = await api<ApiList<VerseSummary>>(
      `/bibles/${BIBLE_ID}/chapters/${chapter.id}/verses`,
      ttl
    );
    const verses = Array.isArray(versesResp?.data) ? versesResp.data : [];
    if (verses.length === 0)
      throw new Error(`No verses for chapter ${chapter.id}`);
    const verse = pick(verses, rnd);

    // 4) Verse content
    const verseData = await api<VersePayload>(
      `/bibles/${BIBLE_ID}/verses/${encodeURIComponent(
        verse.id
      )}?content-type=text&fums-version=3`,
      ttl
    );

    const reference =
      verseData?.data?.reference ??
      [book?.name, chapter?.number, verse?.number].filter(Boolean).join(" ");
    const text =
      verseData?.data?.content ??
      verseData?.data?.content?.toString?.() ??
      "Verse text unavailable";

    return NextResponse.json(
      { reference, text, bibleId: BIBLE_ID, ttlSeconds: ttl },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${ttl}, stale-while-revalidate=60`,
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to load verse", detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
