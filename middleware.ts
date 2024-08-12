import { NextRequest, NextResponse } from 'next/server';
import {jwtDecode} from 'jwt-decode';

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const tokenCookie = req.cookies.get('token');
    const token = tokenCookie ? tokenCookie.value : undefined;

    if(token) {
        try {
            const decoded: any = jwtDecode(token);
            const now = Date.now() / 1000;
            //check if the token is expired
            if(decoded.exp < now){
                return NextResponse.redirect(new URL('/signin', req.url));
            }
        } catch (error) {
            console.log(error);
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }

    // Redirect unauthenticated or expired users from protected routes to /signin
    if (!token ) {
        if (url.pathname.startsWith('/dashboard') || url.pathname === '/') {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }

    // Redirect authenticated users from /signin, /signup, or / to /dashboard
    if (token && url.pathname === '/signin' || url.pathname === '/signup' ) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    // Allow the request to proceed if no conditions match
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/'],
};
