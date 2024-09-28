-- DropForeignKey
ALTER TABLE "chapter" DROP CONSTRAINT "chapter_bookId_fkey";

-- AddForeignKey
ALTER TABLE "chapter" ADD CONSTRAINT "chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
