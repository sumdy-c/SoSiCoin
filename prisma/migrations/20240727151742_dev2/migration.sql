/*
  Warnings:

  - Added the required column `damage` to the `AccountDibila` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountDibila" ADD COLUMN     "damage" INTEGER NOT NULL;
