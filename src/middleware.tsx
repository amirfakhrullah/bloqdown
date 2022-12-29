import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ephemeralCache = new Map();

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(20, "10 s"),
  ephemeralCache,
});

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ip = req.ip ?? "127.0.0.1";
  if (req.nextUrl.pathname === "/api/blocked") return;

  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    `mw_${ip}`
  );
  ev.waitUntil(pending);

  const res = success
    ? NextResponse.next(req)
    : NextResponse.rewrite(new URL("/api/blocked", req.url), req);

  if (!req.cookies.get("user-token")) {
    const token = nanoid();
    res.cookies.set("user-token", token, {
      sameSite: "lax",
      maxAge: 10 * 365 * 24 * 60 * 60,
    });
  }

  res.headers.set("X-RateLimit-Limit", limit.toString());
  res.headers.set("X-RateLimit-Remaining", remaining.toString());
  res.headers.set("X-RateLimit-Reset", reset.toString());
  return res;
}
