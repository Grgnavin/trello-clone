import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const token = req.cookies.get('token');

    // Redirect unauthenticated users trying to access /dashboard to /signin
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    // Redirect unauthenticated users from / to /signup
    if (!token && url.pathname === '/') {
        return NextResponse.redirect(new URL('/signup', req.url));
    }

    // Redirect authenticated users from /signin, /signup, or / to /dashboard
    if (token && (url.pathname === '/signin' || url.pathname === '/signup' || url.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Allow the request to proceed if no conditions match
    return NextResponse.next();
}


export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/'],
};