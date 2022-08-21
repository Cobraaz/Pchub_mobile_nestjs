import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { SignUpUserInput } from './../../auth/dto/signup-user.input';

@InputType()
export class UpdateUserInput extends PartialType(SignUpUserInput) {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  uniqueID?: string;
}
