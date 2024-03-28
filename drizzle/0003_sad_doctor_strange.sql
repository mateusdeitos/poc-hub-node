DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('oauth', 'token-based', 'basic');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "integration_integration_auth" DROP CONSTRAINT "integration_integration_auth_integration_id_integration_id_fk";
--> statement-breakpoint
ALTER TABLE "integration_auth" ADD COLUMN "company_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "integration_integration_auth" ADD COLUMN "company_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "integration_integration_auth" ADD COLUMN "type" "type" NOT NULL;--> statement-breakpoint
ALTER TABLE "integration_integration_auth" ADD COLUMN "scope" varchar(30) DEFAULT 'main' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "integration_type_scope_unique_idx" ON "integration_integration_auth" ("company_id","type","scope");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integration_auth" ADD CONSTRAINT "integration_auth_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integration_integration_auth" ADD CONSTRAINT "integration_integration_auth_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "company"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "integration_integration_auth" DROP COLUMN IF EXISTS "integration_id";