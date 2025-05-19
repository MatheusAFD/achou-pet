CREATE TABLE "tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"value" varchar(6) NOT NULL,
	"key" text NOT NULL,
	"expires_at" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
