import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const isTokenExpired = (token: string | undefined, daysBeforeExpiration: number): boolean => {
    if (!token) return true;
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const expirationDate = new Date(decoded.exp * 1000);
        const currentDate = new Date();
        const diffInDays = (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
        console.log("Token expiration check.");
        return diffInDays < -daysBeforeExpiration;
    } catch (error) {
        console.error("Token verification error:", error);
        return true;
    }
};

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    console.log("Middleware triggered");

    const tokenCookie = req.cookies.get('token');
    const token = tokenCookie ? tokenCookie.value : undefined;
    const daysBeforeExpiration = 0; // Modify as needed

    // Determine if the token is expired
    const tokenExpired = isTokenExpired(token, daysBeforeExpiration);

    // Redirect unauthenticated or expired users from protected routes to /signin
    if (!token || tokenExpired) {
        if (url.pathname.startsWith('/dashboard') || url.pathname === '/') {
            return NextResponse.redirect(new URL('/signin', req.url));
        }
    }

    // Redirect authenticated users from /signin, /signup, or / to /dashboard
    if (token && !tokenExpired) {
        if (url.pathname === '/signin' || url.pathname === '/signup') {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
    }

    // Allow the request to proceed if no conditions match
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/signup', '/'],
};
