/*
  Warnings:

  - You are about to drop the column `lastPage` on the `readingHistory` table. All the data in the column will be lost.
  - You are about to drop the column `lastRead` on the `readingHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "readingHistory" DROP COLUMN "lastPage",
DROP COLUMN "lastRead";
