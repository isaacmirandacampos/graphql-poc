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
import { Book, Genre } from "../models/book";

@InputType()
class ListBooksInput {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field((type) => Genre, { nullable: true })
  genre: keyof typeof Genre;
}

@InputType()
class GetBookInput {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  title: string;

  @Field((type) => Genre, { nullable: true })
  genre: keyof typeof Genre;
}

@InputType()
class CreateBookInput {
  @Field(() => String)
  title: string;

  @Field((type) => Genre)
  genre: Genre;
}

@Resolver()
export class Books {
  @Query(() => [Book])
  listBooks(
    @Arg("data", { nullable: true }) data: ListBooksInput,
    @Ctx() { prisma }: Context
  ) {
    return prisma.book.findMany({
      where: { id: data?.id, title: data?.title, genre: data?.genre },
    });
  }
  @Query(() => Book)
  getBook(@Arg("data") data: GetBookInput, @Ctx() { prisma }: Context) {
    return prisma.book.findUniqueOrThrow({
      where: {
        id: data?.id,
        title: data?.title,
        genre: data?.genre,
      },
    });
  }
  @Mutation(() => Book)
  async createBook(@Arg("data") data: CreateBookInput, @Ctx() ctx: Context) {
    return await ctx.prisma.book.create({
      data: {
        title: data.title,
        genre: data.genre,
      },
    });
  }
}
