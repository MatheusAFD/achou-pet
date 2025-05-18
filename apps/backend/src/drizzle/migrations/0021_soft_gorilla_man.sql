CREATE TYPE "public"."user_term_situation" AS ENUM('PENDING', 'ACCEPTED', 'REFUSED');--> statement-breakpoint
CREATE TABLE "terms" (
	"id" text PRIMARY KEY NOT NULL,
	"version" text NOT NULL,
	"content" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "user_terms" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"term_id" text NOT NULL,
	"situation" "user_term_situation" DEFAULT 'PENDING' NOT NULL,
	"accepted_at" timestamp,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "user_terms" ADD CONSTRAINT "user_terms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_terms" ADD CONSTRAINT "user_terms_term_id_terms_id_fk" FOREIGN KEY ("term_id") REFERENCES "public"."terms"("id") ON DELETE no action ON UPDATE no action;