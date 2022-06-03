import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.cookies["user-token"]) return;

  // Apply cookie if doesn't have
  const random = Math.random().toString();
  const res = NextResponse.redirect(req.nextUrl);

  res.cookie("user-token", random, { sameSite: "strict" });

  return res;
}
