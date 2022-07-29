/*
  Warnings:

  - Added the required column `expire` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "expire" TIMESTAMP(3) NOT NULL;
