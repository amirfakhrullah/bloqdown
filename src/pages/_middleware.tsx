import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.cookies["user-token"]) {
    return;
  } else {
    const token = nanoid();

    // Redirect (to apply cookie)
    const res = NextResponse.redirect(req.nextUrl);

    res.cookie("user-token", token, { sameSite: "strict" });

    return res;
  }
}
