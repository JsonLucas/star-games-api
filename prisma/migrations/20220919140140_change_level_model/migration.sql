/*
  Warnings:

  - You are about to drop the column `featuresId` on the `levels` table. All the data in the column will be lost.
  - You are about to drop the column `levelNumber` on the `levels` table. All the data in the column will be lost.
  - You are about to drop the `features` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `features` to the `levels` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "levels" DROP CONSTRAINT "levels_featuresId_fkey";

-- AlterTable
ALTER TABLE "levels" DROP COLUMN "featuresId",
DROP COLUMN "levelNumber",
ADD COLUMN     "features" JSONB NOT NULL;

-- DropTable
DROP TABLE "features";
