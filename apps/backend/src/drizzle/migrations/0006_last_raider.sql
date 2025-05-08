ALTER TABLE "credentials" ADD COLUMN "short_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_short_id_unique" UNIQUE("short_id");