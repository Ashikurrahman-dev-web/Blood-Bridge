import { NextResponse } from 'next/server';
import { auth } from './lib/auth'; 

export async function proxy(request) {
    try {
        const session = await auth.api.getSession({
            headers: request.headers 
        });

        const { pathname } = request.nextUrl;

        
if (
  !session &&
  (
    pathname === '/funding' ||
    pathname === '/myBooking' ||
    pathname === '/comment' ||
    pathname === '/success' ||
    pathname.startsWith('/dashboard/') ||
    pathname.startsWith('/blood/')
  )
) {
  const loginUrl = new URL('/signin', request.url);

  loginUrl.searchParams.set('redirect', pathname);

  return NextResponse.redirect(loginUrl);
}

  return NextResponse.next();       
    } catch (e) {
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/funding',
        '/myBooking',
        '/comment',
        '/success',
        '/dashboard/:path*',
        '/blood/:path*',
    ],
};