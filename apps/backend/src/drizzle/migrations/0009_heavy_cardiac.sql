ALTER TABLE "batches" ADD COLUMN "short_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_short_id_unique" UNIQUE("short_id");