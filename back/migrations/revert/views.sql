-- Revert globeTrotter:views from pg

BEGIN;

DROP VIEW global_price;

DROP VIEW activity_price;

DROP VIEW accommodation_price;

DROP VIEW transport_price;

COMMIT;
