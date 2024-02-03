/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `link` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('EVENT_POSTER', 'EVENT_IMAGE', 'EVENT_VIDEO', 'EVENT_DOC');

-- CreateEnum
CREATE TYPE "SystemUpdateType" AS ENUM ('EVENT_CREATE', 'EVENT_UPDATE', 'EVENT_DELETE', 'EVENT_ATTACHMENTS_ADD', 'EVENT_ATTACHMENTS_DELETE', 'EVENT_DOCUMENTATION_ADD', 'EVENT_DOCUMENTATION_DELETE', 'MEMBER_ADD', 'MEMBER_UPDATE', 'MEMBER_DELETE');

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_uploaderId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "profileImage" DROP NOT NULL;

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "type" "AttachmentType" NOT NULL DEFAULT 'EVENT_IMAGE',
    "eventId" TEXT NOT NULL,
    "uploaderId" TEXT NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemUpdate" (
    "id" TEXT NOT NULL,
    "type" "SystemUpdateType" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "SystemUpdate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemUpdate" ADD CONSTRAINT "SystemUpdate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
