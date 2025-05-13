CREATE TYPE "public"."pet_gender" AS ENUM('MALE', 'FEMALE', 'UNKNOWN');--> statement-breakpoint
CREATE TABLE "pets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"gender" "pet_gender" NOT NULL,
	"birth_date" timestamp,
	"species" text NOT NULL,
	"breed" text,
	"size" text,
	"color" text,
	"is_vaccinated" boolean DEFAULT false,
	"has_allergies" boolean DEFAULT false,
	"needs_medication" boolean DEFAULT false,
	"medication_description" text,
	"photo_url" text,
	"credential_id" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "pets_credential_id_unique" UNIQUE("credential_id")
);
--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_credential_id_credentials_id_fk" FOREIGN KEY ("credential_id") REFERENCES "public"."credentials"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credentials" DROP COLUMN "pet_name";