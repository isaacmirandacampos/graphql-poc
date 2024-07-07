import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "../context";
import { UserFavoriteBook } from "../models/user-favorite-books";
import { GraphQLError } from "graphql";

@InputType()
class ListFavoriteBooksInput {
  @Field(() => Number)
  userId: number;
}

@InputType()
class CreateUserFavoriteBookInput {
  @Field(() => Number)
  userId: number;

  @Field(() => Number)
  bookId: number;
}

@Resolver()
export class UserFavoriteBooks {
  @Query(() => [UserFavoriteBook])
  listUserFavoriteBooks(
    @Arg("data", { nullable: true }) data: ListFavoriteBooksInput,
    @Ctx() { prisma }: Context
  ) {
    return prisma.favoriteBook.findMany({
      where: { userId: data.userId },
      include: { book: true },
    });
  }
  @Mutation(() => UserFavoriteBook)
  async addNewFavoriteBook(
    @Arg("data") data: CreateUserFavoriteBookInput,
    @Ctx() ctx: Context
  ) {
    const favoriteBookExists = await ctx.prisma.favoriteBook.findFirst({
      where: {
        userId: data.userId,
        bookId: data.bookId,
      },
    });
    if (favoriteBookExists) {
      throw new GraphQLError("Book already is favorite", {
        extensions: {
          code: "UNPROCESSABLE_ENTITY",
          argumentName: "bookId",
        },
      });
    }

    return await ctx.prisma.favoriteBook.create({
      data: {
        userId: data.userId,
        bookId: data.bookId,
      },
    });
  }
}
