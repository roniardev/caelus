ALTER TABLE "acme_users" DROP CONSTRAINT "acme_users_discord_id_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "user_discord_idx";--> statement-breakpoint
ALTER TABLE "acme_users" ADD COLUMN "photo" varchar(255);--> statement-breakpoint
ALTER TABLE "acme_users" ADD COLUMN "google_id" varchar(255);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_google_idx" ON "acme_users" USING btree ("google_id");--> statement-breakpoint
ALTER TABLE "acme_users" DROP COLUMN IF EXISTS "discord_id";--> statement-breakpoint
ALTER TABLE "acme_users" DROP COLUMN IF EXISTS "avatar";--> statement-breakpoint
ALTER TABLE "acme_users" DROP COLUMN IF EXISTS "stripe_subscription_id";--> statement-breakpoint
ALTER TABLE "acme_users" DROP COLUMN IF EXISTS "stripe_price_id";--> statement-breakpoint
ALTER TABLE "acme_users" DROP COLUMN IF EXISTS "stripe_customer_id";--> statement-breakpoint
ALTER TABLE "acme_users" DROP COLUMN IF EXISTS "stripe_current_period_end";--> statement-breakpoint
ALTER TABLE "acme_users" ADD CONSTRAINT "acme_users_google_id_unique" UNIQUE("google_id");