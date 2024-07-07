import { Field, ObjectType } from "type-graphql";
import { Book } from "./book";

@ObjectType()
export class UserFavoriteBook {
  @Field()
  id: number;

  @Field((type) => Book)
  book: Book;
}
