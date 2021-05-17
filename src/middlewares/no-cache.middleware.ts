import { NestMiddleware, Injectable } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class NoCacheMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    response.set(
      'cache-control',
      'no-store, no-cache, must-revalidate, proxy-revalidate',
    );
    response.set('pragma', 'no-cache');
    response.set('expires', '0');
    response.set('surrogate-control', 'no-store');

    next();
  }
}
