CREATE TYPE "public"."credentialStatus" AS ENUM('ACTIVE', 'INACTIVE', 'PENDING');--> statement-breakpoint
CREATE TABLE "credentials" (
	"id" text PRIMARY KEY NOT NULL,
	"status" "credentialStatus" NOT NULL,
	"batch" text NOT NULL,
	"user_id" text,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "allow_show_address" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;