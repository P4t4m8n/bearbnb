import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  const supabase = createMiddlewareClient({ req, res });

  if (pathname === "/login") {
    const returnUrl = req.nextUrl.clone();
    returnUrl.pathname = "/";
    returnUrl.searchParams.set("showDialog", "y");

    return NextResponse.redirect(returnUrl);
  }

  // const user = await serverSupabase.auth.getUser();

  // if (authId !== user.data.user?.id) {
  //   // console.log("authId:", authId);
  // }

  if (pathname.startsWith("profile")) {
    console.log("profile");
  }

  await supabase.auth.getSession();

  return res;
}
