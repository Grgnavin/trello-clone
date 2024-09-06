import { NextRequest, NextResponse } from 'next/server';
import {jwtDecode} from 'jwt-decode'; // Fix the import

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const tokenCookie = req.cookies.get('token');
    const token = tokenCookie ? tokenCookie.value : undefined;

    // Handle the case where the token exists
    if (token) {
        try {
            const decoded: any = jwtDecode(token);
            const now = Date.now() / 1000;

            // Check if the token is expired
            if (decoded.exp < now) {
                // If expired, redirect to /signin
                if (url.pathname !== '/signin') {
                    return NextResponse.redirect(new URL('/signin', req.url));
                }
            } else {
                // If the token is valid and user is at /signin or /signup, redirect to /dashboard
                if (url.pathname === '/signin' || url.pathname === '/signup') {
                    return NextResponse.redirect(new URL('/dashboard', req.url));
                }
            }
        } catch (error) {
            console.log(error);
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    } else {
        // Handle unauthenticated requests
        if (url.pathname.startsWith('/dashboard') || url.pathname === '/') {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }

    // Allow the request to proceed if no conditions match
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/'],
};
