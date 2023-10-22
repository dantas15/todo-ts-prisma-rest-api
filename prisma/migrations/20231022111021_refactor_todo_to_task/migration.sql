/*
  Warnings:

  - You are about to drop the column `todoId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the `ToDo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `taskId` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_todoId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "todoId",
ADD COLUMN     "taskId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ToDo";

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "dueDate" TIMESTAMP(3),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
