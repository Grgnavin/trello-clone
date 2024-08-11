import jwt from 'jsonwebtoken';

export const isTokenExpired = (token: string | undefined, daysBeforeExpiration: number): boolean => {
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