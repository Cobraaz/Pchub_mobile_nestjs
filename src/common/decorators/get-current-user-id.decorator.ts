import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '../../auth/types/jwtPayload.type';

export const GetCurrentUserUniqueID = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const user = request.user as JwtPayload;
    return user.sub;
  },
);
