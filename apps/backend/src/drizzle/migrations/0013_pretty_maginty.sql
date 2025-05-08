ALTER TABLE "batches" ADD COLUMN "totalCredentialsGenerated" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD COLUMN "is_foverer" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "credentials" ADD COLUMN "valid_until" timestamp;