import { NextResponse, type NextRequest } from "next/server";

/**
 * Español vive en la raíz (/, /about, /projects/x) y se sirve desde /es
 * con un rewrite; inglés vive en /en. /es/... redirige a la URL sin prefijo
 * para no duplicar contenido.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = req.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Todo menos API, assets de Next y archivos con extensión (imágenes, lottie, sitemap…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
