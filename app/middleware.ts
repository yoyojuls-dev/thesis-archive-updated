import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  const { pathname } = request.nextUrl;

  // Protected admin routes
  const adminRoutes = [
    '/admin',
    '/admin/add-products',
    '/admin/manage-products',
    '/admin/manage-orders'
  ];

  // Check if current path is an admin route
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  // If user is not logged in and trying to access admin routes
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in but not admin trying to access admin routes
  if (isAdminRoute && token && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/DashboardHomePage', request.url));
  }

  // If admin user is logged in and trying to access DashboardHomePage, redirect to admin dashboard
  if (pathname === '/DashboardHomePage' && token && token.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If admin user is logged in and trying to access home page, redirect to admin dashboard
  if (pathname === '/' && token && token.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // If admin user is logged in and trying to access login page, redirect to admin dashboard
  if (pathname === '/login' && token && token.role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};