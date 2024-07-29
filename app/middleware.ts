import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    console.log("Middleware Triggred");
    const url = req.nextUrl;
    console.log(url.pathname);
    const cookie = req.cookies.get('token')
    console.log("Cookies: ", cookie);
    if (!cookie) {
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
        console.log("Redirecting to /dashboard");
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/'],
};