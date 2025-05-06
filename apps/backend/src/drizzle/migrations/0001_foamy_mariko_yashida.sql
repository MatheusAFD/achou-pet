ALTER TABLE "address" RENAME TO "addresses";--> statement-breakpoint
ALTER TABLE "addresses" DROP CONSTRAINT "address_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;