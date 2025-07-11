import { Request, Response } from 'express';
export const Server = (req: Request, res: Response) => {
    res.send('The Server is On');
}
export const HealthCheck = (req: Request, res: Response) => {
    const start = Date.now();
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: new Date(),
        responseTime: `${Date.now() - start}ms`,
    };
    res.status(200).json(healthcheck);
}
