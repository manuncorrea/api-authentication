import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface TokenProps {
  id: string;
  iat: string;
  exp: number;
}

export default function authMiddleware(
  req: Request, res: Response, next: NextFunction
) {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, 'secret');
  
    const { id } = data as unknown as TokenProps;

    req.userId = id;

  } catch (error) {
    return res.send(401);
  }
}