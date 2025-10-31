/*
  Warnings:

  - The `dailyStatus` column on the `Communication` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Communication" DROP COLUMN "dailyStatus",
ADD COLUMN     "dailyStatus" JSONB[];
