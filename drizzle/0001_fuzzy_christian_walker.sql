ALTER TABLE "integration" ADD COLUMN "status" "status" NOT NULL;--> statement-breakpoint
ALTER TABLE "company" DROP COLUMN IF EXISTS "status";