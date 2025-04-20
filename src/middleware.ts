import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  const RefresToken = request.cookies.get("RefresToken")?.value || "";
  const token =
    "43f26d206d90d10354e42c69dbb7bf17be3a0b7de0acec6fcc81cad0dc70a4c5f360cebfa5e5aecaa6ef01bb8ad3e3ff61729814d39f3760e16f79a27cf4a3f1";

  const jwtConfig = {
    secret: new TextEncoder().encode(token),
  };

  const path = request.nextUrl.pathname;
  const url = request.url;
  const isPublicPath =
    path === "/sign-in" || path === "/sign-up" || path === "/varifytoken";

  if (isPublicPath && RefresToken) {
    try {
      const decoded: any = await jose.jwtVerify(RefresToken, jwtConfig.secret);
      if (decoded.payload?.exp * 1000 > Date.now()) {
        return NextResponse.redirect(new URL("/", url));
      } else {
        const respons = NextResponse.redirect(new URL("/sign-in", url));
        respons.cookies.delete("RefresToken");
        return respons;
      }
    } catch (e) {
      const respons = NextResponse.redirect(new URL("/sign-in", url));
      respons.cookies.delete("RefresToken");
      return respons;
    }
  }

  if (!isPublicPath) {
    if (!RefresToken) {
      return NextResponse.redirect(new URL("/sign-in", url));
    }
    try {
      const decoded: any = await jose.jwtVerify(RefresToken, jwtConfig.secret);

      if (decoded.payload?.exp * 1000 > Date.now()) {
        return NextResponse.next();
      } else {
        const respons = NextResponse.redirect(new URL("/sign-in", url));
        respons.cookies.delete("RefresToken");
        return respons;
      }
    } catch (e) {
      const respons = NextResponse.redirect(new URL("/sign-in", url));
      respons.cookies.delete("RefresToken");
      return respons;
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/sign-up", "/sign-in", "/varifytoken"],
};
