import { TokensResponse } from '../entities/token.entity-response';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { map, Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';

@Injectable()
export class RTInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TokensResponse> {
    const ctx = GqlExecutionContext.create(context);
    const response = ctx.getContext().res as Response;

    return next.handle().pipe(
      map((data: TokensResponse) => {
        response.cookie(
          '__pchub_refresh_token__',
          'Bearer ' + data.refresh_token,
          {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            httpOnly: true,
            secure: true,
            sameSite: 'none',
          },
        );
        return data;
      }),
    );
  }
}
