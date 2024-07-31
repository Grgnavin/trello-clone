import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const cookieStore = cookies();
    const cookie = cookieStore.get('token');
    if (!cookie && url.pathname === ('/')) {
        return NextResponse.redirect(new URL('/signup', req.url));
    }
    if (
        req.cookies.has('token')  && 
        (
            url.pathname === ('/signin') ||
            url.pathname === ('/signup') ||
            url.pathname === ('/') 
        )
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/'],
};