/*
  Warnings:

  - Changed the type of `dailyStatus` on the `Communication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Communication" DROP COLUMN "dailyStatus",
ADD COLUMN     "dailyStatus" JSONB NOT NULL;
