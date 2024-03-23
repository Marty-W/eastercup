import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: ["en", "cs"],
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export function middleware(request: NextRequest) {
  // Check for the specific domain and redirect if matched
  if (request.nextUrl.hostname === "eastercupklatovy.online") {
    return NextResponse.redirect("https://app.staylive.io/eastercuplatovy");
  }

  // Otherwise, proceed with the i18n middleware
  return I18nMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
