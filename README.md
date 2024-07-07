# Graphql POC

This is a simple POC to demonstrate the use of GraphQL with Apollo and prisma.

## How to run

1. Clone the repository
2. Run `npm i`
3. Run `npx prisma db push`
4. set the `DATABASE_URL` in the `.env` file
5. Run `npm run dev`

### Queries

```graphql

mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    id
  }
}

query ListUsers($data: ListUserInput!) {
  listUsers {
    email
    id
    name
  }
}

query GetUser($data: GetUserInput!) {
  getUser(data: $data) {
    email
    id
    name
  }
}



mutation CreateBook($data: CreateBookInput!) {
  createBook(data: $data) {
    id
  }
}



query ListBooks {
  listBooks {
    genre
    id
    title
  }
}



query ListUserFavoriteBooks($data: ListFavoriteBooksInput, $getUserData2: GetUserInput!) {
  getUser(data: $getUserData2) {
    id
    name
    email
  }
  listUserFavoriteBooks(data: $data) {
    id
    book {
      genre
      title
      id
    }
  }
}


mutation AddNewFavoriteBook($createFavorite: CreateUserFavoriteBookInput!) {
  addNewFavoriteBook(data: $createFavorite) {
    id
  }
}
```
