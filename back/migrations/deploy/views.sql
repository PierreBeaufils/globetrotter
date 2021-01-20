-- Deploy globeTrotter:views to pg

BEGIN;

CREATE VIEW transport_price AS 
SELECT travel.id,
    sum(transport.unit_price * transport.quantity::numeric) AS transp_total_price
FROM travel
LEFT JOIN transport ON transport.travel_id = travel.id
WHERE transport.selected = true
GROUP BY travel.id
ORDER BY travel.id;

CREATE VIEW accommodation_price AS 
SELECT travel.id,
    sum(accommodation.unit_price * accommodation.quantity::numeric * (accommodation.departure_date::date - accommodation.arrival_date::date)) AS acco_total_price
FROM travel
LEFT JOIN accommodation ON accommodation.travel_id = travel.id
WHERE accommodation.selected = true
GROUP BY travel.id
ORDER BY travel.id;

CREATE VIEW activity_price AS 
SELECT travel.id,
    sum(activity.unit_price * activity.quantity::numeric) AS activ_total_price
FROM travel
LEFT JOIN activity ON activity.travel_id = travel.id
WHERE activity.selected = true
GROUP BY travel.id
ORDER BY travel.id;

CREATE VIEW global_price AS 
SELECT travel.id,
    transp_total_price,
    acco_total_price,
    activ_total_price,
	(coalesce(transp_total_price, 0) + coalesce(acco_total_price, 0) + coalesce(activ_total_price, 0)) AS global_price
FROM travel
LEFT JOIN transport_price ON transport_price.id=travel.id
LEFT JOIN accommodation_price ON accommodation_price.id=travel.id
LEFT JOIN activity_price ON activity_price.id=travel.id;

COMMIT;