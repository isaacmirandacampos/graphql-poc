import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import path from "node:path";
import { context } from "./context";
import { Users } from "./resolvers/users";
import { Books } from "./resolvers/books";
import { UserFavoriteBooks } from "./resolvers/user-favorite-books";

async function StartServer() {
  const schema = await buildSchema({
    resolvers: [Users, Books, UserFavoriteBooks],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });
  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    context: async () => context,
  });
  console.log(`Server ready at ${url}`);
}

StartServer().catch((error) => {
  console.error(error);
});
