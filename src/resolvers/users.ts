import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { GraphQLError } from "graphql";
import { Context } from "../context";
import { User } from "../models/user";

@InputType()
class ListUserInput {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
class GetUserInput {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  name: string;
}

@InputType()
class CreateUserInput {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  name: string;
}

@Resolver()
export class Users {
  @Query(() => [User])
  listUsers(
    @Arg("data", { nullable: true }) data: ListUserInput,
    @Ctx() { prisma }: Context
  ) {
    return prisma.user.findMany({
      where: { id: data?.id, email: data?.email, name: data?.name },
    });
  }
  @Query(() => User)
  getUser(@Arg("data") data: GetUserInput, @Ctx() { prisma }: Context) {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: data?.id,
        name: data?.name,
        email: data?.email,
      },
    });
  }
  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput, @Ctx() ctx: Context) {
    const userExists = await ctx.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists) {
      throw new GraphQLError("Email already exists", {
        extensions: {
          code: "UNPROCESSABLE_ENTITY",
          argumentName: "email",
        },
      });
    }
    return await ctx.prisma.user.create({ data });
  }
}
