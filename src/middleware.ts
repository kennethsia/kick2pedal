import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUserMeLoader } from '@/data/services/getUserMeLoader';

// Define an array of protected routes
const protectedRoutes = [
  '/dashboard',
  '/events',
  '/events/',
  '/rules-and-regulations',
  // Add more protected routes here
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  // Check exact matches first
  if (protectedRoutes.includes(path)) {
    return true;
  }

  // Check dynamic routes
  const eventRegex = /^\/events\/[\w-]+/; // Matches /events/{anything}
  if (eventRegex.test(path)) {
    return true;
  }

  return false;
}

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();

  const currentPath = request.nextUrl.pathname;

  if (isProtectedRoute(currentPath) && (!user || user.ok === false)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Optionally, you can add a matcher to optimize performance
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
