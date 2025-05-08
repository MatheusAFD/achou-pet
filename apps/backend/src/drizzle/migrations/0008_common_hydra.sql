CREATE TABLE "batches" (
	"id" text PRIMARY KEY NOT NULL,
	"batch_name" text NOT NULL,
	"description" text NOT NULL,
	"comments" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "batches_batch_name_unique" UNIQUE("batch_name")
);
--> statement-breakpoint
ALTER TABLE "credentials" RENAME COLUMN "batch" TO "batch_id";--> statement-breakpoint
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE no action ON UPDATE no action;