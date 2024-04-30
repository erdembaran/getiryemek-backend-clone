import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as Secret
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
