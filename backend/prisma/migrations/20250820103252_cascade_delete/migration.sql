-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_superheroId_fkey";

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
