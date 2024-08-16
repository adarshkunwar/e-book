-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapter" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" VARCHAR NOT NULL,
    "bookId" INTEGER NOT NULL,
    "chapterNo" INTEGER NOT NULL,

    CONSTRAINT "chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "readingHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "chapterId" INTEGER NOT NULL,
    "lastRead" TIMESTAMP(6) NOT NULL,
    "lastPage" INTEGER NOT NULL,

    CONSTRAINT "readingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "genre" TEXT NOT NULL,
    "publishedDate" TIMESTAMP(6) NOT NULL,
    "lastUpdated" TIMESTAMP(6) NOT NULL,
    "authorId" INTEGER NOT NULL,
    "data" VARCHAR NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readingHistory" ADD CONSTRAINT "readingHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readingHistory" ADD CONSTRAINT "readingHistory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readingHistory" ADD CONSTRAINT "readingHistory_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
