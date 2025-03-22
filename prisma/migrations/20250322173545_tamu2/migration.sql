/*
  Warnings:

  - You are about to drop the column `content` on the `notes` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `notes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[no_hp]` on the table `notes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `notes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no_hp` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "no_hp" INTEGER NOT NULL,
ADD COLUMN     "status_hadir" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "notes_no_hp_key" ON "notes"("no_hp");
