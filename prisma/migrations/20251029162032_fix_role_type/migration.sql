/*
  Warnings:

  - Made the column `teacherNote` on table `Communication` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parentComment` on table `Communication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Communication" ALTER COLUMN "teacherNote" SET NOT NULL,
ALTER COLUMN "parentComment" SET NOT NULL;
