import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.cookies["user-token"]) return;

  const token = nanoid();

  // Redirect (to apply cookie)
  const res = NextResponse.redirect(req.nextUrl);

  res.cookie("user-token", token, {
    sameSite: "lax",
    maxAge: 10 * 365 * 24 * 60 * 60,
  });

  return res;
}
