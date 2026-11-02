import "express";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";


export const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing")
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}
interface AuthPayload extends jwt.JwtPayload {
    id: string;
}




const authMiddleware = (req: Request,
    res: Response,
    next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Kindly log in"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        ) as AuthPayload;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid login token"
        })
    }
};

export default authMiddleware;