import { Request, Response, NextFunction } from "express";

export class ResponseTimeMiddleware {
  static logResponseTime(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(`[${req.method}] ${req.url} - ${duration}ms`);
    });

    next();
  }
}