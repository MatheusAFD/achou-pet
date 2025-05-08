ALTER TABLE "batches" RENAME COLUMN "batch_name" TO "batch_number";--> statement-breakpoint
ALTER TABLE "batches" DROP CONSTRAINT "batches_batch_name_unique";--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_batch_number_unique" UNIQUE("batch_number");