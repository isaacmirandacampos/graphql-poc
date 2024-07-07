/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `favorite_books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorite_books_userId_bookId_key" ON "favorite_books"("userId", "bookId");
