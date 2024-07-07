import { Field, ObjectType, registerEnumType } from "type-graphql";

export enum Genre {
  Action = "Action",
  Mystery = "Mystery",
  ScienceFiction = "ScienceFiction",
  Fantasy = "Fantasy",
  Romance = "Romance",
  Horror = "Horror",
  Thriller = "Thriller",
  Historical = "Historical",
  NonFiction = "NonFiction",
  Biography = "Biography",
  Poetry = "Poetry",
  Drama = "Drama",
  Adventure = "Adventure",
  Comedy = "Comedy",
  Satire = "Satire",
  Tragedy = "Tragedy",
  Mythology = "Mythology",
}

@ObjectType()
export class Book {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field((type) => Genre)
  genre: Genre;
}

registerEnumType(Genre, {
  name: "Genre",
  description: "The genre of book",
});
