ALTER TABLE "pets" ALTER COLUMN "size" SET DATA TYPE "public"."pet_size" USING "size"::"public"."pet_size";--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "size" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "is_vaccinated" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "has_allergies" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pets" ALTER COLUMN "needs_medication" SET NOT NULL;