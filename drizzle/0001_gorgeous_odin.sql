ALTER TABLE "undefined_email_verification_codes" RENAME TO "acme_email_verification_codes";--> statement-breakpoint
ALTER TABLE "undefined_password_reset_tokens" RENAME TO "acme_password_reset_tokens";--> statement-breakpoint
ALTER TABLE "undefined_posts" RENAME TO "acme_posts";--> statement-breakpoint
ALTER TABLE "undefined_sessions" RENAME TO "acme_sessions";--> statement-breakpoint
ALTER TABLE "undefined_users" RENAME TO "acme_users";--> statement-breakpoint
ALTER TABLE "acme_email_verification_codes" DROP CONSTRAINT "undefined_email_verification_codes_user_id_unique";--> statement-breakpoint
ALTER TABLE "acme_users" DROP CONSTRAINT "undefined_users_discord_id_unique";--> statement-breakpoint
ALTER TABLE "acme_users" DROP CONSTRAINT "undefined_users_email_unique";--> statement-breakpoint
ALTER TABLE "acme_email_verification_codes" ADD CONSTRAINT "acme_email_verification_codes_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "acme_users" ADD CONSTRAINT "acme_users_discord_id_unique" UNIQUE("discord_id");--> statement-breakpoint
ALTER TABLE "acme_users" ADD CONSTRAINT "acme_users_email_unique" UNIQUE("email");