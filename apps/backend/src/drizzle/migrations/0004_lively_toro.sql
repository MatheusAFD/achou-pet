ALTER TABLE "credentials" ALTER COLUMN "status" SET DEFAULT 'INACTIVE';--> statement-breakpoint
ALTER TABLE "credentials" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD COLUMN "comments" text;