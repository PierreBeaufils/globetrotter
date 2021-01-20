-- Revert globeTrotter:base-structure from pg

BEGIN;

DROP TABLE "travel_has_traveler";

DROP TABLE "accommodation";

DROP TABLE "transport";

DROP TABLE "activity";

ALTER TABLE "travel"
DROP COLUMN "owner";

DROP TABLE "traveler";

DROP TABLE "task";

DROP TABLE "travel";

COMMIT;