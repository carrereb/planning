import { NextFunction, Request, Response } from "express";

const { AUTHENTICATION_TOKEN } = process.env;

export async function verifyToken(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    if (!req.headers.authorization) {
        res.status(404).json({ message: "x-access-token field not found" });
        return;
    }
    if (req.headers.authorization !== AUTHENTICATION_TOKEN) {
        res.status(403).json({ message: "Authentication failed" });
        return;
    }
    console.log("Request authenticated");
    return next();
}
