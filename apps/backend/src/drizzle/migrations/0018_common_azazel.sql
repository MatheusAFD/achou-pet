ALTER TABLE "pets" ALTER COLUMN "gender" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."pet_gender";--> statement-breakpoint
CREATE TYPE "public"."pet_gender" AS ENUM('MALE', 'FEMALE');--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "gender" SET DATA TYPE "public"."pet_gender" USING "gender"::"public"."pet_gender";