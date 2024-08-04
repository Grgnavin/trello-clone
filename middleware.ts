import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken"

const isTokenExpired = (token: string | undefined,  daysBeforeExpiration: number): boolean => {
    if(!token) return true
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string)
        const expirationDate = new Date(decoded.exp * 1000);
        const currenmtDate = new Date();

        const diffinDays = (expirationDate.getTime() - currenmtDate.getTime()) / (1000 * 60 * 60 * 24);
        console.log("The token is expired");
        return diffinDays < -daysBeforeExpiration;
    } catch (error) {
        console.log(error);
        return true
    }

}

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    console.log("Middleware triggred")
    const tokenCookie = req.cookies.get('token');
    const token = tokenCookie ? tokenCookie.value : undefined;
    const daysBeforeExpiration = 0;
    const tokenExpired = isTokenExpired(token, daysBeforeExpiration);

    // Redirect unauthenticated users trying to access /dashboard to /signin
    if (!token || tokenExpired && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    // Redirect unauthenticated users from / to /signup
    if (!token || tokenExpired && url.pathname === '/') {
        return NextResponse.redirect(new URL('/signin', req.url));
    }

    // Redirect authenticated users from /signin, /signup, or / to /dashboard
    if (token && !tokenExpired && (url.pathname === '/signin' || url.pathname === '/signup' || url.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Allow the request to proceed if no conditions match
    return NextResponse.next();
}


export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/'],
};