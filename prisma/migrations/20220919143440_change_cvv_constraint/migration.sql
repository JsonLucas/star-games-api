/*
  Warnings:

  - Changed the type of `cvv` on the `cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "cvv",
ADD COLUMN     "cvv" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cards_cvv_key" ON "cards"("cvv");
