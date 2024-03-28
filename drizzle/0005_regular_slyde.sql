CREATE INDEX IF NOT EXISTS "integration_company_id_idx" ON "integration" ("company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "integration_auth_company_id_idx" ON "integration_auth" ("company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_id_integration_id_auth_id_index" ON "integration_integration_auth" ("company_id","company_id","integration_auth_id");