import { InputType, Field, Int } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsValidRole } from '../decorators/isValidRole.decorator';

@InputType()
export class FindAllUsersInput {
  @Field(() => String, { nullable: true })
  @IsValidRole()
  @Transform(({ value }: { value?: string }) => {
    return value?.toUpperCase();
  })
  role?: Role;

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}