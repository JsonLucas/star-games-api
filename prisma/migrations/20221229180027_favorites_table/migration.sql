-- DropIndex
DROP INDEX "cards_cvv_key";

-- AlterTable
ALTER TABLE "purchases" ALTER COLUMN "status" SET DEFAULT 'in progress';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "totalScore" SET DEFAULT 0;
