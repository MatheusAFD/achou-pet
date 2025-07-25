CREATE TYPE "public"."missingAlertStatus" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TABLE "missing_alerts" (
	"id" text PRIMARY KEY NOT NULL,
	"status" "missingAlertStatus" NOT NULL,
	"pet_id" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "pets" ADD COLUMN "is_missing" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "missing_alerts" ADD CONSTRAINT "missing_alerts_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE no action ON UPDATE no action;